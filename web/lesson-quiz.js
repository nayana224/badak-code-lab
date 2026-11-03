import { extraQuizzes } from './lesson-quiz-extra.js';
// Short independent questions: IDs link them to existing lessons without changing progress.
export const quizzes = {
 'py-first': {question:'price = 3, count = 2일 때 price * count는?', options:['5','6','32'], answer:1, explanation:'*는 곱셈이므로 3 × 2 = 6입니다.'},
 'py-list-index': {question:'values = [10, 20, 30]일 때 values[2]는?', options:['10','20','30'], answer:2, explanation:'인덱스는 0부터 시작하므로 2는 세 번째 위치입니다.'},
 'py-bool': {question:'True and False의 결과는?', options:['True','False'], answer:1, explanation:'and는 두 조건이 모두 참일 때만 참입니다.'},
 'py-for': {question:'values = [1, 2, 3]을 반복하면서 total = 0을 매 반복 안에서 실행하면 마지막 total은?', options:['3','6','0'], answer:0, explanation:'매번 누적값을 0으로 되돌리므로 마지막 원소 3만 남습니다.'},
 'containers': {question:'이름으로 값을 찾아 저장하기에 알맞은 자료형은?', options:['dict','tuple','숫자 하나'], answer:0, explanation:'dict는 키와 값을 연결하므로 이름으로 값을 찾을 수 있습니다.'},
 'py-classes': {question:'같은 클래스에서 만든 두 객체의 상태에 대한 설명으로 알맞은 것은?', options:['객체마다 다른 값을 가질 수 있다','항상 같은 값만 가진다'], answer:0, explanation:'각 객체는 자신의 인스턴스 속성을 가질 수 있습니다.'},
 'math-matrix-basics': {question:'shape가 (2, 3)인 행렬을 전치하면 shape는?', options:['(2, 3)','(3, 2)','(6, 1)'], answer:1, explanation:'전치는 행과 열을 바꾸므로 2행 3열이 3행 2열이 됩니다.'},
 'math-dot': {question:'[1, 2]와 [3, 5]의 내적은?', options:['11','13','16'], answer:1, explanation:'같은 위치끼리 곱해 더하면 1×3 + 2×5 = 13입니다.'},
 'math-derivative': {question:'f(x) = x²에서 x = 3일 때 순간 기울기는?', options:['3','6','9'], answer:1, explanation:'x²의 미분은 2x이므로 x = 3에서 6입니다.'},
 'math-chain': {question:'a = 2x, y = a²일 때 x = 2에서 dy/dx는?', options:['8','16','32'], answer:1, explanation:'a = 4이고 dy/da = 8, da/dx = 2이므로 8 × 2 = 16입니다.'},
 'shape': {question:'(2, 3) @ (3, 1)의 결과 shape는?', options:['(2, 1)','(3, 3)','(2, 3)'], answer:0, explanation:'안쪽 크기 3이 같고 바깥쪽 크기 2와 1이 결과에 남습니다.'},
 'broadcast': {question:'(2, 3)과 (3,)은 NumPy에서 원소별 덧셈이 가능할까요?', options:['가능하다','불가능하다'], answer:0, explanation:'오른쪽 축의 크기가 3으로 같으며, 부족한 앞쪽 축은 크기 1로 취급합니다.'},
 'stack': {question:'스택에 10, 20 순서로 넣고 한 번 꺼내면?', options:['10','20'], answer:1, explanation:'스택은 마지막에 넣은 값을 먼저 꺼냅니다.'},
 'py-queue': {question:'큐에 10, 20 순서로 넣고 한 번 꺼내면?', options:['10','20'], answer:0, explanation:'큐는 먼저 넣은 값을 먼저 꺼냅니다.'},
 'py-search': {question:'이진 탐색을 적용하려면 탐색 대상에 어떤 조건이 필요할까요?', options:['값이 정렬되어 있어야 한다','항상 값이 10개여야 한다','모든 값이 달라야 한다'], answer:0, explanation:'이 수업의 이진 탐색은 오름차순 정렬된 입력에서 탐색 범위를 줄입니다. 중복 값도 있을 수 있습니다.'},
 'cpp-reference': {question:'int& 매개변수를 통해 인자를 바꾸면?', options:['원본에 반영된다','항상 복사본만 바뀐다'], answer:0, explanation:'int&는 전달된 정수를 참조하므로 그 참조를 통한 변경이 원본에 반영됩니다.'},
 'cpp-vector-reallocation': {question:'vector가 재할당되면 기존 원소를 가리키던 참조는?', options:['계속 안전하게 쓸 수 있다','무효화될 수 있다'], answer:1, explanation:'재할당 시 원소가 새 저장 공간으로 이동하므로 기존 참조를 사용하면 안 됩니다.'},
 'cpp-unique': {question:'unique_ptr의 소유권에 대한 설명으로 알맞은 것은?', options:['하나의 unique_ptr이 단독 소유한다','복사하면 두 포인터가 공동 소유한다'], answer:0, explanation:'unique_ptr은 단독 소유를 표현하며 복사할 수 없습니다. 소유권은 이동할 수 있습니다.'},
 'tensor': {question:'X의 shape가 (2, 2), w가 (2, 1)이면 X @ w의 shape는?', options:['(2, 1)','(2, 2)','(1, 2)'], answer:0, explanation:'행렬 곱에서 안쪽 크기 2가 맞고 바깥쪽 크기 2와 1이 남습니다.'},
 'autograd': {question:'loss.backward()의 역할은?', options:['기울기를 계산해 .grad에 누적한다','자동으로 가중치를 갱신한다'], answer:0, explanation:'backward는 기울기를 계산합니다. 가중치 갱신은 별도의 연산이나 optimizer.step()이 담당합니다.'},
 'torch-network': {question:'두 Linear 층 사이에 Tanh 같은 비선형 함수가 필요한 이유는?', options:['선형 모델만으로 표현할 수 없는 관계도 학습하기 위해','입력 shape를 항상 1로 만들기 위해'], answer:0, explanation:'선형 변환만 연속 적용하면 전체도 선형 변환입니다. 비선형 함수가 표현 범위를 넓힙니다.'},
 'torch-softmax': {question:'같은 축에 있는 점수 세 개가 모두 같으면 각 softmax 값은?', options:['0','1/3','1'], answer:1, explanation:'같은 점수는 같은 가중치를 받고, 세 가중치의 합은 1이므로 각각 1/3입니다.'},
 'torch-causal-attention': {question:'인과 마스크에서 첫 토큰의 query는 미래 토큰의 key를 볼 수 있을까요?', options:['볼 수 있다','볼 수 없다'], answer:1, explanation:'미래 위치는 softmax 전에 가려져 해당 가중치가 0이 됩니다.'}
};
Object.assign(quizzes, extraQuizzes);
export function checkQuiz(quiz, selected) {
 if (!Number.isInteger(selected) || selected < 0 || selected >= quiz.options.length) return null;
 return selected === quiz.answer;
}
export function renderQuiz(root, id) {
 root.replaceChildren();
 const quiz = quizzes[id]; root.hidden = !quiz;
 if (!quiz) return;
 const form=document.createElement('form'); form.className='quiz-form';
 const fieldset=document.createElement('fieldset'); fieldset.setAttribute('aria-describedby','quiz-question');
 const legend=document.createElement('legend'); legend.textContent='실행 전에 예측하기'; fieldset.append(legend);
 const question=document.createElement('p'); question.id='quiz-question'; question.textContent=quiz.question; fieldset.append(question);
 quiz.options.forEach((option,index)=>{
  const label=document.createElement('label'); label.className='quiz-option';
  const input=document.createElement('input'); input.type='radio'; input.name='quiz-answer'; input.value=String(index);
  label.append(input,document.createTextNode(option)); fieldset.append(label);
 });
 const button=document.createElement('button'); button.type='submit'; button.textContent='답 확인하기'; button.className='quiz-submit';
 const result=document.createElement('p'); result.className='quiz-result'; result.setAttribute('role','status'); result.setAttribute('aria-live','polite');
 form.addEventListener('change',()=>{result.textContent=''; delete result.dataset.state;});
 form.addEventListener('submit',event=>{
  event.preventDefault();
  const selected=form.querySelector('input[name="quiz-answer"]:checked');
  if (!selected) {result.textContent='답을 하나 선택해 주세요.'; result.dataset.state='notice'; return;}
  const correct=checkQuiz(quiz,Number(selected.value));
  result.dataset.state=correct?'correct':'incorrect';
  result.textContent=correct ? `정답입니다! ${quiz.explanation}` : '아쉽지만 다시 생각해 보세요. 선택지를 바꾸고 다시 확인할 수 있습니다.';
 });
 form.append(fieldset,button,result); root.append(form);
}
