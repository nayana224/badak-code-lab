import { basicSetup } from 'codemirror';
import { EditorState, Compartment, Prec } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, placeholder as editorPlaceholder } from '@codemirror/view';
import { indentUnit, syntaxHighlighting, HighlightStyle, bracketMatching, foldGutter, syntaxTree } from '@codemirror/language';
import { indentWithTab } from '@codemirror/commands';
import { acceptCompletion, snippetCompletion, completeFromList } from '@codemirror/autocomplete';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { tags } from '@lezer/highlight';


const korean=EditorState.phrases.of({
 'Find':'찾기','Replace':'바꾸기','next':'다음','previous':'이전','all':'전체',
 'match case':'대소문자 구분','regexp':'정규식','by word':'단어 단위',
 'replace':'바꾸기','replace all':'모두 바꾸기','close':'닫기',
 'Go to line':'줄로 이동','go to line':'줄로 이동','go':'이동',
 'Fold line':'줄 접기','Unfold line':'줄 펼치기','folded code':'접힌 코드','unfold':'펼치기',
 'Completions':'자동 완성','No diagnostics':'진단 없음'
});

const colors=HighlightStyle.define([
 {tag:[tags.keyword,tags.modifier,tags.operatorKeyword],color:'#c586c0'},
 {tag:[tags.controlKeyword,tags.moduleKeyword],color:'#c586c0'},
 {tag:[tags.string,tags.character,tags.regexp],color:'#ce9178'},
 {tag:[tags.number,tags.bool,tags.null],color:'#b5cea8'},
 {tag:[tags.comment,tags.lineComment,tags.blockComment],color:'#7fa56a',fontStyle:'italic'},
 {tag:[tags.function(tags.variableName),tags.function(tags.propertyName)],color:'#dcdcaa'},
 {tag:[tags.typeName,tags.className,tags.namespace],color:'#4ec9b0'},
 {tag:[tags.variableName,tags.propertyName],color:'#9cdcfe'},
 {tag:tags.definition(tags.variableName),color:'#9cdcfe'},
 {tag:tags.definition(tags.function(tags.variableName)),color:'#dcdcaa'},
 {tag:[tags.operator,tags.punctuation],color:'#d4d4d4'},
 {tag:tags.meta,color:'#c8c8c8'}
]);
const dark=EditorView.theme({
 '&':{color:'#d4d4d4',backgroundColor:'#1e1e1e',fontSize:'0.875rem',height:'100%'},
 '.cm-content':{fontFamily:'"IBM Plex Mono", "Noto Sans KR", monospace',lineHeight:'1.85',padding:'14px 0',caretColor:'#eee'},
 '.cm-line':{padding:'0 15px 0 10px'},
 '.cm-scroller':{fontFamily:'"IBM Plex Mono", "Noto Sans KR", monospace',overflow:'auto'},
 '.cm-gutters':{backgroundColor:'#1e1e1e',border:'none',color:'#75808a',minWidth:'43px'},
 '.cm-gutterElement':{padding:'0 8px 0 5px'},
 '.cm-activeLine':{backgroundColor:'#ffffff08'},
 '.cm-activeLineGutter':{color:'#f1f1f1',backgroundColor:'#ffffff08'},
 '.cm-cursor, .cm-dropCursor':{borderLeftColor:'#eee'},
 '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':{backgroundColor:'#264f78 !important'},
 '.cm-matchingBracket':{backgroundColor:'#ffffff18',outline:'1px solid #767676'},
 '.cm-nonmatchingBracket':{backgroundColor:'#703333'},
 '.cm-tooltip':{backgroundColor:'#252526',border:'1px solid #4b5156',color:'#ddd'},
 '.cm-tooltip-autocomplete > ul':{fontFamily:'"IBM Plex Mono", "Noto Sans KR", monospace',fontSize:'.8125rem',maxWidth:'min(440px, 80vw)'},
 '.cm-tooltip-autocomplete ul li[aria-selected]':{backgroundColor:'#04395e',color:'#fff'},
 '.cm-completionLabel':{color:'#9cdcfe'},
 '.cm-completionDetail':{fontStyle:'normal',color:'#a6b7ad',marginLeft:'1em'},
 '.cm-searchMatch':{backgroundColor:'#76562a66',outline:'1px solid #b28b4e'},
 '.cm-searchMatch-selected':{backgroundColor:'#9a6e2d99'},
 '.cm-panels':{backgroundColor:'#252526',color:'#ddd'},
 '.cm-textfield':{backgroundColor:'#3c3c3c',color:'#eee',border:'1px solid #666'},
 '.cm-button':{backgroundImage:'none',backgroundColor:'#39483e',color:'#eee',border:'1px solid #69796d'},
 '.cm-foldPlaceholder':{backgroundColor:'#35433d',border:'1px solid #596d60',color:'#bbd5c5'},
 '.cm-tooltip.cm-tooltip-autocomplete':{zIndex:'30'}
},{dark:true});

function completion(language) {
 const list=language==='cpp'?[
  snippetCompletion('for (int ${i} = 0; ${i} < ${n}; ++${i}) {\n    ${}\n}',{label:'for',detail:'반복문',type:'keyword'}),
  snippetCompletion('if (${condition}) {\n    ${}\n}',{label:'if',detail:'조건문',type:'keyword'}),
  snippetCompletion('std::vector<int> ${values} = {${}};',{label:'std::vector',detail:'정수 벡터',type:'class'}),
  snippetCompletion('std::cout << ${value} << "\\n";',{label:'std::cout',detail:'출력',type:'function'}),
  snippetCompletion('class ${Name} {\npublic:\n    ${}\n};',{label:'class',detail:'클래스',type:'keyword'})
 ]:[
  snippetCompletion('print(${value})',{label:'print',detail:'값 출력',type:'function'}),
  snippetCompletion('def ${name}(${args}):\n    ${}',{label:'def',detail:'함수',type:'keyword'}),
  snippetCompletion('class ${Name}:\n    def __init__(self):\n        ${}',{label:'class',detail:'클래스',type:'keyword'}),
  snippetCompletion('for ${item} in ${items}:\n    ${}',{label:'for',detail:'반복문',type:'keyword'}),
  snippetCompletion('record("${kind}", ${})',{label:'record',detail:'시각화 기록',type:'function'}),
  snippetCompletion('np.array([${}])',{label:'np.array',detail:'NumPy 배열',type:'function'}),
  snippetCompletion('torch.tensor([${}])',{label:'torch.tensor',detail:'PyTorch 텐서',type:'function'}),
  snippetCompletion('loss.backward()',{label:'loss.backward',detail:'역전파',type:'function'}),
  snippetCompletion('optimizer.zero_grad()',{label:'optimizer.zero_grad',detail:'기울기 초기화',type:'function'}),
  snippetCompletion('optimizer.step()',{label:'optimizer.step',detail:'가중치 갱신',type:'function'})
 ];
 const source=completeFromList(list.map(option=>({...option,boost:10})));
 return context=>{
  const node=syntaxTree(context.state).resolveInner(context.pos,-1);
  if(/Comment|String/.test(node.name))return null;
  return source(context);
 };
}
const languageExtensions=language=>[language==='cpp'?cpp():python(),EditorState.languageData.of(()=>[{autocomplete:completion(language)}])];

export function mountEditor({parent,doc='',language='python',label,hint='',onChange,onRun,onCursor}) {
 const mode=new Compartment();
 const attributes=new Compartment();
 function extensions() {return [
  basicSetup,korean,dark,syntaxHighlighting(colors),indentUnit.of('    '),EditorState.tabSize.of(4),
  mode.of(languageExtensions(language)),
  editorPlaceholder(hint),
  attributes.of(EditorView.contentAttributes.of({'aria-label':label,'aria-multiline':'true',spellcheck:'false',autocapitalize:'off',autocorrect:'off'})),
  Prec.highest(keymap.of([{key:'Mod-Enter',run:()=>{onRun();return true;}},{key:'Ctrl-Enter',run:()=>{onRun();return true;}},{key:'Meta-Enter',run:()=>{onRun();return true;}}])),
  keymap.of([{key:'Tab',run:acceptCompletion},indentWithTab]),
  EditorView.updateListener.of(update=>{
   if(update.docChanged)onChange(update.state.doc.toString());
   if(update.docChanged||update.selectionSet){const pos=update.state.selection.main.head;const line=update.state.doc.lineAt(pos);onCursor(line.number,pos-line.from+1);}
  })
 ];}
 const view=new EditorView({parent,state:EditorState.create({doc,extensions:extensions()})});
 return {
  view,
  load(text,nextLanguage,nextLabel,nextHint){language=nextLanguage;label=nextLabel;hint=nextHint;view.setState(EditorState.create({doc:text,extensions:extensions()}));onCursor(1,1);},
  sync(text){if(view.state.doc.toString()!==text)view.dispatch({changes:{from:0,to:view.state.doc.length,insert:text},selection:{anchor:0}});},
  focus(){view.focus();},
  refresh(){view.requestMeasure();}
 };
}
export function mountReference({parent,doc='',language='python'}) {
 const mode=new Compartment();
 const view=new EditorView({parent,state:EditorState.create({doc,extensions:[korean,dark,syntaxHighlighting(colors),lineNumbers(),foldGutter(),bracketMatching(),EditorView.lineWrapping,EditorState.readOnly.of(true),EditorView.editable.of(false),EditorView.contentAttributes.of({'aria-label':'참고용 완성 코드, 읽기 전용','aria-readonly':'true'}),mode.of(languageExtensions(language))]})});
 return {
  set(text,language){view.dispatch({changes:{from:0,to:view.state.doc.length,insert:text},effects:mode.reconfigure(languageExtensions(language))});},
  refresh(){view.requestMeasure();}
 };
}
