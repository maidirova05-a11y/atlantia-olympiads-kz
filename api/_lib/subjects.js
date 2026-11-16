'use strict';
// Olympiad subjects and the world-final rule — one place for the import, the API and the tests.
// The certificate design (assets/img/certificates/<key>.jpg) is chosen by the subject key.

const SUBJECTS = ['math', 'physics', 'chemistry', 'informatics', 'biology'];

// A score strictly above this passes to the world final (50 itself does not).
const FINAL_SCORE_ABOVE = 50;

// Registration sheet wording → key: «Математика», «математика», «Биология (3-6 сынып / класс)», «Информатика» …
// Kazakh names are accepted too. Returns '' for anything that is not a known subject.
function subjectKey(text) {
  const s = String(text ?? '').toLowerCase();
  if (/матем|math/.test(s)) return 'math';
  if (/физик|physic/.test(s)) return 'physics';
  if (/хими|chem/.test(s)) return 'chemistry';
  if (/информат|computer|informatic|cs\b/.test(s)) return 'informatics';
  if (/биолог|biolog/.test(s)) return 'biology';
  return '';
}

const isFinalist = (score) => Number(score) > FINAL_SCORE_ABOVE;

module.exports = { SUBJECTS, FINAL_SCORE_ABOVE, subjectKey, isFinalist };
