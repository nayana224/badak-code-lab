// Short, lesson-specific debugging prompts; absence means no prompt is shown.
const errors = {
 'py-first': 'NameError가 나면 변수 이름의 철자와 대소문자를 확인하세요. 계산 결과는 print(total)로 확인합니다.',
 'py-list-index': 'IndexError가 나면 인덱스가 0부터 시작하는지, 리스트 길이보다 작은지 확인하세요.',
 'py-errors': 'ValueError는 변환할 수 없는 값인지 살펴보세요. 오류 메시지의 마지막 줄에서 오류 종류를 확인합니다.',
 'math-tiny-autograd': 'AttributeError가 나면 data, grad, parents의 철자를 확인하세요. 하나의 x가 두 경로에 쓰이면 기울기를 더해야 합니다.',
 'shape': '행렬 곱 오류가 나면 X.shape와 w.shape를 각각 출력하고 X의 열 수와 w의 행 수를 비교하세요.',
 'broadcast': 'broadcast 오류가 나면 두 shape를 오른쪽부터 비교하세요. 각 차원이 같거나 한쪽이 1이어야 합니다.',
 'cpp-io': '컴파일 오류가 나면 오류가 난 줄 앞뒤의 세미콜론과 큰따옴표를 확인하세요.',
 'cpp-function': '함수를 찾을 수 없다는 오류가 나면 함수 이름과 매개변수, 호출 위치를 확인하세요. 함수 정의는 호출 전에 있어야 합니다.',
 'cpp-vector': '범위 밖 접근이 의심되면 인덱스가 0 이상이고 size()보다 작은지 확인하세요. 빈 vector에서는 원소를 읽지 않습니다.',
 'cpp-search': '찾지 못하거나 반복이 끝나지 않으면 정렬 여부와 left, right, mid의 변화를 확인하세요. 비교한 mid를 다음 범위에서 제외해야 합니다.',
 'cpp-sort': '인접 비교에서 j + 1이 마지막 인덱스를 넘지 않는지 확인하세요. 빈 배열과 원소 하나인 경우도 생각해 보세요.',
 'cpp-unique': '복사 관련 오류가 나면 unique_ptr은 복사할 수 없음을 확인하세요. 소유권 이전은 std::move를 사용합니다.',
 'cpp-span': '원본의 수명이 끝나거나 vector가 재할당되면 이전 span을 사용하면 안 됩니다. 원본이 살아 있는 범위를 확인하세요.',
 'tensor': 'shape 오류가 나면 각 텐서의 .shape를 출력하고 행렬 곱의 안쪽 차원과 덧셈의 broadcasting 조건을 확인하세요.',
 'autograd': 'grad가 None이면 해당 텐서에 requires_grad=True가 있는지, 손실과 연결되어 있는지 확인하세요.',
 'torch-network': '손실이 줄지 않으면 입력과 목표의 shape, zero_grad → backward → step 순서를 확인하세요.',
 'torch-attention': '행렬 곱 오류가 나면 Q, K, V와 K.T의 shape를 출력하세요. Q와 K의 특성 수가 같아야 합니다.',
 'torch-causal-attention': '미래 위치의 가중치가 0이 아니면 마스크의 True 위치와 softmax를 적용한 축을 확인하세요.'
};
export function commonError(id) { return errors[id] || ''; }
