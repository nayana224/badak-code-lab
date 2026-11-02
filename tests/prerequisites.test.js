import test from 'node:test';
import assert from 'node:assert/strict';
import { lessons } from '../web/lessons.js';
import { courseId } from '../web/courses.js';
import { recommendedLessons } from '../web/prerequisites.js';

test('Attention은 내적과 softmax를 선행 학습으로 제시한다',()=>{
 const current=lessons.find(item=>item.id==='torch-attention');
 const inCourse=lessons.filter(item=>courseId(item)===courseId(current));
 assert.deepEqual(recommendedLessons(current,inCourse,lessons).map(item=>item.id),['math-dot','torch-softmax']);
});
test('첫 수업은 선행 수업을 요구하지 않는다',()=>{
 const inCourse=lessons.filter(item=>courseId(item)==='python');
 assert.deepEqual(recommendedLessons(inCourse[0],inCourse,lessons),[]);
});
test('모든 선수 추천은 자기 수업보다 먼저 등장한다',()=>{
 for (const [index, lesson] of lessons.entries()) {
  const course = lessons.filter(item=>courseId(item)===courseId(lesson));
  for (const previous of recommendedLessons(lesson,course,lessons)) {
   assert.ok(lessons.indexOf(previous)<index,`${lesson.id}: ${previous.id} is not earlier`);
  }
 }
});
