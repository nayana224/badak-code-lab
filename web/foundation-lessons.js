export const foundationLessons = [
 {
  id:'py-first', runtime:'python', group:'Python 문법', title:'숫자에 이름을 붙이고 출력하기', short:'변수 · 계산 · print', time:'8분',
  lead:'작은 계산부터 시작합니다. 값을 이름에 담고 화면에서 확인해 봅시다.',
  concept:'변수는 값에 붙이는 이름입니다. =는 오른쪽의 값을 왼쪽 이름에 저장합니다. print()는 괄호 안의 값을 출력합니다.',
  visual:['price = 3','3 + 2 = 5','이름을 이용하면 같은 값을 다시 쓸 수 있습니다'],
  predict:'price가 3이고 count가 2라면 price * count는 얼마일까요?',
  code:'price = 3\ncount = 2\ntotal = price * count\nprint(total)\n',
  task:'count를 4로 바꾸고 total이 12가 되게 하세요.', hint:'count = 4',
  solution:'price = 3\ncount = 4\ntotal = price * count\nprint(total)\n', referenceComplete:true,
  check:'assert price == 3 and count == 4 and total == 12, "price와 count를 곱해 total을 만들어 보세요."',
  explain:[['변수와 =','오른쪽 값을 계산한 뒤 왼쪽 이름에 연결합니다.'],['print(total)','total의 현재 값을 화면에 출력합니다.'],['*','두 숫자를 곱합니다.']],
  takeaway:'이름에 값을 저장하고, 계산하고, print()로 확인할 수 있습니다.'
 },
 {
  id:'py-list-index', runtime:'python', group:'Python 문법', title:'리스트에서 하나씩 꺼내기', short:'list · 인덱스', time:'10분',
  lead:'여러 값을 하나의 리스트에 넣고 위치로 꺼내 봅니다.',
  concept:'리스트의 위치는 0부터 시작합니다. values[0]은 첫 번째, values[1]은 두 번째 값입니다.',
  visual:['[10, 20, 30]','0  ·  1  ·  2','첫 번째 위치는 0입니다'],
  predict:'values[2]는 어떤 값일까요? values[3]은 세 값 중 하나를 가리킬까요?',
  code:'values = [10, 20, 30]\nfirst = values[0]\nprint(first)\n',
  task:'세 번째 값을 last에 저장하고 출력하세요.',hint:'last = values[2]\nprint(last)',
  check:'assert values == [10, 20, 30] and first == 10 and last == 30, "인덱스 2로 세 번째 값을 꺼내세요."',
  explain:[['[10, 20, 30]','순서가 있는 값을 리스트에 담습니다.'],['values[2]','0부터 세어 인덱스 2의 값을 읽습니다.']],
  takeaway:'인덱스는 0부터 시작하며 범위를 벗어나면 IndexError가 발생합니다.'
 },
 {
  id:'math-dot', runtime:'python', group:'수학', title:'내적을 직접 계산하기', short:'벡터 · 내적', time:'12분',
  lead:'행렬 곱의 한 칸을 이해하기 위해 두 짧은 리스트의 내적부터 만들어 봅니다.',
  concept:'같은 위치의 숫자를 곱하고 그 결과를 더하면 내적입니다. 두 리스트의 길이는 같아야 합니다.',
  visual:['[1, 2] · [3, 4]','1 × 3 + 2 × 4 = 11','곱한 결과를 누적합니다'],
  predict:'두 번째 벡터를 [3, 5]로 바꾸면 내적은 얼마일까요?',
  code:'a = [1, 2]\nb = [3, 4]\ntotal = 0\nfor i in range(len(a)):\n    total += a[i] * b[i]\nprint(total)\n',
  task:'b를 [3, 5]로 바꾸어 total을 13으로 만드세요.',hint:'b = [3, 5]',
  solution:'a = [1, 2]\nb = [3, 5]\ntotal = 0\nfor i in range(len(a)):\n    total += a[i] * b[i]\nprint(total)\n',referenceComplete:true,
  check:'assert a == [1, 2] and b == [3, 5] and total == 13, "같은 위치의 곱을 더해 보세요."',
  explain:[['range(len(a))','a의 인덱스 0과 1을 차례로 만듭니다.'],['total += ...','오른쪽 값을 기존 total에 더해 다시 저장합니다.']],
  takeaway:'내적은 같은 위치의 곱을 더한 값이며 행렬 곱의 한 칸에 해당합니다.'
 },
 {
  id:'math-derivative', runtime:'python', group:'수학', title:'조금 바꿔 기울기 살펴보기', short:'함수 · 수치 미분', time:'15분',
  lead:'자동 미분을 쓰기 전에 입력을 조금 바꾸고 출력의 변화를 직접 관찰합니다.',
  concept:'f(x)=x²에서 x를 아주 조금 h만큼 바꾸면, 출력 변화량을 h로 나눈 값은 x에서의 기울기에 가까워집니다.',
  visual:['f(x) = x²','(f(x+h) − f(x)) / h','작은 변화로 기울기를 근사합니다'],
  predict:'x=3에서 x²의 기울기는 6입니다. h를 작게 하면 계산값이 6에 가까워질까요?',
  code:'def f(x):\n    return x * x\n\nx = 3.0\nh = 0.01\nslope = (f(x + h) - f(x)) / h\nprint(slope)\n',
  task:'h를 0.001로 바꾸고 slope가 6에 가까운지 확인하세요.',hint:'h = 0.001',
  solution:'def f(x):\n    return x * x\n\nx = 3.0\nh = 0.001\nslope = (f(x + h) - f(x)) / h\nprint(slope)\n',referenceComplete:true,
  check:'assert x == 3.0 and h == 0.001, "x=3.0에서 h를 0.001로 설정하세요."\nassert abs(slope - (f(x+h)-f(x))/h) < 1e-9 and abs(slope-6) < 0.01, "변화량의 비율을 계산하세요."',
  explain:[['def f(x)','입력을 받아 제곱한 값을 반환하는 함수입니다.'],['(f(x+h)-f(x))/h','입력 변화량에 대한 출력 변화량의 비율입니다.']],
  takeaway:'수치 미분은 근삿값입니다. h가 지나치게 작으면 부동소수점 오차가 커질 수 있습니다.'
 },
 {
  id:'py-linear-search', runtime:'python', group:'알고리즘', title:'앞에서부터 하나씩 찾기', short:'순차 탐색', time:'12분',
  lead:'이진 탐색 전에 가장 단순한 탐색을 직접 만듭니다.',
  concept:'순차 탐색은 첫 원소부터 목표와 비교합니다. 찾으면 위치를 반환하고 끝까지 없으면 -1을 반환합니다.',
  visual:['[8, 3, 5] → 5','8 → 3 → 5','앞에서부터 차례로 비교합니다'],
  predict:'목표가 3이면 몇 번째 인덱스에서 찾을까요? 없는 값이면 어떤 결과가 나올까요?',
  code:'def find(values, target):\n    for i in range(len(values)):\n        if values[i] == target:\n            return i\n    return -1\n\nvalues = [8, 3, 5]\nfound = find(values, 5)\nprint(found)\n',
  task:'목표를 3으로 바꿔 found에 1을 저장하세요. 없는 값은 -1이어야 합니다.',hint:'found = find(values, 3)',
  solution:'def find(values, target):\n    for i in range(len(values)):\n        if values[i] == target:\n            return i\n    return -1\n\nvalues = [8, 3, 5]\nfound = find(values, 3)\nprint(found)\n', referenceComplete:true,
  check:'assert found == 1 and find([], 3) == -1 and find(values, 9) == -1 and find(values, 8) == 0, "각 값을 순서대로 비교하고 없으면 -1을 반환하세요."',
  explain:[['return i','목표를 찾은 위치를 반환하고 함수를 끝냅니다.'],['return -1','끝까지 찾지 못했음을 나타냅니다.']],
  takeaway:'순차 탐색은 정렬이 필요 없고, 찾을 때까지 앞에서부터 살펴봅니다.'
 }
];
