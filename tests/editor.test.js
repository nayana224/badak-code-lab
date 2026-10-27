import test from 'node:test';
import assert from 'node:assert/strict';
import {EditorState, EditorSelection, Transaction} from '@codemirror/state';
import {indentUnit} from '@codemirror/language';
import {insertNewlineAndIndent, indentMore, indentLess, history, undo, redo} from '@codemirror/commands';
import {python, pythonLanguage} from '@codemirror/lang-python';
import {cpp, cppLanguage} from '@codemirror/lang-cpp';
import {highlightTree,classHighlighter} from '@lezer/highlight';

function harness(doc,language,selection=EditorSelection.cursor(doc.length)) {
 let state=EditorState.create({doc,selection,extensions:[language(),indentUnit.of('    '),history()]});
 return {get state(){return state;},dispatch(...specs){state=specs[0] instanceof Transaction?specs[0].state:state.update(...specs).state;}};
}
test('Python Enter indents four spaces inside a function',()=>{
 const view=harness('def double(value):',python);
 assert.equal(insertNewlineAndIndent(view),true);
 assert.equal(view.state.doc.toString(),'def double(value):\n    ');
});
test('C++ Enter expands a brace pair with indentation',()=>{
 const view=harness('int main() {}',cpp,EditorSelection.cursor(12));
 assert.equal(insertNewlineAndIndent(view),true);
 assert.equal(view.state.doc.toString(),'int main() {\n    \n}');
});
test('Tab-style multi-line indentation and outdent preserve the selected code',()=>{
 const view=harness('one\ntwo',python,EditorSelection.range(0,7));
 assert.equal(indentMore(view),true);
 assert.equal(view.state.doc.toString(),'    one\n    two');
 assert.equal(indentLess(view),true);
 assert.equal(view.state.doc.toString(),'one\ntwo');
});
test('undo and redo operate on editor history',()=>{
 const view=harness('print(1)',python);
 view.dispatch({changes:{from:6,to:7,insert:'42'}});
 assert.equal(view.state.doc.toString(),'print(42)');
 assert.equal(undo(view),true);assert.equal(view.state.doc.toString(),'print(1)');
 assert.equal(redo(view),true);assert.equal(view.state.doc.toString(),'print(42)');
});
test('Python and C++ parsers classify keywords, comments, strings and numbers',()=>{
 for(const [parser,code] of [[pythonLanguage.parser,'def greet():\n    # comment\n    return "hello", 42'],[cppLanguage.parser,'int main() { // comment\n return 42; }\nconst char* s="hello";']]) {
  const tokens=[];
  highlightTree(parser.parse(code),classHighlighter,(from,to,classes)=>tokens.push({text:code.slice(from,to),classes}));
  assert.ok(tokens.some(t=>t.text.includes('comment')&&t.classes.includes('tok-comment')));
  assert.ok(tokens.some(t=>t.text.includes('hello')&&t.classes.includes('tok-string')));
  assert.ok(tokens.some(t=>t.text==='42'&&t.classes.includes('tok-number')));
  assert.ok(tokens.some(t=>t.text==='return'&&t.classes.includes('tok-keyword')));
 }
});
