import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { lessons } from '../web/lessons.js';
import { cppExerciseCheck } from '../web/cpp-exercise-checks.js';
import { cppPrerequisites } from '../web/cpp-prerequisites.js';
import { commonError } from '../web/common-errors.js';

function buildAndRun(code) {
 const dir = mkdtempSync(join(tmpdir(), 'badak-cpp-check-'));
 try {
  const source = join(dir,'main.cpp'); const executable = join(dir,'program');
  writeFileSync(source, readFileSync(new URL('../cpp-prelude.hpp',import.meta.url),'utf8')+'\n'+code);
  const build = spawnSync('g++',['-std=c++20',source,'-o',executable],{encoding:'utf8',timeout:15000});
  assert.equal(build.status,0,build.stderr);
  return spawnSync(executable,[],{encoding:'utf8',timeout:5000}).status;
 } finally { rmSync(dir,{recursive:true,force:true}); }
}
test('C++ 선수 수업 링크는 존재하고 자기 자신을 추천하지 않는다',()=>{
 for(const [id, prerequisiteIds] of Object.entries(cppPrerequisites)){
  assert.ok(lessons.some(l=>l.id===id));
  for(const p of prerequisiteIds) assert.ok(p!==id && lessons.some(l=>l.id===p),`${id}: ${p}`);
 }
});
test('핵심 수업에는 오류 확인 안내가 있다',()=>{
 assert.match(commonError('cpp-search'),/left/);
 assert.equal(commonError('not-a-lesson'),'');
});
test('여러 입력 검사는 정답을 통과시키고 고정된 반환값은 거부한다',()=>{
 for(const id of ['cpp-function','cpp-reference','cpp-template','cpp-concepts','cpp-constexpr','cpp-optional','cpp-span','cpp-class','cpp-rule-zero','cpp-vector','cpp-search','project-cpp-summary','cpp-exception-strong']) {
  const lesson=lessons.find(l=>l.id===id);
  const code=lesson.solution || lesson.code;
  assert.equal(buildAndRun(cppExerciseCheck(id,code)),0,id);
 }
 const fake = '#include <iostream>\nint double_value(int) { return 8; }\nint main() { std::cout << 8; }';
 assert.notEqual(buildAndRun(cppExerciseCheck('cpp-function',fake)),0);
 const wrongOptional = '#include <optional>\nstd::optional<int> find_even(int value) { if (value == 4) return 4; return std::nullopt; }\nint main() { }';
 assert.notEqual(buildAndRun(cppExerciseCheck('cpp-optional',wrongOptional)),0);
 const wrongSpan = '#include <span>\n#include <vector>\nint sum(std::span<const int>) { return 10; }\nint main() { }';
 assert.notEqual(buildAndRun(cppExerciseCheck('cpp-span',wrongSpan)),0);
 const wrongCounter = '#include <iostream>\nclass Counter { public: explicit Counter(int) {} void add(int) {} int value() const { return 7; } };\nint main() {}';
 assert.notEqual(buildAndRun(cppExerciseCheck('cpp-class',wrongCounter)),0);
 const wrongSquare = '#include <iostream>\nconstexpr int square(int x) { return x == 4 ? 16 : 0; }\nint main() {}';
 const squareCheck=cppExerciseCheck('cpp-constexpr',wrongSquare);
 const dir=mkdtempSync(join(tmpdir(),'badak-constexpr-'));
 try {
  const source=join(dir,'wrong.cpp'); writeFileSync(source,squareCheck);
  const compile=spawnSync('g++',['-std=c++20',source,'-o',join(dir,'wrong')],{encoding:'utf8',timeout:15000});
  assert.notEqual(compile.status,0,'잘못된 constexpr는 컴파일 시 거부되어야 합니다.');
 } finally {rmSync(dir,{recursive:true,force:true});}

 assert.equal(cppExerciseCheck('cpp-io','int main() {}'),null);
});
