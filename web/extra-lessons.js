export const extraLessons = [
{
 id:'matrix-steps',chapter:'04',group:'행렬 시각화',runtime:'numpy',title:'행렬 곱을 한 칸씩 만들기',short:'행렬 곱 · 단계 시각화',time:'20분',
 lead:'@ 한 글자 안에서 무슨 일이 일어날까요? 반복문 세 개로 행렬 곱을 만들고 실제 계산값을 따라갑니다.',
 concept:'결과 C[i, j]는 A의 i행과 B의 j열을 곱해서 더한 값입니다. i는 결과의 행, j는 결과의 열, k는 두 행렬이 공유하는 안쪽 차원입니다.',
 visual:['(2, 3) @ (3, 2)','→ (2, 2)','행 × 열의 내적을 결과의 각 칸에 저장합니다'],
 predict:'C[0, 0] = 1×1 + 2×0 + 3×1 입니다. 첫 칸의 값과 전체 결과의 모양을 먼저 예상하세요.',
 code:`import numpy as np

A = np.array([[1., 2., 3.], [4., 5., 6.]])
B = np.array([[1., 0.], [0., 1.], [1., 1.]])
C = np.zeros((A.shape[0], B.shape[1]))

for i in range(A.shape[0]):
    for j in range(B.shape[1]):
        for k in range(A.shape[1]):
            product = float(A[i, k] * B[k, j])
            C[i, j] += product
            record("matrix", left=A.tolist(), right=B.tolist(),
                   result=C.tolist(), row=i, col=j, inner=k,
                   product=product, total=float(C[i, j]))
print(C)
`,
 task:'위 코드를 직접 입력하고 실제 단계 기록을 확인하세요. A의 첫 값을 2로 바꾼 뒤에도 C가 A @ B와 같은지 확인하세요.',
 hint:'A[0, 0] = 2.\n# 위 변경은 C를 계산하기 전에 넣고 다시 실행하세요.',
 // The exercise is a complete starter; no additional solution is appended.
 referenceComplete:true,
 check:'assert A.shape == (2, 3) and B.shape == (3, 2), "예제의 shape를 유지하세요."\nassert A[0, 0] == 2, "A의 첫 값을 2로 바꿔 보세요."\nassert np.allclose(C, A @ B), "바꾼 A로 C를 다시 계산하세요."',
 takeaway:'그림의 한 단계는 record()가 호출된 순간의 실제 변수 값입니다. 코드를 바꾸고 다시 실행해야 그림도 갱신됩니다.',
 explain:[['np.zeros(shape)','원하는 모양의 0 배열을 만듭니다. 덧셈으로 결과를 쌓기 전에 초기값을 준비합니다.'],['A.shape와 range()','shape는 각 축의 크기입니다. range(n)은 0부터 n−1까지의 인덱스를 제공합니다.'],['record("matrix", ...)','이 실습실의 기록 도우미입니다. 행렬과 현재 인덱스를 전달하면 실행 후 이전·다음 단계로 탐색할 수 있습니다. 일반 NumPy 함수가 아닙니다.']]
},
{
 id:'stack',chapter:'05',group:'자료구조',runtime:'python',title:'클래스로 스택 만들기',short:'class · stack · push/pop',time:'20분',
 lead:'가장 나중에 넣은 값이 가장 먼저 나옵니다. 작은 클래스를 직접 만들며 객체의 상태가 변하는 순간을 살펴봅니다.',
 concept:'Stack 객체는 자신의 리스트 items를 가집니다. push()는 끝에 넣고 pop()은 끝에서 꺼냅니다. self는 지금 메서드를 호출한 객체를 가리킵니다.',
 visual:['push → [10, 20] → pop','마지막 값부터','LIFO · Last In, First Out'],
 predict:'10, 20, 30 순으로 넣고 두 번 꺼내면 무엇이 남을까요? 서로 다른 Stack 객체는 리스트를 공유할까요?',
 code:`class Stack:
    def __init__(self):
        self.items = []

    def push(self, value):
        self.items.append(value)
        record("stack", values=self.items.copy(), action="push", value=value)

    def pop(self):
        value = self.items.pop()
        record("stack", values=self.items.copy(), action="pop", value=value)
        return value

stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)
removed = stack.pop()
print("꺼낸 값:", removed)
print("남은 값:", stack.items)
`,task:'스택 코드를 직접 입력하고 pop()을 한 번 더 호출해 second에 저장하세요. 마지막에는 10만 남겨 보세요.',
 hint:'second = stack.pop()\nprint(second, stack.items)',
 check:'assert removed == 30 and second == 20, "꺼내는 순서를 확인하세요."\nassert stack.items == [10], "스택에 10만 남겨 보세요."',
 takeaway:'인스턴스의 상태는 self.items에 보관하고, 메서드는 그 상태를 바꿉니다. 빈 스택의 pop()은 IndexError입니다.',
 explain:[['class Stack','데이터와 동작을 한 묶음으로 정의합니다. Stack()은 새로운 객체를 만듭니다.'],['__init__(self)','객체를 만들 때 실행되어 이 객체만의 리스트를 준비합니다.'],['self와 return','self는 현재 객체입니다. return은 꺼낸 값을 호출한 곳으로 전달합니다.'],['record("stack", ...)','현재 스택의 복사본과 작업 이름을 기록합니다. 기록 당시의 값을 보관해 단계별로 재생합니다.']]
},
{
 id:'cpp-vector',chapter:'01',group:'C++ 기초',runtime:'cpp',title:'vector의 값을 순서대로 더하기',short:'vector · 반복문 · 함수',time:'20분',
 lead:'C++도 작은 데이터와 반복문부터 시작합니다. 실제 컴파일러로 코드를 실행하며 누적 합이 변하는 모습을 확인합니다.',
 concept:'std::vector<int>는 크기를 바꿀 수 있는 정수 배열입니다. 함수에 const 참조로 전달하면 전체 배열을 복사하지 않고 읽을 수 있습니다.',
 visual:['[10, 20, 30]','sum = 60','원소 하나를 읽을 때마다 total이 바뀝니다'],
 predict:'total을 반복문 안에서 0으로 초기화하면 어떤 결과가 나올까요? values.size()는 무엇을 반환할까요?',
 code:`#include <iostream>
#include <vector>

int sum(const std::vector<int>& values) {
    int total = 0;
    for (int i = 0; i < static_cast<int>(values.size()); ++i) {
        total += values[i];
        record_array(values, i, total);
    }
    return total;
}

int main() {
    std::vector<int> values = {10, 20, 30};
    std::cout << sum(values) << "\\n";
}
`,task:'코드를 직접 입력하고 values에 40을 추가하세요. 누적 합 100을 출력하고 배열 시각화에서 4단계를 확인하세요.',
 hint:'std::vector<int> values = {10, 20, 30, 40};',referenceComplete:true,expectedOutput:'100',
 takeaway:'컴파일 오류도 실제 컴파일러가 반환합니다. record_array()는 실습실이 제공하는 시각화 도우미이며 표준 C++ 함수가 아닙니다.',
 explain:[['std::vector<int>','연속된 메모리에 정수를 보관하는 동적 배열입니다. 인덱스는 0부터 시작합니다.'],['const std::vector<int>&','참조로 원본을 읽되, const로 이 함수를 통한 원소 변경을 금지합니다.'],['int sum(...)과 return','입력 배열을 받아 정수 하나를 반환하는 함수입니다. 반복문 바깥의 total에 합을 쌓습니다.'],['record_array(values, i, total)','배열, 현재 인덱스, 누적 합을 실제 실행 중 기록합니다. 시각화는 최대 32개 원소를 지원합니다.']]
},
{
 id:'cpp-search',chapter:'02',group:'알고리즘',runtime:'cpp',title:'이진 탐색으로 범위를 반으로',short:'binary search · 탐색 범위',time:'20분',
 lead:'정렬된 배열에서 목표를 찾습니다. 비교할 때마다 범위가 어떻게 줄어드는지 실제 left, right, mid 값으로 확인합니다.',
 concept:'이진 탐색은 정렬된 배열에서만 사용할 수 있습니다. 가운데 값이 목표보다 작으면 오른쪽 절반, 크면 왼쪽 절반만 남깁니다.',
 visual:['left → mid ← right','O(log n)','검색 범위를 매번 절반 가까이 줄입니다'],
 predict:'[2, 4, 6, 8, 10, 12, 14]에서 12를 찾을 때 첫 mid는 몇 번 인덱스일까요? 없는 값을 찾으면 무엇을 반환해야 할까요?',
 code:`#include <iostream>
#include <vector>

int binary_search(const std::vector<int>& values, int target) {
    int left = 0;
    int right = static_cast<int>(values.size()) - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        record_search(values, left, right, mid, target);
        if (values[mid] == target) return mid;
        if (values[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    std::vector<int> values = {2, 4, 6, 8, 10, 12, 14};
    int found = binary_search(values, 12);
    std::cout << "index: " << found << "\\n";
}
`,task:'코드를 직접 입력하고 목표를 10으로 바꿔 보세요. 출력은 index: 4여야 합니다. 다음에는 없는 값 9도 실행해 보세요.',
 hint:'int found = binary_search(values, 10);',referenceComplete:true,expectedOutput:'index: 4',
 takeaway:'그림에서 흐리게 보이는 원소는 이미 제외된 탐색 범위입니다. 없는 값은 −1을 반환합니다.',
 explain:[['binary_search(values, target)','정렬된 배열과 목표를 받아 인덱스를 반환합니다. 없으면 −1을 반환합니다.'],['left + (right - left) / 2','현재 탐색 범위의 가운데 인덱스를 계산합니다. 정수 나눗셈은 소수 부분을 버립니다.'],['left <= right','살펴볼 범위가 남아 있는 동안 반복합니다. mid ± 1로 이미 비교한 위치를 제외해야 종료됩니다.'],['record_search(...)','비교 직전의 배열, 경계, 가운데 위치, 목표를 기록합니다. 입력 배열이 정렬되어 있는지 먼저 확인하세요.']]
}
];
