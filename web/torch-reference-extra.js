// PyTorch-only references selected from operations in the visible lesson code.
// Each example is explanatory and is not executed on the user's behalf.
const entries = [
 [/requires_grad\s*=\s*True/, 'requires_grad=True', '이 부동소수점 텐서와 관련된 연산을 기록하여 기울기를 구합니다.', 'w = torch.tensor(3., requires_grad=True); (w * w).backward()를 실행하면 w.grad는 6입니다.'],
 [/\.grad\b/, '.grad', '역전파로 계산된 해당 텐서의 기울기가 쌓이는 곳입니다. 보통 leaf 텐서에서 확인합니다.', 'w=3인 텐서의 w²를 한 번 역전파하면 w.grad는 6입니다. 초기화하지 않고 새 그래프를 역전파하면 더해집니다.'],
 [/\.grad\.zero_\s*\(/, 'tensor.grad.zero_()', '이미 존재하는 기울기 텐서의 값을 제자리에서 0으로 만듭니다. .grad가 None이면 사용할 수 없습니다.', 'w.grad가 tensor(6.)일 때 w.grad.zero_()를 실행하면 기울기 값이 0이 됩니다.'],
 [/torch\.manual_seed\s*\(/, 'torch.manual_seed(seed)', 'PyTorch 난수 생성기의 시드를 설정해 같은 환경의 실험을 비교하기 쉽게 합니다. 모든 환경에서 완전히 같은 결과를 보장하지는 않습니다.', 'torch.manual_seed(7)을 모델 초기화 전에 실행하면 같은 환경에서 초기값을 재현하기 쉽습니다.'],
 [/\bnn\.Linear\s*\(/, 'nn.Linear(in_features, out_features)', '마지막 축의 입력 특성에 가중치와 편향을 적용하는 학습 가능한 선형 층입니다.', 'nn.Linear(2, 1)은 각 입력의 특성 두 개를 출력 한 개로 바꿉니다.'],
 [/torch\.optim\.SGD\s*\(/, 'torch.optim.SGD(parameters, lr)', '전달받은 파라미터를 확률적 경사 하강법으로 갱신하는 최적화 도구를 만듭니다.', 'optimizer = torch.optim.SGD(model.parameters(), lr=0.1)을 만들고 backward() 뒤 step()을 호출합니다.'],
 [/\.parameters\s*\(/, 'model.parameters()', '모델에 등록된 파라미터를 순회합니다. 각 파라미터의 requires_grad와 optimizer 포함 여부는 별도입니다.', 'optimizer에 model.parameters()를 전달하면 optimizer가 모델의 가중치와 편향을 관리합니다.'],
 [/\.clone\s*\(/, 'tensor.clone()', '같은 값을 갖는 별도 텐서를 만듭니다. 기본적으로 자동 미분 관계는 유지됩니다.', 'b = a.clone()이면 b의 저장 공간은 별도입니다. 그래프 연결도 끊으려면 목적에 따라 detach()를 고려합니다.'],
 [/\.detach\s*\(/, 'tensor.detach()', '현재 텐서의 값으로부터 자동 미분 관계가 분리된 텐서를 만듭니다. 원본과 저장 공간을 공유할 수 있습니다.', 'x.detach().clone()은 그래프 연결을 끊은 뒤 별도 저장 공간에 값을 복사합니다.'],
 [/\.flatten\s*\(/, 'tensor.flatten()', '선택한 축 범위를 하나의 축으로 펼칩니다. 매개변수를 생략하면 모든 축을 펼칩니다.', 'shape가 (2, 1)인 텐서 [[1], [2]]에 flatten()을 쓰면 shape는 (2,)입니다.'],
 [/\.transpose\s*\(/, 'tensor.transpose(dim0, dim1)', '지정한 두 축의 위치를 서로 교환합니다.', 'shape (2, 3)에서 transpose(0, 1)은 shape (3, 2)인 텐서를 제공합니다.'],
 [/\b(?:[A-Za-z_]\w*)\.T\b/, 'tensor.T', '이 수업의 2차원 텐서에서 행과 열을 바꾼 전치를 사용합니다.', '2×3 텐서 K의 K.T는 3×2 모양입니다. 더 많은 축을 다룰 때는 transpose의 축을 명시할 수 있습니다.'],
 [/torch\.ones_like\s*\(/, 'torch.ones_like(input, dtype=...)', '입력과 같은 모양의 1로 채워진 텐서를 만듭니다. dtype을 지정할 수 있습니다.', '2×2 scores에 dtype=torch.bool을 지정하면 같은 모양의 True 텐서가 만들어집니다.'],
 [/torch\.bool\b/, 'torch.bool', '각 원소가 참 또는 거짓인 불리언 텐서의 자료형입니다.', 'torch.ones_like(scores, dtype=torch.bool)은 True로 채운 불리언 텐서를 만듭니다.'],
 [/\.int\s*\(/, 'tensor.int()', '텐서의 원소를 torch.int32 자료형으로 변환한 텐서를 반환합니다.', 'torch.tensor([True, False]).int()는 정수 텐서 [1, 0]을 만듭니다. Python의 int(...) 변환과 구분하세요.'],
 [/\.bool\s*\(/, 'tensor.bool()', '텐서의 원소를 불리언 자료형으로 변환합니다. 0은 False이고 0이 아닌 값은 True입니다.', 'torch.tensor([0, 1]).bool()은 [False, True]인 텐서입니다.'],
 [/\.float\s*\(/, 'tensor.float()', '텐서의 원소를 torch.float32 자료형으로 변환합니다.', 'torch.tensor([True, False]).float()는 [1., 0.]인 텐서입니다.'],
 [/\.fill_\s*\(/, 'tensor.fill_(value)', '기존 텐서의 모든 원소를 지정한 값으로 제자리에서 채웁니다. 학습 파라미터 초기화는 보통 no_grad 안에서 합니다.', 'torch.no_grad() 안에서 model.weight.fill_(2.)를 호출하면 가중치 원소를 2로 채웁니다.'],
];
export function torchReferences(lesson) {
 if (lesson.runtime !== 'torch') return [];
 const code = lesson.solution || lesson.code || '';
 return entries.filter(([pattern]) => pattern.test(code)).map(([,name,description]) => [name,description]);
}
export const torchReferenceExamples = Object.fromEntries(entries.map(([,name,,example]) => [name,example]));
