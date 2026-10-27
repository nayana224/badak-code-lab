import test from 'node:test';
import assert from 'node:assert/strict';
import { lessons } from '../web/lessons.js';
import { explanations } from '../web/courses.js';

test('C++ 수업은 예제에 실제로 등장하는 헤더와 함수 설명을 보여준다', () => {
 const lesson = lessons.find(l => l.id === 'cpp-weak');
 const names = explanations(lesson).map(([name]) => name);
 assert.ok(names.includes('#include <memory>'));
 assert.ok(names.includes('lock()'));
 assert.ok(!names.includes('weak_ptr::lock()'));
 assert.ok(names.includes('weak_ptr::expired()'));
 assert.ok(!names.includes('std::span<T>'));
});

test('기존 수업별 설명을 유지하면서 사용하는 라이브러리를 추가한다', () => {
 const lesson = lessons.find(l => l.id === 'cpp-span');
 const names = explanations(lesson).map(([name]) => name);
 assert.ok(names.includes('원본의 수명'));
 assert.ok(names.includes('#include <span>'));
 assert.ok(names.includes('std::span<T>'));
});
