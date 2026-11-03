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

test('unordered_map의 at은 인덱스가 아니라 키를 읽는다고 설명한다', () => {
 const names = explanations(lessons.find(l => l.id === 'cpp-map')).map(([name]) => name);
 assert.ok(names.includes('unordered_map::at(key)'));
 assert.ok(!names.includes('at(index)'));
 const stringNames = explanations(lessons.find(l => l.id === 'cpp-string')).map(([name]) => name);
 assert.ok(stringNames.includes('at(index)'));
});

test('프로젝트의 numeric과 cassert 헤더를 설명한다', () => {
 const names = explanations(lessons.find(l => l.id === 'project-cpp-summary')).map(([name]) => name);
 assert.ok(names.includes('#include <numeric>'));
 assert.ok(names.includes('#include <cassert>'));
});
