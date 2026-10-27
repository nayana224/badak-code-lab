// Only describes operations visible in this lesson's reference code.
const entries = [
 [/^import torch\b/m,'import torch','PyTorch 모듈을 불러와 텐서와 자동 미분 기능을 사용합니다.'],
 [/^from torch import nn\b/m,'from torch import nn','PyTorch의 신경망 모듈을 nn이라는 이름으로 가져옵니다.'],
 [/^import numpy as np\b/m,'import numpy as np','NumPy 모듈을 np라는 짧은 이름으로 불러옵니다.'],
 [/^import math\b/m,'import math','제곱근 등 Python 표준 수학 함수를 가져옵니다.'],
 [/torch\.tensor\s*\(/,'torch.tensor(data)','Python 숫자나 리스트를 텐서로 만듭니다. 소수 입력은 부동소수점으로 표현됩니다.'],
 [/np\.array\s*\(/,'np.array(data)','리스트 등의 데이터를 NumPy 배열로 만듭니다.'],
 [/np\.zeros\s*\(/,'np.zeros(shape)','지정한 모양의 0으로 채워진 배열을 만듭니다.'],
 [/\.shape\b/,'shape','배열이나 텐서의 각 축의 크기를 나타냅니다.'],
 [/\.reshape\s*\(/,'reshape(...)','원소 수를 유지하며 배열의 모양을 바꿉니다.'],
 [/\.mean\s*\(/,'mean()','선택한 원소 또는 축의 평균을 계산합니다.'],
 [/\.sum\s*\(/,'sum()','선택한 텐서 원소 또는 축의 합을 계산합니다.'],
 [/\.item\s*\(/,'item()','원소 하나를 가진 텐서에서 Python 숫자를 꺼냅니다.'],
 [/\.tolist\s*\(/,'tolist()','텐서나 배열의 값을 Python 리스트로 변환합니다.'],
 [/\.backward\s*\(/,'backward()','계산 그래프를 따라 기울기를 계산해 .grad에 누적합니다.'],
 [/torch\.no_grad\s*\(/,'torch.no_grad()','블록 안에서 자동 미분을 위한 연산 기록을 끕니다.'],
 [/torch\.softmax\s*\(/,'torch.softmax(..., dim)','지정한 축에서 점수를 정규화된 가중치로 변환합니다.'],
 [/torch\.exp\s*\(/,'torch.exp(...)','각 텐서 원소의 지수 함숫값을 계산합니다.'],
 [/math\.sqrt\s*\(/,'math.sqrt(...)','숫자의 제곱근을 계산합니다.'],
 [/torch\.triu\s*\(/,'torch.triu(...)','행렬의 지정한 대각선 위 부분을 선택합니다.'],
 [/\.masked_fill\s*\(/,'masked_fill(조건, 값)','조건이 참인 위치의 값을 바꾼 새 텐서를 만듭니다.'],
 [/\.zero_grad\s*\(/,'optimizer.zero_grad()','optimizer가 관리하는 파라미터의 기존 기울기를 초기화합니다.'],
 [/\.step\s*\(/,'optimizer.step()','계산된 기울기와 규칙에 따라 파라미터를 갱신합니다.'],
 [/\bprint\s*\(/,'print(...)','괄호 안의 값을 표준 출력에 표시합니다.'],
 [/\brange\s*\(/,'range(...)','반복에 사용할 정수 범위를 만듭니다. 끝 값은 포함하지 않습니다.'],
 [/\blen\s*\(/,'len(...)','리스트나 문자열 등 원소의 개수를 반환합니다.'],
 [/\bint\s*\(/,'int(...)','값을 정수로 변환합니다. 변환할 수 없는 문자열은 ValueError가 납니다.'],
 [/\.strip\s*\(/,'strip()','문자열 양 끝의 공백을 제거한 새 문자열을 반환합니다.'],
 [/\.append\s*\(/,'append(value)','리스트의 끝에 원소를 추가합니다.'],
 [/\brecord\s*\(/,'record(...)','이 실습실의 시각화 도우미로 전달받은 실제 값을 기록합니다. Python이나 PyTorch 표준 함수는 아닙니다.']
];
export function pythonReferences(lesson) {
 const code = lesson.solution || lesson.code || '';
 return entries.filter(([pattern]) => pattern.test(code)).map(([, name, description]) => [name, description]);
}
