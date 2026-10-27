// Short bridge lessons introduce each concept before it is used in later exercises.
export const bridgeLessons = [
 {
  id:'py-if', runtime:'python', group:'Python 문법', title:'조건에 따라 다른 길로 가기', short:'비교 · if · else', time:'10분',
  lead:'숫자를 비교하고 조건이 참인지에 따라 실행할 코드를 고릅니다.',
  concept:'>=는 왼쪽 값이 오른쪽 이상이면 True입니다. if의 조건이 참이면 들여쓴 부분을, 그렇지 않으면 else 부분을 실행합니다.',
  visual:['점수 >= 기준','True 또는 False','조건마다 다른 코드를 실행합니다'], predict:'점수가 60일 때 score >= 60과 score > 60의 결과는 같을까요?',
  code:'score = 60\npassed = score >= 60\nif passed:\n    message = "통과"\nelse:\n    message = "다시 도전"\nprint(passed, message)\n',
  task:'score를 59로 바꾸어 passed가 False, message가 "다시 도전"이 되도록 하세요.',hint:'score = 59',
  solution:'score = 59\npassed = score >= 60\nif passed:\n    message = "통과"\nelse:\n    message = "다시 도전"\nprint(passed, message)\n',
  check:'assert score == 59 and passed is False and message == "다시 도전", "조건에 맞는 결과를 확인하세요."',
  explain:[['>=','이상인지 비교하고 True 또는 False를 만듭니다.'],['if / else','조건에 따라 실행할 블록을 고릅니다.']],takeaway:'비교 결과와 들여쓰기를 확인하며 조건에 따라 서로 다른 일을 합니다.'
 },
 {
  id:'py-for',runtime:'python',group:'Python 문법',title:'하나씩 꺼내 반복하기',short:'for · 누적',time:'10분',
  lead:'리스트의 숫자를 하나씩 꺼내 합계를 만듭니다.',concept:'for는 리스트의 원소를 차례로 꺼냅니다. total은 반복문 밖에서 한 번 0으로 시작하고, 안에서 값을 더합니다.',
  visual:['[1, 2, 3]','0 → 1 → 3 → 6','이전 합계에 현재 값을 더합니다'],predict:'total = 0을 반복문 안에 넣으면 합계가 어떻게 달라질까요?',
  code:'values = [1, 2, 3]\ntotal = 0\nfor value in values:\n    total = total + value\nprint(total)\n',task:'values에 4를 추가해 total이 10이 되게 하세요.',hint:'values = [1, 2, 3, 4]',
  solution:'values = [1, 2, 3, 4]\ntotal = 0\nfor value in values:\n    total = total + value\nprint(total)\n',check:'assert values == [1, 2, 3, 4] and total == 10, "각 원소를 한 번씩 더하세요."',
  explain:[['for value in values','원소를 순서대로 value에 넣고 들여쓴 블록을 실행합니다.'],['total = total + value','기존 total에 value를 더한 결과를 다시 저장합니다.']],takeaway:'반복 전에 초기값을 준비하고, 반복할 때마다 값을 누적합니다.'
 },
 {
  id:'py-while',runtime:'python',group:'Python 문법',title:'조건이 참인 동안 반복하기',short:'while · 종료 조건',time:'10분',
  lead:'while로 남은 횟수를 하나씩 줄여 봅니다.',concept:'while은 조건이 True인 동안 반복합니다. 반복 안에서 조건에 쓰이는 값을 바꾸지 않으면 끝나지 않을 수 있습니다.',
  visual:['3 → 2 → 1 → 0','0에서 종료','조건을 다시 확인합니다'],predict:'remaining을 줄이는 줄이 없으면 무엇이 일어날까요?',
  code:'start = 3\nremaining = start\nwhile remaining > 0:\n    print(remaining)\n    remaining -= 1\nprint("끝")\n',task:'start를 4로 바꾸고 반복 후 remaining이 0이 되게 하세요.',hint:'start = 4',
  solution:'start = 4\nremaining = start\nwhile remaining > 0:\n    print(remaining)\n    remaining -= 1\nprint("끝")\n',check:'assert start == 4 and remaining == 0, "4에서 시작해 0에서 멈추세요."',
  explain:[['while remaining > 0','매번 조건을 확인하고 참일 때 반복합니다.'],['remaining -= 1','남은 횟수를 1 줄입니다.']],takeaway:'반복 조건과 반복을 끝내는 변화를 함께 살펴봅니다.'
 },
 {
  id:'py-simple-function',runtime:'python',group:'Python 문법',title:'작은 계산을 함수로 묶기',short:'def · return',time:'10분',
  lead:'같은 계산을 여러 숫자에 적용하도록 함수를 만듭니다.',concept:'def는 함수의 이름과 입력을 정합니다. return은 계산 결과를 호출한 곳으로 돌려줍니다.',
  visual:['입력 3 → double','반환값 6','반환한 값은 다른 계산에 쓸 수 있습니다'],predict:'double(4)의 결과는 무엇일까요?',
  code:'def double(number):\n    return number * 2\n\nresult = double(3)\nprint(result)\n',task:'double(4)를 호출해 result에 8을 저장하세요. 다른 입력에도 두 배가 되어야 합니다.',hint:'result = double(4)',
  solution:'def double(number):\n    return number * 2\n\nresult = double(4)\nprint(result)\n',check:'assert result == 8 and double(3) == 6 and double(-2) == -4, "입력에 따라 두 배를 반환하세요."',
  explain:[['def double(number)','number를 입력으로 받는 함수를 정의합니다.'],['return','결과를 호출한 곳으로 돌려줍니다.']],takeaway:'함수는 입력을 받아 결과를 반환하는 작은 계산 단위입니다.'
 },
 {
  id:'math-matrix-basics',runtime:'numpy',group:'수학',title:'행렬의 행과 열, 원소별 곱',short:'행 · 열 · 전치',time:'12분',
  lead:'행렬 곱 이전에 배열을 뒤집고 같은 위치의 곱을 확인합니다.',concept:'2차원 배열의 shape는 (행 수, 열 수)입니다. 전치 .T는 행과 열을 바꿉니다. *는 같은 위치의 원소끼리 곱합니다.',
  visual:['(2, 3) → 전치','(3, 2)','*는 같은 위치의 곱입니다'],predict:'(2, 3) 행렬을 전치하면 몇 행 몇 열일까요?',
  code:'import numpy as np\nA = np.array([[1, 2, 3], [4, 5, 6]])\ntranspose = A.T\nsquared = A * A\nprint(transpose.shape)\nprint(squared)\n',task:'A의 첫 값을 2로 바꿔 transpose와 squared를 다시 계산하세요.',hint:'A = np.array([[2, 2, 3], [4, 5, 6]])',
  solution:'import numpy as np\nA = np.array([[2, 2, 3], [4, 5, 6]])\ntranspose = A.T\nsquared = A * A\nprint(transpose.shape)\nprint(squared)\n',check:'assert A.shape == (2, 3) and A[0, 0] == 2 and transpose.shape == (3, 2), "행과 열을 확인하세요."\nassert np.array_equal(transpose, A.T) and np.array_equal(squared, A * A), "전치와 원소별 곱을 계산하세요."',
  explain:[['A.T','행과 열을 바꾼 전치 배열입니다.'],['A * A','같은 위치의 원소끼리 곱합니다. 행렬 곱은 @입니다.']],takeaway:'shape와 전치를 확인하고 원소별 곱과 행렬 곱을 구분합니다.'
 },
 {
  id:'math-chain',runtime:'python',group:'수학',title:'연쇄 법칙을 숫자로 따라가기',short:'계산 그래프 · 연쇄 법칙',time:'15분',
  lead:'두 단계로 이루어진 계산에서 변화가 어떻게 이어지는지 살펴봅니다.',concept:'a = 2x, y = a²이면 dy/dx는 (dy/da) × (da/dx)입니다. 각 단계의 기울기를 곱해 전체 기울기를 구합니다.',
  visual:['x → a = 2x → y = a²','dy/dx = (2a) × 2','거꾸로 국소 기울기를 곱합니다'],predict:'x=3이면 a=6입니다. dy/dx는 12 × 2로 얼마일까요?',
  code:'x = 3.0\na = 2 * x\ny = a * a\ndy_da = 2 * a\nda_dx = 2\ndy_dx = dy_da * da_dx\nprint(y, dy_dx)\n',task:'x를 2로 바꾸고 y=16, dy_dx=16을 확인하세요.',hint:'x = 2.0',
  solution:'x = 2.0\na = 2 * x\ny = a * a\ndy_da = 2 * a\nda_dx = 2\ndy_dx = dy_da * da_dx\nprint(y, dy_dx)\n',check:'assert x == 2 and a == 4 and y == 16 and dy_da == 8 and da_dx == 2 and dy_dx == 16, "각 단계의 기울기를 곱하세요."',
  explain:[['dy_da','a²의 a에 대한 기울기 2a입니다.'],['dy_da * da_dx','두 단계의 기울기를 곱한 전체 기울기입니다.']],takeaway:'연쇄 법칙은 각 단계의 기울기를 거꾸로 연결합니다.'
 },
 {
  id:'math-manual-backward',runtime:'python',group:'수학',title:'작은 역전파를 직접 계산하기',short:'forward · backward',time:'15분',
  lead:'작은 계산 그래프의 값을 저장하고 역방향으로 기울기를 전달합니다.',concept:'x에서 a=x+1, y=a²를 계산합니다. y의 자기 자신에 대한 기울기 1부터 시작해 곱셈과 덧셈의 국소 기울기를 곱합니다. 이 예제는 고정된 그래프를 수동으로 미분하며 범용 자동 미분기는 아닙니다.',
  visual:['x → (+1) → a → (제곱) → y','1 ← 2a ← 1','각 단계의 기울기를 전달합니다'],predict:'x=2이면 a=3입니다. y의 x에 대한 기울기는 얼마일까요?',
  code:'x = 2.0\na = x + 1\ny = a * a\ngrad_y = 1.0\ngrad_a = grad_y * (2 * a)\ngrad_x = grad_a * 1\nprint(y, grad_x)\n',task:'x를 3으로 바꾸고 y=16, grad_x=8을 계산하세요.',hint:'x = 3.0',
  solution:'x = 3.0\na = x + 1\ny = a * a\ngrad_y = 1.0\ngrad_a = grad_y * (2 * a)\ngrad_x = grad_a * 1\nprint(y, grad_x)\n',check:'assert x == 3 and a == 4 and y == 16 and grad_y == 1 and grad_a == 8 and grad_x == 8, "역방향으로 각 기울기를 계산하세요."',
  explain:[['grad_y = 1','출력 자신의 변화에 대한 기울기에서 시작합니다.'],['grad_a와 grad_x','전달된 기울기에 각 연산의 국소 기울기를 곱합니다.']],takeaway:'역전파는 계산 그래프를 거꾸로 따라 기울기를 전달합니다.'
 },
 {
  id:'cpp-control',runtime:'cpp',group:'C++ 문법',title:'조건과 반복으로 합계 만들기',short:'if · for · int',time:'15분',
  lead:'C++의 조건과 반복 문법을 작은 정수 합계로 익힙니다.',concept:'int는 정수 변수입니다. for의 시작, 조건, 증가를 순서대로 확인하고 if가 참인 값만 더합니다.',
  visual:['1 → 2 → 3 → 4','짝수만 더하기','조건과 반복 블록은 중괄호로 묶습니다'],predict:'1부터 4까지 짝수의 합은 얼마일까요?',
  code:'#include <iostream>\nint main() {\n    int total = 0;\n    for (int i = 1; i <= 4; ++i) {\n        if (i % 2 == 0) {\n            total += i;\n        }\n    }\n    std::cout << total << "\\n";\n}\n',task:'반복 범위를 6까지 늘려 짝수 합 12를 출력하세요.',hint:'i <= 6',
  solution:'#include <iostream>\nint main() {\n    int total = 0;\n    for (int i = 1; i <= 6; ++i) {\n        if (i % 2 == 0) {\n            total += i;\n        }\n    }\n    std::cout << total << "\\n";\n}\n',expectedOutput:'12',
  explain:[['i % 2 == 0','2로 나눈 나머지가 0인지 확인합니다.'],['for와 ++i','조건이 참인 동안 반복하고 i를 하나씩 늘립니다.']],takeaway:'C++은 중괄호로 블록을 묶고 세미콜론으로 문장을 끝냅니다.'
 },
 {
  id:'cpp-function',runtime:'cpp',group:'C++ 문법',title:'함수에 숫자를 전달하고 반환하기',short:'함수 · 인자 · return',time:'12분',
  lead:'짧은 함수로 반복되는 계산을 분리합니다.',concept:'반환형 int는 함수가 정수를 돌려준다는 뜻입니다. 인자는 함수를 호출할 때 값을 전달받습니다.',
  visual:['double_value(3)','→ 6','입력을 받아 계산 결과를 반환합니다'],predict:'double_value(4)의 반환값은 무엇일까요?',
  code:'#include <iostream>\nint double_value(int value) {\n    return value * 2;\n}\nint main() {\n    int result = double_value(3);\n    std::cout << result << "\\n";\n}\n',task:'double_value(4)를 호출하여 8을 출력하세요.',hint:'int result = double_value(4);',
  solution:'#include <iostream>\nint double_value(int value) {\n    return value * 2;\n}\nint main() {\n    int result = double_value(4);\n    std::cout << result << "\\n";\n}\n',expectedOutput:'8',
  explain:[['int double_value(int value)','정수 인자를 받아 정수를 반환하는 함수입니다.'],['return','계산 결과를 호출한 곳으로 돌려줍니다.']],takeaway:'함수의 입력 자료형과 반환 자료형을 확인합니다.'
 },
 {
  id:'py-linked-list',runtime:'python',group:'자료구조',title:'노드를 연결해 리스트 만들기',short:'노드 · 연결 리스트',time:'18분',
  lead:'값과 다음 노드를 묶어 리스트의 연결을 직접 만들어 봅니다.',concept:'노드는 값과 다음 노드를 참조합니다. 마지막 노드의 next는 None입니다. 앞에서부터 다음 연결을 따라가면 각 값을 방문합니다.',
  visual:['10 → 20 → None','첫 노드부터 순회','연결을 따라 다음 노드에 접근합니다'],predict:'첫 노드의 next를 마지막 노드로 바꾸면 중간 노드는 순회 결과에 나타날까요?',
  code:'class Node:\n    def __init__(self, value, next_node=None):\n        self.value = value\n        self.next = next_node\n\nsecond = Node(20)\nfirst = Node(10, second)\ncurrent = first\nvalues = []\nwhile current is not None:\n    values.append(current.value)\n    current = current.next\nprint(values)\n',task:'second 뒤에 값 30인 노드를 연결해 values가 [10, 20, 30]이 되게 하세요.',hint:'second.next = Node(30)',
  solution:'class Node:\n    def __init__(self, value, next_node=None):\n        self.value = value\n        self.next = next_node\n\nsecond = Node(20)\nfirst = Node(10, second)\nsecond.next = Node(30)\ncurrent = first\nvalues = []\nwhile current is not None:\n    values.append(current.value)\n    current = current.next\nprint(values)\n',check:'assert values == [10, 20, 30] and first.next is second and second.next.value == 30 and second.next.next is None, "노드 연결을 확인하세요."',
  explain:[['Node(value, next_node)','값과 다음 노드를 보관하는 객체를 만듭니다.'],['current = current.next','연결된 다음 노드로 이동합니다.']],takeaway:'연결 리스트는 각 노드의 다음 참조를 따라 순회합니다.'
 },
 {
  id:'py-selection-sort',runtime:'python',group:'알고리즘',title:'가장 작은 값을 골라 정렬하기',short:'선택 정렬 · 비교',time:'18분',
  lead:'가장 작은 원소를 찾아 앞자리부터 채웁니다.',concept:'아직 정렬되지 않은 범위에서 가장 작은 값의 위치를 찾고, 현재 위치와 교환합니다.',
  visual:['[3, 1, 2]','[1, 3, 2] → [1, 2, 3]','남은 범위의 최솟값을 고릅니다'],predict:'첫 단계에서 위치 0과 어느 위치를 교환할까요?',
  code:'def selection_sort(values):\n    result = values.copy()\n    for i in range(len(result)):\n        smallest = i\n        for j in range(i + 1, len(result)):\n            if result[j] < result[smallest]:\n                smallest = j\n        result[i], result[smallest] = result[smallest], result[i]\n    return result\n\nvalues = [3, 1, 2]\nsorted_values = selection_sort(values)\nprint(sorted_values)\n',task:'values에 0을 추가해 [0, 1, 2, 3]을 출력하세요. 함수는 다른 입력도 정렬해야 합니다.',hint:'values = [3, 1, 2, 0]',
  solution:'def selection_sort(values):\n    result = values.copy()\n    for i in range(len(result)):\n        smallest = i\n        for j in range(i + 1, len(result)):\n            if result[j] < result[smallest]:\n                smallest = j\n        result[i], result[smallest] = result[smallest], result[i]\n    return result\n\nvalues = [3, 1, 2, 0]\nsorted_values = selection_sort(values)\nprint(sorted_values)\n',check:'assert sorted_values == [0, 1, 2, 3] and selection_sort([2, 2, -1]) == [-1, 2, 2] and selection_sort([]) == [], "남은 범위의 최솟값을 찾아 정렬하세요."',
  explain:[['smallest','남은 범위에서 현재까지 찾은 최솟값의 인덱스입니다.'],['result[i], result[smallest] = ...','두 위치의 값을 교환합니다.']],takeaway:'선택 정렬은 남은 범위에서 최솟값을 반복해서 찾습니다.'
 }
 ,{
  id:'math-tiny-autograd',runtime:'python',group:'수학',title:'작은 자동 미분기 만들기',short:'계산 그래프 · 자동 미분',time:'30분',
  lead:'수동으로 연결한 기울기 계산을 재사용 가능한 작은 객체로 바꾸어 봅니다.',
  concept:'각 Value는 숫자와 부모 노드, 역전파 함수를 기억합니다. backward는 부모를 먼저 방문한 순서를 뒤집어 기울기를 전달합니다. 이 교육용 버전은 Value끼리의 덧셈·곱셈만 지원합니다.',
  visual:['x → x × x → + x','y.backward()','계산 기록을 따라 기울기를 누적합니다'],
  predict:'y=x²+x에서 x=3이면 y와 dy/dx는 각각 얼마일까요?',
  code:`class Value:
    def __init__(self, data, parents=()):
        self.data = data
        self.grad = 0.0
        self.parents = parents
        self.propagate = lambda: None

    def add(self, other):
        out = Value(self.data + other.data, (self, other))
        def propagate():
            self.grad += out.grad
            other.grad += out.grad
        out.propagate = propagate
        return out

    def mul(self, other):
        out = Value(self.data * other.data, (self, other))
        def propagate():
            self.grad += other.data * out.grad
            other.grad += self.data * out.grad
        out.propagate = propagate
        return out

    def backward(self):
        order = []
        seen = set()
        def visit(node):
            if node in seen:
                return
            seen.add(node)
            for parent in node.parents:
                visit(parent)
            order.append(node)
        visit(self)
        for node in order:
            node.grad = 0.0
        self.grad = 1.0
        for node in reversed(order):
            node.propagate()

x = Value(2.0)
y = x.mul(x).add(x)
y.backward()
print(y.data, x.grad)
`,
  solution:null, task:'x를 Value(3.0)으로 바꿔 y=12, x.grad=7을 확인하세요. 같은 x를 두 번 쓰는 곱에서도 기울기가 누적되어야 합니다.',hint:'x = Value(3.0)',referenceComplete:true,
  check:'assert x.data == 3 and y.data == 12 and x.grad == 7, "x²+x의 값과 기울기를 확인하세요."\nprobe = Value(-2.0)\nresult = probe.mul(probe).add(probe)\nresult.backward()\nassert result.data == 2 and probe.grad == -3, "공유 노드의 기울기를 누적하세요."\nresult.backward()\nassert probe.grad == -3, "이 구현은 backward마다 기존 기울기를 초기화합니다."',
  explain:[['부모 노드와 propagate','각 연산은 입력 노드와 국소 미분을 기억합니다.'],['order와 reversed(order)','부모를 먼저 모은 뒤 뒤에서 앞으로 역전파합니다.'],['+=','하나의 노드가 여러 경로에 쓰이면 각 경로의 기울기를 더합니다.']],
  takeaway:'작은 자동 미분기는 계산 그래프를 기록하고 각 노드에 기울기를 누적합니다. 이 버전은 PyTorch와 달리 backward마다 기울기를 초기화합니다.'
 }

];
const tiny = bridgeLessons.find(lesson => lesson.id === 'math-tiny-autograd');
tiny.solution = tiny.code.replace('x = Value(2.0)', 'x = Value(3.0)');

