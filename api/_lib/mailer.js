'use strict';
// Emails the results access code via Resend (https://resend.com). Off unless RESEND_API_KEY is set.
// Never throws and never blocks the lead: errors are logged (reason only, never values).
//   RESEND_API_KEY     API key                                   (secret)
//   MAIL_FROM          verified sender, e.g. "Atlantia <noreply@atlantia-olympiads.kz>"
//   RESULTS_EMAIL_TO   recipient of the codes (default akbota.kasen@mail.ru)
const crypto = require('node:crypto');
const log = require('./log');

const DEFAULT_TO = 'akbota.kasen@mail.ru';
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no look-alikes (0/O, 1/I)

// 8 characters, e.g. K7QD-M2XP
function newCode() {
  const b = crypto.randomBytes(8);
  let s = '';
  for (let i = 0; i < 8; i++) s += ALPHABET[b[i] % ALPHABET.length];
  return s.slice(0, 4) + '-' + s.slice(4);
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

async function sendResultsCode(lead, code, fetchImpl = fetch) {
  const key = (process.env.RESEND_API_KEY || '').trim();
  const from = (process.env.MAIL_FROM || '').trim();
  if (!key || !from) return false;
  const to = (process.env.RESULTS_EMAIL_TO || '').trim() || DEFAULT_TO;
  try {
    const r = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from, to: [to],
        subject: 'Код для получения результатов: ' + code,
        html: `<p>Код доступа к результатам: <b style="font-size:20px">${esc(code)}</b></p>` +
          `<p>Участник: ${esc(lead.name)}, ${esc(lead.phone)}</p>`,
        text: `Код доступа к результатам: ${code}\nУчастник: ${lead.name}, ${lead.phone}`,
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!r.ok) { log.error('mail failed', { status: r.status }); return false; }
    return true;
  } catch (e) {
    log.error('mail failed', { reason: String(e?.message || e).slice(0, 100) });
    return false;
  }
}

module.exports = { newCode, sendResultsCode };
