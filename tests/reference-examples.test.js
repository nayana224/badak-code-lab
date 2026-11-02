import test from 'node:test';
import assert from 'node:assert/strict';
import { lessons } from '../web/lessons.js';
import { explanations } from '../web/courses.js';
import { referenceExample } from '../web/reference-examples.js';

test('every rendered explanation has a nonempty explanatory example', () => {
 for (const lesson of lessons) {
  const entries=explanations(lesson);
  assert.ok(entries.length, `${lesson.id} has no explanations`);
  for(const [name, description] of entries) {
   assert.ok(description?.trim(),`${lesson.id}: ${name} has no explanation`);
   assert.ok(referenceExample(name)?.trim(),`${lesson.id}: ${name} has no example`);
  }
 }
});
test('lesson-specific examples take precedence over generic function examples',()=>{
 assert.match(referenceExample('record("batch", ...)'),/batch/);
 assert.match(referenceExample('torch.tensor(...)'),/tensor/);
});
