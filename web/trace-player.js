const PREFIX = '__BADAK_TRACE__';
const number = x => typeof x==='number' && Number.isFinite(x) && Math.abs(x)<=1e12;
const integer = x => Number.isInteger(x);
const values = x => Array.isArray(x) && x.length<=32 && x.every(number);
const matrix = x => Array.isArray(x) && x.length>0 && x.length<=8 && x.every(row=>values(row)&&row.length>0&&row.length<=8&&row.length===x[0].length);
export function validateFrame(frame) {
 if(!frame || !integer(frame.line) || frame.line<1 || frame.line>10000) return false;
 if(frame.kind==='matrix') return matrix(frame.left)&&matrix(frame.right)&&matrix(frame.result)&&frame.left[0].length===frame.right.length&&frame.result.length===frame.left.length&&frame.result[0].length===frame.right[0].length&&['row','col','inner'].every(k=>integer(frame[k])&&frame[k]>=0)&&frame.row<frame.left.length&&frame.col<frame.right[0].length&&frame.inner<frame.right.length&&number(frame.product)&&number(frame.total);
 if(frame.kind==='training') return integer(frame.epoch)&&frame.epoch>=0&&frame.epoch<=1e7&&number(frame.loss)&&frame.loss>=0&&values(frame.weights)&&(frame.accuracy===undefined||(number(frame.accuracy)&&frame.accuracy>=0&&frame.accuracy<=1));
 if(frame.kind==='queue') return values(frame.values)&&['enqueue','dequeue'].includes(frame.action)&&number(frame.value);
 if(frame.kind==='sort') return values(frame.values)&&['first','second'].every(k=>integer(frame[k])&&frame[k]>=0&&frame[k]<frame.values.length)&&typeof frame.swapped==='boolean';
 if(frame.kind==='stack') return values(frame.values)&&['push','pop'].includes(frame.action)&&number(frame.value);
 if(frame.kind==='array') return values(frame.values)&&integer(frame.active)&&frame.active>=0&&frame.active<frame.values.length&&number(frame.total);
 if(frame.kind==='search') return values(frame.values)&&['left','right','mid'].every(k=>integer(frame[k])&&frame[k]>=0&&frame[k]<frame.values.length)&&frame.left<=frame.mid&&frame.mid<=frame.right&&number(frame.target);
 return false;
}
const make=(tag, text, cls)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;};
const fmt=x=>Number.isInteger(x)?String(x):Number(x.toPrecision(5)).toString();
export function createTracePlayer(root) {
 let frames=[],index=0,code='',clock=null,invalid=false;
 const $=s=>root.querySelector(s);
 function pause(){clearInterval(clock);clock=null;$('[data-play]').textContent='▶ 재생';}
 function render() {
  $('[data-count]').textContent=frames.length?`${index+1} / ${frames.length} 단계`:'실행 기록 없음';
  $('[data-prev]').disabled=!frames.length||index===0;
  $('[data-next]').disabled=!frames.length||index===frames.length-1;
  $('[data-play]').disabled=frames.length<2;
  $('[data-slider]').max=Math.max(0,frames.length-1);$('[data-slider]').value=index;$('[data-slider]').disabled=!frames.length;
  const scene=$('[data-scene]');scene.replaceChildren();
  if(!frames.length){scene.append(make('p','record() 또는 C++ 기록 도우미가 포함된 코드를 아래 입력창에서 실행하면 실제 단계가 표시됩니다.','trace-empty'));$('[data-source]').textContent='';return;}
  const f=frames[index];
  if(f.kind==='training') {
   const history=frames.slice(0,index+1).filter(v=>v.kind==='training');
   const maxLoss=Math.max(...history.map(v=>v.loss),1e-12);
   const maxEpoch=Math.max(...history.map(v=>v.epoch),1);
   const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 560 200');svg.setAttribute('role','img');svg.setAttribute('aria-label','실제 손실 곡선: '+history.map(v=>`epoch ${v.epoch}, loss ${fmt(v.loss)}`).join('; '));svg.classList.add('loss-chart');
   const points=history.map(v=>[45+v.epoch/maxEpoch*490,165-v.loss/maxLoss*135]);
   const add=(tag,attrs)=>{const el=document.createElementNS(svg.namespaceURI,tag);for(const [key,value] of Object.entries(attrs))el.setAttribute(key,String(value));svg.append(el);return el;};
   add('path',{d:'M45 20 V165 H535',fill:'none',stroke:'#b7cbbb','stroke-width':1});
   add('polyline',{points:points.map(p=>p.join(',')).join(' '),fill:'none',stroke:'#378365','stroke-width':3});
   points.forEach(([cx,cy])=>add('circle',{cx,cy,r:3,fill:'#378365'}));
   const label=(x,y,text)=>{const el=add('text',{x,y,fill:'#72867a','font-size':11});el.textContent=text;};
   label(45,190,'epoch 0');label(465,190,'epoch '+maxEpoch);label(4,25,fmt(maxLoss));label(24,168,'0');
   scene.append(svg);
   scene.append(make('p',`epoch ${f.epoch} · 실제 loss = ${fmt(f.loss)}`+(f.accuracy===undefined?'':` · 정확도 ${fmt(f.accuracy*100)}%`),'trace-description'));
   if(f.weights.length)scene.append(make('p','기록된 파라미터: ['+f.weights.map(fmt).join(', ')+']','trace-description'));
   const data=make('details',undefined,'loss-data');data.append(make('summary','손실 곡선의 실제 수치 보기'));const table=make('table');const header=make('tr');header.append(make('th','epoch'),make('th','loss'));table.append(header);history.forEach(v=>{const row=make('tr');row.append(make('td',String(v.epoch)),make('td',String(v.loss)));table.append(row);});data.append(table);scene.append(data);
  } else if(f.kind==='matrix') {
   const boxes=make('div',undefined,'matrix-scene');
   const draw=(label,data,highlight)=>{const box=make('div',undefined,'matrix-box');box.append(make('strong',label));const grid=make('div',undefined,'matrix-grid');grid.style.gridTemplateColumns=`repeat(${data[0].length}, minmax(32px,1fr))`;data.forEach((row,i)=>row.forEach((v,j)=>grid.append(make('span',fmt(v),highlight(i,j)?'matrix-cell active':'matrix-cell'))));box.append(grid);return box;};
   boxes.append(draw('A',f.left,(i,k)=>i===f.row&&k===f.inner),make('b','×'),draw('B',f.right,(k,j)=>k===f.inner&&j===f.col),make('b','→'),draw('C',f.result,(i,j)=>i===f.row&&j===f.col));scene.append(boxes);
   scene.append(make('p',`A[${f.row}, ${f.inner}] × B[${f.inner}, ${f.col}] = ${fmt(f.product)} · C[${f.row}, ${f.col}] 누적값 = ${fmt(f.total)}`,'trace-description'));
  } else {
   const cells=make('div',undefined,f.kind==='stack'?'stack-scene':'array-scene');
   if(!f.values.length)cells.append(make('span',f.kind==='queue'?'빈 큐':'빈 스택','trace-empty'));
   f.values.forEach((v,i)=>{
    const cell=make('div',undefined,'array-cell');cell.append(make('strong',fmt(v)),make('small',String(i)));
    if(f.kind==='array'&&i===f.active)cell.classList.add('active');
    if(f.kind==='stack'&&i===f.values.length-1){cell.classList.add('active');cell.append(make('span','TOP','cell-tag'));}
    if(f.kind==='sort'&&(i===f.first||i===f.second)){cell.classList.add('active');cell.append(make('span','비교','cell-tag'));}
    if(f.kind==='queue'&&f.values.length){if(i===0)cell.append(make('span','FRONT','cell-tag'));if(i===f.values.length-1)cell.append(make('span','REAR','queue-rear'));}
    if(f.kind==='search') {if(i<f.left||i>f.right)cell.classList.add('excluded');if(i===f.mid)cell.classList.add('active');const tags=[];if(i===f.left)tags.push('L');if(i===f.mid)tags.push('M');if(i===f.right)tags.push('R');if(tags.length)cell.append(make('span',tags.join(' · '),'cell-tag'));}
    cells.append(cell);
   });scene.append(cells);
   const desc=f.kind==='training'?'':f.kind==='queue'?`${f.action}(${fmt(f.value)}) 후 큐 · 원소 ${f.values.length}개`:f.kind==='sort'?`인덱스 ${f.first}와 ${f.second} 비교 · ${f.swapped?'교환했습니다':'교환하지 않았습니다'} (비교 후 실제 배열)`:f.kind==='array'?`인덱스 ${f.active}의 값 ${fmt(f.values[f.active])}까지 더한 실제 누적 합: ${fmt(f.total)}`:f.kind==='stack'?`${f.action}(${fmt(f.value)}) 후 스택 · 원소 ${f.values.length}개`:`탐색 범위 [${f.left}, ${f.right}] · mid=${f.mid} · 값=${fmt(f.values[f.mid])} · 목표=${fmt(f.target)}`;
   scene.append(make('p',desc,'trace-description'));
  }
  const source=code.split('\n')[f.line-1];$('[data-source]').textContent=`실행 코드 ${f.line}행: ${source ?? '(행 정보 없음)'}`;
 }
 $('[data-prev]').onclick=()=>{pause();index=Math.max(0,index-1);render();};
 $('[data-next]').onclick=()=>{pause();index=Math.min(frames.length-1,index+1);render();};
 $('[data-slider]').oninput=e=>{pause();index=Number(e.target.value);render();};
 function play(){pause();if(index===frames.length-1)index=0;render();$('[data-play]').textContent='Ⅱ 일시정지';clock=setInterval(()=>{if(index>=frames.length-1){pause();return;}index++;render();},Number($('[data-speed]').value));}
 $('[data-play]').onclick=()=>clock?pause():play();
 $('[data-speed]').onchange=()=>{if(clock)play();};
 render();
 return {
  reset(source=''){pause();frames=[];index=0;code=source;invalid=false;$('[data-warning]').textContent='';render();},
  pause,
  consume(line){
   if(!line.startsWith(PREFIX))return false;
   try {const frame=JSON.parse(line.slice(PREFIX.length));if(!validateFrame(frame)||frames.length>=128)throw Error();frames.push(frame);if(frames.length===1)render();else $('[data-count]').textContent=`${index+1} / ${frames.length} 단계`;}
   catch {if(!invalid){invalid=true;$('[data-warning]').textContent='일부 시각화 기록이 지원 형식·크기 제한과 맞지 않아 제외되었습니다.';}}
   return true;
  },
  complete(){render();},
  edited(){pause();if(frames.length)$('[data-warning]').textContent='코드가 바뀌었습니다. 아래 그림은 이전 실행 기록입니다. 다시 실행해 갱신하세요.';},
  clearWarning(){$('[data-warning]').textContent='';}
 };
}
