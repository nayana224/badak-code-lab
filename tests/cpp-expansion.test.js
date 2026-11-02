import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
import {cppExpansionLessons} from '../web/cpp-expansion.js';
import {cppExpansionChecks, cppExpansionQuizzes, cppExpansionExamples} from '../web/cpp-expansion-support.js';

const compiler = spawnSync('g++',['--version'],{encoding:'utf8'}).status === 0;
function compileAndRun(source) {
 const dir=mkdtempSync(join(tmpdir(),'badak-cpp-expansion-'));
 try {
  const src=join(dir,'main.cpp'),bin=join(dir,'main');writeFileSync(src,source);
  const compile=spawnSync('g++',['-std=c++20',src,'-o',bin],{encoding:'utf8',timeout:15000});
  assert.equal(compile.status,0,compile.stderr);
  return spawnSync(bin,[],{encoding:'utf8',timeout:5000});
 } finally {rmSync(dir,{recursive:true,force:true});}
}
test('C++ expansion solutions compile and run with their advertised output', {skip:!compiler}, () => {
 for(const lesson of cppExpansionLessons) {
  assert.ok(cppExpansionQuizzes[lesson.id],lesson.id);
  for(const [name] of lesson.explain) assert.ok(cppExpansionExamples[name],name);
  const result=compileAndRun(lesson.solution);
  assert.equal(result.status,0,lesson.id);
  assert.equal(result.stdout.trim(),lesson.expectedOutput,lesson.id);
 }
});
test('exception exercise detects invalid inputs and preserves prior state', {skip:!compiler}, () => {
 const lesson=cppExpansionLessons.find(item=>item.id==='cpp-exception-strong');
 const wrap=source=>`#define main badak_original_main\n${source}\n#undef main\nint main() {\n${cppExpansionChecks[lesson.id]}\nreturn 0;\n}`;
 assert.equal(compileAndRun(wrap(lesson.solution)).status,0);
 const broken=lesson.solution.replace('value < 0','value < -1');
 assert.notEqual(compileAndRun(wrap(broken)).status,0,'accepting -1 must fail verification');
});
