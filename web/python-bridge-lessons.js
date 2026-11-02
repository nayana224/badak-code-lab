// 짧은 예제를 쌓아 작은 자동 미분기의 표현을 미리 익힙니다.
export const pythonBridgeLessons = [
 {
  id:'py-nested-function',runtime:'python',group:'Python 문법',title:'함수 안의 함수와 기억하는 값',short:'중첩 함수 · 클로저',time:'15분',
  lead:'나중에 실행할 계산이 지금의 값을 어떻게 기억하는지 살펴봅니다.',
  concept:'함수 안에 만든 함수도 값처럼 반환할 수 있습니다. 안쪽 함수가 바깥 함수의 변수를 참조하면, 바깥 함수가 끝난 뒤에도 그 값을 사용할 수 있습니다. 이를 클로저라고 부릅니다.',
  visual:['make_multiplier(3) → 함수','함수(4) → 12','함수가 factor를 기억합니다'],
  predict:'times_three를 만든 뒤 호출하면 factor는 어떤 값일까요?',
  code:'def make_multiplier(factor):\n    def multiply(value):\n        return factor * value\n    return multiply\n\ntimes_three = make_multiplier(3)\nresult = times_three(4)\nprint(result)\n',
  task:'3을 기억하는 함수를 만들고 5를 전달해 result에 15를 저장하세요. 다른 factor에도 동작해야 합니다.',hint:'result = times_three(5)',
  solution:'def make_multiplier(factor):\n    def multiply(value):\n        return factor * value\n    return multiply\n\ntimes_three = make_multiplier(3)\nresult = times_three(5)\nprint(result)\n',referenceComplete:true,
  check:'assert result == 15 and make_multiplier(2)(7) == 14 and make_multiplier(-1)(3) == -3, "각 함수가 자신의 factor를 기억하는지 확인하세요."',
  explain:[['def multiply(value)','바깥 함수 안에서 함수를 정의합니다.'],['return multiply','함수를 바로 실행하지 않고 반환합니다. 괄호가 없는 것에 주목하세요.'],['factor','안쪽 함수가 바깥 함수의 factor를 참조합니다. 자동 미분기에서는 각 연산의 입력과 결과를 기억할 때 사용합니다.']],
  takeaway:'함수도 값입니다. 클로저는 함수가 만들어진 환경의 변수를 참조합니다.'
 },
 {
  id:'py-graph-visit',runtime:'python',group:'Python 문법',title:'재귀와 집합으로 연결된 항목 방문하기',short:'재귀 · set · 중복 방문',time:'18분',
  lead:'계산 그래프를 거꾸로 방문하기 전에 연결된 항목을 한 번씩 모아 봅니다.',
  concept:'재귀는 함수가 자기 자신을 호출하는 것입니다. 이미 방문한 항목은 set에 기록해 다시 방문하지 않습니다. 더 방문할 이웃이 없거나 이미 방문한 항목이면 호출이 끝납니다.',
  visual:['출력 → 중간 → 입력','이미 방문한 입력은 건너뜀','이웃을 먼저 모은 뒤 자신을 추가'],
  predict:'입력 x가 두 경로에 있어도 결과 목록에는 몇 번 나타날까요?',
  code:'parents = {"y": ["square", "x"], "square": ["x"], "x": []}\norder = []\nseen = set()\n\ndef visit(node):\n    if node in seen:\n        return\n    seen.add(node)\n    for parent in parents[node]:\n        visit(parent)\n    order.append(node)\n\nvisit("y")\nprint(order)\n',
  task:'visit("y")를 실행해 부모가 먼저인 ["x", "square", "y"]를 만드세요. x는 한 번만 포함되어야 합니다.',hint:'visit("y")',
  solution:'parents = {"y": ["square", "x"], "square": ["x"], "x": []}\norder = []\nseen = set()\n\ndef visit(node):\n    if node in seen:\n        return\n    seen.add(node)\n    for parent in parents[node]:\n        visit(parent)\n    order.append(node)\n\nvisit("y")\nprint(order)\n',referenceComplete:true,
  check:'assert order == ["x", "square", "y"] and seen == {"x", "square", "y"}, "부모를 먼저 방문하고 중복을 건너뛰세요."',
  explain:[['set()과 seen.add(node)','중복 없이 방문한 항목을 저장합니다.'],['visit(parent)','같은 함수를 부모마다 다시 호출합니다.'],['order.append(node)','부모를 모두 방문한 뒤 현재 항목을 추가합니다. 역전파에서는 이 순서를 뒤집습니다.']],
  takeaway:'부모를 먼저 모은 순서를 뒤집으면 출력에서 입력 방향으로 계산할 수 있습니다.'
 },
 {
  id:'math-branch-gradient',runtime:'python',group:'수학',title:'두 경로에서 온 기울기를 더하기',short:'계산 그래프 · 공유 노드 · 기울기',time:'15분',
  lead:'작은 자동 미분기를 만들기 전에 같은 입력이 두 번 쓰이는 식을 손으로 따라갑니다.',
  concept:'y = x × x + x에서 x는 곱셈의 두 입력과 덧셈의 한 입력에 사용됩니다. 각 경로에서 온 기울기는 더합니다. 곱셈의 양쪽 경로는 각각 x, 덧셈 경로는 1입니다.',
  visual:['x → x × x ┐','x ────────── + → y','세 경로의 기울기 x + x + 1'],
  predict:'x가 3이면 각 경로의 기울기와 합은 얼마일까요?',
  code:'x = 2.0\nsquare = x * x\ny = square + x\ngrad_from_left = x\ngrad_from_right = x\ngrad_from_add = 1.0\ngrad_x = grad_from_left + grad_from_right + grad_from_add\nrecord("gradient_paths", x=x, y=y, left=grad_from_left, right=grad_from_right, direct=grad_from_add, total=grad_x)\nprint("y:", y, "gradient:", grad_x)\n',
  task:'x를 3으로 바꾸고 y=12, grad_x=7을 확인하세요.',hint:'x = 3.0',
  solution:'x = 3.0\nsquare = x * x\ny = square + x\ngrad_from_left = x\ngrad_from_right = x\ngrad_from_add = 1.0\ngrad_x = grad_from_left + grad_from_right + grad_from_add\nrecord("gradient_paths", x=x, y=y, left=grad_from_left, right=grad_from_right, direct=grad_from_add, total=grad_x)\nprint("y:", y, "gradient:", grad_x)\n',referenceComplete:true,
  check:'assert x == 3 and square == 9 and y == 12 and grad_x == 7, "각 경로의 기울기를 더하세요."',
  trace:true,
  explain:[['곱셈의 두 입력','한쪽 입력을 고정하면 다른 쪽에 대한 기울기는 고정한 입력값입니다.'],['grad_from_add = 1','x가 1 증가하면 덧셈 결과도 1 증가합니다.'],['경로의 합','같은 값이 여러 경로로 쓰인 효과를 모두 더합니다.']],
  takeaway:'공유 노드의 기울기는 각 경로에서 온 기울기의 합입니다.'
 }
];
