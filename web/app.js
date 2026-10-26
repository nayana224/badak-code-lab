import { lessons } from './lessons.js';
import { courses, courseId, explanations } from './courses.js';
import { createTracePlayer } from './trace-player.js';
const $ = s => document.querySelector(s);
const STORE = 'badak-lab-v1';
let saved;
try { saved = JSON.parse(localStorage.getItem(STORE)) || {}; } catch { saved = {}; }
if (!saved.codes || typeof saved.codes !== 'object') saved.codes = {};
if (!saved.practiceCodes || typeof saved.practiceCodes !== 'object') saved.practiceCodes = {};
if (!saved.courseLast || typeof saved.courseLast !== 'object') saved.courseLast = {};
if (!Array.isArray(saved.completed)) saved.completed = [];
let lesson, busy = false, worker, timer, aborter, sequence = 0, capturedOutput='';
const tracer=createTracePlayer($('#trace-panel'));
const courseLessons=()=>lessons.filter(l=>courseId(l)===courseId(lesson));
const save = () => { try {localStorage.setItem(STORE, JSON.stringify(saved));} catch {toast('브라우저 저장 공간이 부족합니다. 작성 코드를 복사해 보관하세요.');} };
function toast(text) {$('#toast').textContent=text; $('#toast').style.display='block'; setTimeout(()=>$('#toast').style.display='none', 3500);}
function fitEditor() {
  const count=$('#editor').value.split('\n').length;
  const lineHeight=parseFloat(getComputedStyle($('#editor')).lineHeight);
  const available=Math.max(260, Math.min(560, window.innerHeight * .6));
  $('.editor-wrap').style.height=Math.min(available, Math.max(260, (count+3)*lineHeight))+'px';
}
function lines() {fitEditor();$('#line-numbers').textContent=$('#editor').value.split('\n').map((_,i)=>i+1).join('\n'); $('#line-numbers').scrollTop=$('#editor').scrollTop;}
function renderNav() {
  $('#lessons').replaceChildren(); let last='';
  courseLessons().forEach((l, index) => {
    if(l.group!==last) {const h=document.createElement('div'); h.className='nav-group'; h.textContent=l.group; $('#lessons').append(h);last=l.group;}
    const b=document.createElement('button'); const done=saved.completed.includes(l.id);
    b.className=`lesson-link ${lesson.id===l.id?'active':''} ${done?'done':''}`;
    b.setAttribute('aria-current', lesson.id===l.id?'step':'false');
    b.innerHTML=`<span class="lesson-number">${done?'✓':String(index+1).padStart(2,'0')}</span><span><strong>${l.short}</strong><small>${l.time} · ${l.runtime==='cpp'?'C++ CPU':l.runtime==='torch'?'PyTorch CPU':'브라우저 실행'}</small></span>`;
    b.onclick=()=>location.hash=l.id; $('#lessons').append(b);
  });
  const list=courseLessons();
  const count=list.filter(l=>saved.completed.includes(l.id)).length;
  $('#progress-text').textContent=`${count} / ${list.length}`;
  $('#progress-bar').style.width=`${count/list.length*100}%`;
  $('#course-tabs').replaceChildren();
  courses.forEach(course=>{
    const items=lessons.filter(l=>courseId(l)===course.id);
    const button=document.createElement('button');
    button.className='course-tab';button.setAttribute('aria-pressed',String(course.id===courseId(lesson)));
    const title=document.createElement('strong');title.textContent=course.name;
    const detail=document.createElement('small');detail.textContent=`${course.description} · ${items.filter(l=>saved.completed.includes(l.id)).length}/${items.length}`;
    button.append(title,detail);button.onclick=()=>location.hash=items.find(l=>l.id===saved.courseLast[course.id])?.id||items[0].id;
    $('#course-tabs').append(button);
  });
}
function selectLesson() {
  stop(false);
  lesson=lessons.find(l=>l.id===location.hash.slice(1)) || lessons[0];
  saved.current=lesson.id; saved.courseLast[courseId(lesson)]=lesson.id; save();
  const course=courses.find(c=>c.id===courseId(lesson));
  $('#course-name').textContent=course.name+' 튜토리얼';
  $('#progress-caption').textContent=course.name+' 학습 여정';
  $('#runtime-info').textContent=course.location+' — '+course.detail;
  $('#api-explanations').replaceChildren();
  explanations(lesson).forEach(([name, description])=>{const item=document.createElement('details');const title=document.createElement('summary');title.textContent=name;const text=document.createElement('p');text.textContent=description;item.append(title,text);$('#api-explanations').append(item);});
  tracer.reset();
  $('#trace-panel').hidden=!['matrix-steps','stack','cpp-vector','cpp-search'].includes(lesson.id);
  $('#show-trace').hidden=$('#trace-panel').hidden;
  $('#crumb').textContent=lesson.group;
  $('#eyebrow').textContent=`LESSON ${String(courseLessons().indexOf(lesson)+1).padStart(2,'0')} · ${lesson.runtime==='torch'?'PYTORCH':lesson.runtime.toUpperCase()}`;
  for(const id of ['title','lead','concept','predict','task','takeaway','time']) $('#'+id).textContent=lesson[id];
  $('#visual-label').textContent=lesson.visual[0]; $('#visual-main').textContent=lesson.visual[1]; $('#visual-sub').textContent=lesson.visual[2];
  $('#hint-code').textContent=lesson.hint; $('#hint').open=false;
  $('#filename').textContent=lesson.id+'_practice.'+(lesson.runtime==='cpp'?'cpp':'py');
  $('#reference-code').textContent=lesson.code.trimEnd()+(lesson.referenceComplete?'':'\n\n# 실습 완성 예시\n'+lesson.hint);
  $('#restore-legacy').hidden=typeof saved.codes[lesson.id]!=='string' || !saved.codes[lesson.id].trim();
  $('#runtime-label').textContent=lesson.runtime==='cpp'?'● C++17 · 로컬 Docker CPU':lesson.runtime==='torch'?'● PyTorch · 로컬 Docker CPU':'● 내 브라우저 · '+(lesson.runtime==='numpy'?'Python + NumPy':'Python');
  $('#runtime-status').textContent=['torch','cpp'].includes(lesson.runtime)?'로컬 환경 확인 필요':'브라우저에서 실제 실행';
  $('#editor').value=typeof saved.practiceCodes[lesson.id]==='string'?saved.practiceCodes[lesson.id]:'';
  $('#output').textContent='아직 실행하지 않았습니다.\n위의 코드를 참고해 아래 입력창에 직접 작성한 뒤 실행해 보세요.';$('#output').className='';$('#result').textContent='';
  $('#prev').disabled=courseLessons().indexOf(lesson)===0; $('#next').disabled=courseLessons().indexOf(lesson)===courseLessons().length-1;
  $('#editor').placeholder=lesson.runtime==='cpp'?'// 위 코드를 참고해 직접 입력하세요.\n// 입력한 C++ 코드만 컴파일·실행됩니다.':'# 위 코드를 참고해 직접 입력하세요.\n# 입력한 코드만 실행됩니다.';
  $('#editor').setAttribute('aria-label',lesson.runtime==='cpp'?'직접 입력하는 C++ 코드 편집기':'직접 입력하는 Python 코드 편집기');
  renderNav();lines();
}
function setBusy(value) {busy=value; $('#run').disabled=value; $('#check').disabled=value; $('#reset').disabled=value; $('#restore-legacy').disabled=value; $('#stop').hidden=!value;}
function finish(passed=false) {
  clearTimeout(timer);setBusy(false);tracer.complete();$('#runtime-status').textContent='실행 완료';
  if(!$('#output').textContent) $('#output').textContent='출력 없이 정상 종료되었습니다. print()로 값을 확인해 보세요.';
  if(passed) {if(!saved.completed.includes(lesson.id)) saved.completed.push(lesson.id);save();renderNav();$('#result').textContent='✓ 실습을 통과했습니다. 내 말로 원리를 설명해 보세요.';}
}
function fail(text) {clearTimeout(timer);setBusy(false);tracer.complete();$('#runtime-status').textContent='실행 오류';$('#output').className='error';append(text);}
function append(text) {const out=$('#output');if(out.textContent.length<66000) out.textContent+=text+'\n';out.scrollTop=out.scrollHeight;}
function stop(show=true) {tracer.pause();sequence++;clearTimeout(timer);if(busy){worker?.terminate();worker=null;aborter?.abort();setBusy(false);if(show){append(['torch','cpp'].includes(lesson.runtime)?'실행을 중지했습니다. 서버 작업은 15초 제한 안에 종료됩니다.':'실행을 중지했습니다. 다음 실행에서 Python 환경을 새로 준비합니다.');$('#runtime-status').textContent='중지됨';}}}
function consumeOutput(text, stream='stdout') {
  const plain=[];
  for(const line of text.split('\n')) {if(stream!=='stdout'||!tracer.consume(line)) plain.push(line);}
  const content=plain.join('\n').trimEnd();
  if(content){append(content);if(stream==='stdout')capturedOutput+=content+'\n';}
}
async function run(check=false) {
  if(busy) return;
  const code=$('#editor').value;
  if(!code.trim()) {$('#result').textContent='아래 입력창에 코드를 먼저 작성해 주세요. 위의 참고 코드는 실행되지 않습니다.'; $('#editor').focus(); return;}
  saved.practiceCodes[lesson.id]=code;save();tracer.reset(code);capturedOutput='';$('#output').textContent='';$('#output').className='';$('#result').textContent='';setBusy(true);
  $('#runtime-status').textContent='실행 준비 중…';const seq=++sequence;
  if(['torch','cpp'].includes(lesson.runtime)) {
    aborter=new AbortController();timer=setTimeout(()=>{aborter.abort();},25000);
    try {
      const config=await fetch('/api/session',{signal:aborter.signal}).then(r=>{if(!r.ok) throw Error('실행 서버에 연결할 수 없습니다.');return r.json();});
      const response=await fetch('/api/run',{method:'POST',headers:{'Content-Type':'application/json','X-Lab-Token':config.token},body:JSON.stringify({code,check:check&&lesson.runtime!=='cpp'?lesson.check:'',runtime:lesson.runtime}),signal:aborter.signal});
      const result=await response.json();if(seq!==sequence) return;
      if(!response.ok) throw Error(result.error || '서버 실행 실패');
      if(result.stdout) consumeOutput(result.stdout);
      if(result.stderr) consumeOutput(result.stderr,'stderr');
      if(result.error || result.returncode!==0) throw Error(result.error || `${lesson.runtime==='cpp'?'C++':'Python'} 실행이 오류 코드 ${result.returncode}로 종료되었습니다.`);
      if(check&&lesson.runtime==='cpp'&&capturedOutput.trim()!==lesson.expectedOutput) throw Error('실습 결과를 확인하세요. 기대 출력: '+lesson.expectedOutput+' / 실제 출력: '+(capturedOutput.trim()||'(없음)'));
      finish(check);
    } catch(error) {if(seq===sequence) fail(error.name==='AbortError'?'응답 시간이 초과되었습니다. 실행 환경을 확인하세요.':error.message);}
    return;
  }
  if(!worker) worker=new Worker('/python-worker.js',{type:'module'});
  timer=setTimeout(()=>{stop();fail('Python 준비 시간이 초과되었습니다. 인터넷 연결을 확인하고 다시 실행하세요.');},90000);
  worker.onmessage=({data})=>{
    if(seq!==sequence) return;
    if(data.type==='status') $('#runtime-status').textContent=data.text;
    if(data.type==='executing') {clearTimeout(timer);$('#runtime-status').textContent='실행 중…';timer=setTimeout(()=>{stop(false);fail('실행 시간이 15초를 초과해 중지했습니다. 반복문을 확인하세요.');},15000);}
    if(data.type==='output') consumeOutput(data.text,data.stream);
    if(data.type==='done') finish(data.passed);
    if(data.type==='error') fail(data.text);
  };
  worker.onerror=event=>{if(seq!==sequence)return;worker?.terminate();worker=null;fail('Python 실행 환경을 불러오지 못했습니다. 인터넷/CDN 연결을 확인하세요. '+event.message);};
  worker.postMessage({code,check:check?lesson.check:'',numpy:lesson.runtime==='numpy'});
}
$('#editor').oninput=()=>{tracer.edited();saved.practiceCodes[lesson.id]=$('#editor').value;save();lines();};
$('#editor').onscroll=()=>$('#line-numbers').scrollTop=$('#editor').scrollTop;
$('#editor').onkeydown=e=>{if(e.key==='Tab'){e.preventDefault();const ed=e.target;ed.setRangeText('    ',ed.selectionStart,ed.selectionEnd,'end');ed.dispatchEvent(new Event('input'));}};
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();run();}});
$('#show-trace').onclick=()=>$('#trace-panel').scrollIntoView({behavior:'smooth',block:'start'});
$('#run').onclick=()=>run();$('#check').onclick=()=>run(true);$('#stop').onclick=()=>stop();
$('#reset').onclick=()=>{if($('#editor').value && !confirm('이 수업의 입력창을 비우고 처음부터 연습할까요?')) return; tracer.reset();$('#editor').value='';saved.practiceCodes[lesson.id]='';save();lines();$('#result').textContent='';$('#editor').focus();};
$('#restore-legacy').onclick=()=>{if($('#editor').value && !confirm('현재 입력을 이전 작성 코드로 바꿀까요?')) return; tracer.reset();$('#editor').value=saved.codes[lesson.id];saved.practiceCodes[lesson.id]=$('#editor').value;save();lines();$('#editor').focus();};
$('#clear').onclick=()=>{$('#output').textContent='';$('#result').textContent='';};
$('#prev').onclick=()=>location.hash=courseLessons()[courseLessons().indexOf(lesson)-1].id;
$('#next').onclick=()=>location.hash=courseLessons()[courseLessons().indexOf(lesson)+1].id;
async function health(){
  $('#backend-health').textContent='환경 확인 중…';
  try {const r=await fetch('/api/health',{signal:AbortSignal.timeout(8000)});if(!r.ok)throw Error();const data=await r.json();$('#backend-health').textContent=['torch','cpp'].map(key=>(key==='torch'?'PyTorch':'C++')+': '+(data[key]?.ready?'CPU 실행 준비 완료':data[key]?.message||'상태 확인 불가')).join('\n');}
  catch{$('#backend-health').textContent='실행 서버에 연결할 수 없습니다. README의 python3 server.py로 시작하세요.';}
}
function applyFontSize() {
  const scale=[.9,1,1.1,1.2,1.3].includes(saved.fontScale)?saved.fontScale:1;
  saved.fontScale=scale;
  document.documentElement.style.setProperty('--text-size', (16*scale)+'px');
  $('#font-reset').textContent=Math.round(scale*100)+'%';
  $('#font-reset').setAttribute('aria-label', '글자 크기 '+Math.round(scale*100)+'%, 기본값으로');
  document.body.classList.toggle('large-text',scale>=1.2);
  $('#font-smaller').disabled=scale===.9; $('#font-larger').disabled=scale===1.3;
  fitEditor();save();
}
function changeFont(direction){const sizes=[.9,1,1.1,1.2,1.3];const index=sizes.indexOf(saved.fontScale);saved.fontScale=sizes[Math.max(0,Math.min(sizes.length-1,index+direction))];applyFontSize();}
$('#font-smaller').onclick=()=>changeFont(-1);
$('#font-larger').onclick=()=>changeFont(1);
$('#font-reset').onclick=()=>{saved.fontScale=1;applyFontSize();};
window.addEventListener('resize', fitEditor);
applyFontSize();
$('#settings').onclick=()=>{$('#environment').showModal();health();};$('#health-refresh').onclick=health;
window.addEventListener('hashchange',selectLesson);
if(!location.hash && lessons.some(l=>l.id===saved.current)) location.hash=saved.current;
selectLesson();
