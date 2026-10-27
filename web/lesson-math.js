// Fixed worked examples; the trace panel separately shows the learner's actual execution.
const examples = {
 'math-chain': {
  formula: '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block" aria-label="와이를 엑스로 미분하면 와이를 에이로 미분한 값과 에이를 엑스로 미분한 값의 곱"><mfrac><mi>dy</mi><mi>dx</mi></mfrac><mo>=</mo><mfrac><mi>dy</mi><mi>da</mi></mfrac><mo>×</mo><mfrac><mi>da</mi><mi>dx</mi></mfrac></math>',
  meaning: 'a = 2x, y = a²입니다. 두 단계의 기울기를 곱하면 x에 대한 y의 기울기가 됩니다.',
  worked: 'x = 2이면 a = 4, dy/da = 8, da/dx = 2이므로 dy/dx = 16입니다.',
  code: 'dy_dx = dy_da * da_dx가 연쇄 법칙을 그대로 계산합니다.'
 },
 'math-manual-backward': {
  formula: '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block" aria-label="와이는 엑스 더하기 1의 제곱이며 와이를 엑스로 미분한 값은 2 곱하기 엑스 더하기 1"><mi>y</mi><mo>=</mo><msup><mrow><mo>(</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo>)</mo></mrow><mn>2</mn></msup><mo>,</mo><mfrac><mi>dy</mi><mi>dx</mi></mfrac><mo>=</mo><mn>2</mn><mo>(</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo>)</mo></math>',
  meaning: '먼저 a = x + 1을 계산하고 y = a²를 만듭니다. 역방향으로 y에서 a, a에서 x로 기울기를 전달합니다.',
  worked: 'x = 3이면 a = 4, y = 16이고 x에 대한 기울기는 8입니다.',
  code: 'grad_a와 grad_x가 단계별로 전달된 기울기를 계산합니다.'
 },
 'math-dot': {
  formula: '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block" aria-label="에이와 비의 내적은 같은 인덱스의 곱을 모두 더한 값"><mi>a</mi><mo>·</mo><mi>b</mi><mo>=</mo><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>0</mn></mrow><mrow><mi>n</mi><mo>−</mo><mn>1</mn></mrow></munderover><msub><mi>a</mi><mi>i</mi></msub><msub><mi>b</mi><mi>i</mi></msub></math>',
  meaning: 'aᵢ와 bᵢ는 두 벡터에서 같은 위치의 값입니다. n은 원소의 개수입니다.',
  worked: 'a = [1, 2], b = [3, 5]이면 1 × 3 + 2 × 5 = 13입니다.',
  code: '반복문이 a[i] * b[i]를 total에 한 항씩 더합니다. 출력은 직접 입력한 코드의 계산 결과입니다.'
 },
 'math-derivative': {
  formula: '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block" aria-label="기울기의 근삿값은 에프 엑스 더하기 에이치에서 에프 엑스를 뺀 값을 에이치로 나눈 값"><msup><mi>f</mi><mo>′</mo></msup><mo>(</mo><mi>x</mi><mo>)</mo><mo>≈</mo><mfrac><mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>+</mo><mi>h</mi><mo>)</mo><mo>−</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mi>h</mi></mfrac></math>',
  meaning: 'h는 입력의 작은 변화량이고, 분자는 그에 따른 출력의 변화량입니다. 두 변화량의 비율은 기울기의 근삿값입니다.',
  worked: 'x = 3, h = 0.001이면 (3.001² − 3²) / 0.001 = 약 6.001입니다.',
  code: 'slope = (f(x + h) - f(x)) / h가 이 수식을 계산합니다.'
 },
 'matrix-steps': {
  formula: '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block" aria-label="씨 아이 제이는 에이 아이 케이와 비 케이 제이의 곱을 케이에 대해 더한 값"><msub><mi>C</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub><mo>=</mo><munderover><mo>∑</mo><mrow><mi>k</mi><mo>=</mo><mn>0</mn></mrow><mrow><mi>n</mi><mo>−</mo><mn>1</mn></mrow></munderover><msub><mi>A</mi><mrow><mi>i</mi><mi>k</mi></mrow></msub><msub><mi>B</mi><mrow><mi>k</mi><mi>j</mi></mrow></msub></math>',
  meaning: 'C의 i행 j열 한 칸은 A의 i행과 B의 j열에서 같은 위치끼리 곱한 값을 모두 더한 것입니다. n은 A의 열 수이자 B의 행 수입니다.',
  worked: '설명용 입력 A의 첫 행 [1, 2, 3], B의 첫 열 [1, 0, 1]에서 C[0, 0] = 1 × 1 + 2 × 0 + 3 × 1 = 4입니다. 실습에서 A의 첫 값을 2로 바꾸면 이 칸은 5가 됩니다.',
  code: '코드의 C[i, j] += A[i, k] * B[k, j]가 한 항씩 더합니다. 아래 실행 기록에서 실제 값과 위치를 확인하세요.'
 },
 'autograd': {
  formula: '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block" aria-label="손실 엘을 더블유로 미분하면 2 곱하기 와이 빼기 목표 티 곱하기 엑스"><mfrac><mrow><mi>∂</mi><mi>L</mi></mrow><mrow><mi>∂</mi><mi>w</mi></mrow></mfrac><mo>=</mo><mn>2</mn><mo>(</mo><mi>y</mi><mo>−</mo><mi>t</mi><mo>)</mo><mi>x</mi></math>',
  meaning: 'y = wx + b, 손실 L = (y − t)²입니다. 이 식은 w를 조금 바꿀 때 손실이 얼마나 변하는지 나타냅니다. t는 목표값입니다.',
  worked: '예제에서 y = 3 × 2 + 1 = 7, L = (7 − 5)² = 4, ∂L/∂w = 2 × (7 − 5) × 2 = 8',
  code: 'loss.backward()를 실행한 뒤 w.grad.item()으로 실제 계산한 기울기를 확인하세요.'
 }
};

export function renderLessonMath(root, id) {
 const example = examples[id];
 root.replaceChildren();
 root.hidden = !example;
 if (!example) return;
 const title = document.createElement('h3'); title.textContent = '수식과 코드 연결하기';
 const formula = document.createElement('div'); formula.className = 'math-formula';
 formula.innerHTML = example.formula; // Static local MathML, never learner input.
 const paragraph = (text, className) => {const p=document.createElement('p');p.textContent=text;if(className)p.className=className;return p;};
 const worked = document.createElement('details');
 const summary = document.createElement('summary'); summary.textContent = '예제 계산 결과 확인하기';
 worked.append(summary, paragraph(example.worked, 'math-worked'));
 root.append(title, formula, paragraph(example.meaning), worked, paragraph(example.code));
}
