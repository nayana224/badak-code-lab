import test from 'node:test';
import assert from 'node:assert/strict';
import { lessons } from '../web/lessons.js';
import { quizzes, checkQuiz } from '../web/lesson-quiz.js';

test('quizzes reference existing lessons and have exactly one valid answer', () => {
 const ids=new Set(lessons.map(lesson=>lesson.id));
 for (const [id,quiz] of Object.entries(quizzes)) {
  assert.ok(ids.has(id), id);
  assert.ok(quiz.question && quiz.explanation, id);
  assert.ok(quiz.options.length>=2 && new Set(quiz.options).size===quiz.options.length, id);
  assert.ok(Number.isInteger(quiz.answer) && quiz.answer>=0 && quiz.answer<quiz.options.length, id);
  quiz.options.forEach((_,i)=>assert.equal(checkQuiz(quiz,i),i===quiz.answer,id));
  for (const invalid of [-1,quiz.options.length,NaN,null]) assert.equal(checkQuiz(quiz,invalid),null,id);
 }
});
