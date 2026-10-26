// The textarea remains the canonical draft and a working fallback if the bundle fails.
export function createLessonEditor({textarea,reference,wrapper,gutter,onRun}) {
 let language='python', referenceCode='', editor=null, example=null;
 let upgraded=false;
 const mode=document.querySelector('#editor-mode');
 const cursor=document.querySelector('#editor-cursor');
 const host=document.createElement('div');host.className='codemirror-host';host.hidden=true;wrapper.append(host);
 function status(){mode.textContent=(language==='cpp'?'C++':'Python')+(upgraded?' · 자동 들여쓰기':' · 기본 입력창');}
 function onChange(text){if(textarea.value===text)return;textarea.value=text;textarea.dispatchEvent(new Event('input',{bubbles:true}));}
 function load(){
  if(editor)editor.load(textarea.value,language,textarea.getAttribute('aria-label'),textarea.placeholder);
  if(example)example.set(referenceCode,language);else reference.textContent=referenceCode;
  status();
 }
 const controller={
  setLesson({language:nextLanguage,referenceCode:nextReference}){language=nextLanguage;referenceCode=nextReference;load();},
  sync(){editor?.sync(textarea.value);editor?.refresh();example?.refresh();},
  focus(){editor?editor.focus():textarea.focus();},
  get enhanced(){return upgraded;}
 };
 controller.ready=import('/vendor/editor.js').then(({mountEditor,mountReference})=>{
  const hadFocus=document.activeElement===textarea;
  editor=mountEditor({parent:host,doc:textarea.value,language,label:textarea.getAttribute('aria-label'),hint:textarea.placeholder,onChange,onRun,onCursor:(line,column)=>cursor.textContent=`줄 ${line}, 열 ${column}`});
  reference.replaceChildren();
  example=mountReference({parent:reference,doc:referenceCode,language});
  reference.classList.add('cm-reference');wrapper.classList.add('cm-ready');
  textarea.hidden=true;gutter.hidden=true;host.hidden=false;upgraded=true;
  status();editor.refresh();example.refresh();
  if(hadFocus)editor.focus();
 }).catch(error=>{console.warn('Rich editor unavailable:',error);host.remove();reference.textContent=referenceCode;mode.textContent='기본 입력창 · 새로고침으로 편집기 다시 준비';});
 return controller;
}
