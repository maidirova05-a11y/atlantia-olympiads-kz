'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { subjectKey, isFinalist, SUBJECTS, FINAL_SCORE_ABOVE } = require('../api/_lib/subjects');

test('subjectKey maps the registration sheet wording to a certificate design', () => {
  const cases = {
    'Математика': 'math', 'математика': 'math', ' Математика ': 'math',
    'Физика': 'physics', 'Химия': 'chemistry', 'Информатика': 'informatics',
    'Биология': 'biology', 'Биология (3-6 сынып / класс)': 'biology',
    'Computer Science': 'informatics', 'Maths': 'math',
  };
  for (const [text, key] of Object.entries(cases)) assert.equal(subjectKey(text), key, text);
  for (const bad of ['', null, undefined, 'Латынь', 'История']) assert.equal(subjectKey(bad), '', String(bad));
});

test('every subject key has its certificate design files', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  for (const k of SUBJECTS) for (const f of [`${k}.jpg`, `${k}-1200.jpg`]) {
    assert.ok(fs.existsSync(path.join(__dirname, '..', 'assets', 'img', 'certificates', f)), f);
  }
});

test('world final: strictly above 50 points', () => {
  assert.equal(FINAL_SCORE_ABOVE, 50);
  assert.equal(isFinalist(50), false);
  assert.equal(isFinalist(50.5), true);
  assert.equal(isFinalist(51), true);
  assert.equal(isFinalist(100), true);
  assert.equal(isFinalist(15), false);
  assert.equal(isFinalist('abc'), false);
});
