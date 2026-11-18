// Loads olympiad results from the Excel sheet into the results cabinet store.
//
//   DATABASE_URL=postgres://… node scripts/import-results.mjs "Результаты.xlsx"      production (Postgres, table kv)
//   node scripts/import-results.mjs "Результаты.xlsx"                                local .data/dev-store.json
//   … --dry                                    only print the summary, write nothing
//   … --add "ФИО|email|балл|предмет[|класс|школа|город]"   extra participant (repeatable), e.g. a test entry
//   … --fix "почта-из-таблицы=правильная-почта"      correct a mistyped address without editing the sheet (repeatable)
//   … --also "почта-из-таблицы=ещё-одна-почта"      the same participants are also reachable by a second address (e.g. «Почта 2»); the first keeps working, and a code requested for either address is mailed to both (repeatable)
//   … --rename "ФИО из таблицы=ФИО на сертификате"   correct a name (repeatable); the new one is printed on the certificate as is
//
// On the server run it inside the app container: docker compose exec app node scripts/import-results.mjs <file>.
// The sheet that has a «БАЛЛ»/«Результат» column is read (on the «24.10 Результаты» file it is «РЕГИСТРАЦИЯ»);
// columns are found by their header text, so their order may change. The subject («Предмет») picks the
// certificate design: math, physics, chemistry, informatics or biology; a row with another subject is skipped. A certificate is issued ONLY to the address in the «Почта» column (parent e-mail); rows without
// it, without a score or with «Явка» = 0 are skipped and listed. One e-mail may have several children.
// Re-running replaces the previous import completely (accounts and passwords are kept).
import { createRequire } from 'node:module';
import { readXlsx } from './lib/xlsx.mjs';

const require = createRequire(import.meta.url);
const store = require('../api/_lib/store.js');
const { normEmail, isEmail } = require('../api/_lib/auth.js');
const { key } = require('../api/_lib/results.js');
const { subjectKey } = require('../api/_lib/subjects.js');

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const adds = [];
const fixes = new Map();
const renames = new Map();
const alsos = [];
const ccMap = new Map(); // address → other addresses that get the same code letter
let file = '';
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--add') adds.push(args[++i] || '');
  else if (args[i] === '--rename') { const [from, to] = String(args[++i] || '').split('='); if (!from || !to) { console.error('bad --rename, expected "старое=новое"'); process.exit(1); } renames.set(from.replace(/\s+/g, ' ').trim().toLowerCase(), to.replace(/\s+/g, ' ').trim()); }
  else if (args[i] === '--also') { const [from, to] = String(args[++i] || '').split('='); if (!from || !to || !isEmail(normEmail(to))) { console.error('bad --also, expected "почта-из-таблицы=другая-почта"'); process.exit(1); } alsos.push([normEmail(from), normEmail(to)]); }
  else if (args[i] === '--fix') { const [from, to] = String(args[++i] || '').split('='); if (!from || !to) { console.error('bad --fix, expected "старая=новая"'); process.exit(1); } fixes.set(normEmail(from), normEmail(to)); }
  else if (args[i] !== '--dry') file = args[i];
}
if (!file) {
  console.error('usage: node scripts/import-results.mjs <file.xlsx> [--dry] [--add "ФИО|email|балл"]');
  process.exit(1);
}

const clean = (s) => String(s ?? '').replace(/[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u202a-\u202e\u2028\u2029]/g, ' ').replace(/\s+/g, ' ').trim();
// "КӨШЕР ДІНМҰХАМЕД" → "Көшер Дінмұхамед"; mixed-case names are left as typed.
const nameCase = (s) =>
  s === s.toUpperCase() && /\p{Lu}{2}/u.test(s)
    ? s.toLowerCase().replace(/(^|[\s\-(])(\p{L})/gu, (m, a, b) => a + b.toUpperCase())
    : s;
const langOf = (s) => (/қазақ|казах|kazakh/i.test(s) ? 'kk' : /англ|english/i.test(s) ? 'en' : 'ru');

const { sheets } = readXlsx(file);
const hasScore = (s) => s.rows[0] && Object.values(s.rows[0]).some((v) => /^\s*(балл|результат)/i.test(String(v ?? '')));
const sheet = sheets.find(hasScore) || sheets[0];
const [header, ...rows] = sheet.rows;
const col = (re) => Object.keys(header).find((k) => re.test(clean(header[k])));
const C = {
  code: col(/^код/i), name: col(/^фио$/i), score: col(/^результат|^балл/i), city: col(/^город/i),
  school: col(/^школа/i), attended: col(/^явка/i), grade: col(/^класс/i), email: col(/^почта$/i), lang: col(/^язык/i), subject: col(/^предмет/i),
};
for (const k of ['name', 'score', 'email', 'subject']) if (!C[k]) { console.error(`column not found: ${k} (sheet «${sheet.name}»)`); process.exit(1); }

// Stage date/place ("17.10.2026, Астана") sits in an unnamed column; take it per row, else the most common.
const DATE = /^\d{2}\.\d{2}\.\d{4}(,\s*[^,]+)?$/;
const stageOf = (r) => Object.values(r).map(clean).find((v) => DATE.test(v)) || '';
const counts = {};
for (const r of rows) { const s = stageOf(r); if (s) counts[s] = (counts[s] || 0) + 1; }
const commonStage = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || '';

const byEmail = new Map();
const skipped = [];
const put = (email, p) => {
  if (!byEmail.has(email)) byEmail.set(email, []);
  byEmail.get(email).push(p);
};

for (const r of rows) {
  const sheetName = nameCase(clean(r[C.name]));
  const name = renames.get(sheetName.toLowerCase()) || sheetName;
  if (!name || (!r[C.code] && !r[C.score])) continue; // group headers like «Аудит 1 каз», empty rows
  const score = clean(r[C.score]);
  const email = fixes.get(normEmail(r[C.email])) || normEmail(r[C.email]);
  const why = !email ? 'нет почты' : !isEmail(email) ? `некорректная почта «${clean(r[C.email])}»` : !/^\d+([.,]\d+)?$/.test(score) ? 'нет балла' : !subjectKey(r[C.subject]) ? `неизвестный предмет «${clean(r[C.subject])}»` : C.attended && clean(r[C.attended]) === '0' ? 'неявка' : '';
  if (why) { skipped.push(`${clean(r[C.code]) || '—'} ${name}: ${why}`); continue; }
  put(email, {
    code: clean(r[C.code]),
    name,
    score: Number(score.replace(',', '.')),
    grade: clean(r[C.grade]),
    school: clean(r[C.school]),
    city: clean(r[C.city]),
    stage: stageOf(r) || commonStage,
    lang: langOf(clean(r[C.lang])),
    subject: subjectKey(r[C.subject]),
  });
}

// --also: the participants of one address are listed under a second one too (the sheet's «Почта 2» is not imported by itself:
// it often holds a teacher's address shared by several children).
for (const [from, to] of alsos) {
  if (!byEmail.has(from)) { console.error(`--also: в таблице нет почты ${from}`); process.exit(1); }
  for (const p of byEmail.get(from)) put(to, { ...p });
  for (const [a, b] of [[from, to], [to, from]]) ccMap.set(a, [...new Set([...(ccMap.get(a) || []), b])]);
}

for (const a of adds) {
  const [name, mail, score, subj, grade = '', school = '', city = ''] = a.split('|').map(clean);
  const email = normEmail(mail);
  if (!name || !isEmail(email) || !/^\d+([.,]\d+)?$/.test(score || '') || !subjectKey(subj)) { console.error(`bad --add «${a}», expected "ФИО|email|балл|предмет"`); process.exit(1); }
  put(email, { code: '', name: nameCase(name), score: Number(score.replace(',', '.')), grade, school, city: city || commonStage.split(',')[1]?.trim() || '', stage: commonStage, lang: 'ru', subject: subjectKey(subj) });
}

const total = [...byEmail.values()].reduce((n, l) => n + l.length, 0);
console.log(`лист «${sheet.name}»: ${total} участников, ${byEmail.size} адресов почты`);
for (const [e, l] of byEmail) if (l.length > 1) console.log(`  несколько детей на одной почте: ${e} — ${l.map((p) => p.name).join(', ')}`);
if (skipped.length) {
  console.log(`пропущено ${skipped.length} (сертификат не выдаётся, пока в таблице нет почты):`);
  for (const s of skipped) console.log('  ' + s);
}
if (dry) process.exit(0);

const db = store.get();
if (!db) { console.error('no store: set DATABASE_URL (Postgres) or UPSTASH_REDIS_REST_URL/TOKEN'); process.exit(1); }
const old = JSON.parse((await db.get('res:index')) || '[]');
// Index first (old ∪ new): an interrupted import never leaves keys the next run does not know about.
await db.set('res:index', JSON.stringify([...new Set([...old, ...byEmail.keys()])]));
await db.del(...[...new Set([...old, ...byEmail.keys()])].map(key.cc)); // links come only from this run's --also
for (const [email, list] of byEmail) await db.set(key.people(email), JSON.stringify(list));
for (const [email, to] of ccMap) await db.set(key.cc(email), JSON.stringify(to));
const gone = old.filter((e) => !byEmail.has(e));
// Addresses no longer in the sheet lose their results, account (so sessions) and pending code.
if (gone.length) await db.del(...gone.flatMap((e) => [key.cc(e), key.people(e), key.acct(e), key.otp(e), key.otpTry(e)]));
await db.set('res:index', JSON.stringify([...byEmail.keys()]));
console.log(`записано в ${{ redis: 'Upstash Redis', postgres: 'Postgres (таблица kv)', file: '.data/dev-store.json' }[db.kind] || db.kind}; удалено старых адресов: ${gone.length}`);
