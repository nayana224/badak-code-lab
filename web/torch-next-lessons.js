// Small PyTorch CPU lessons that bridge tensors, loss, a neuron and evaluation.
export const torchNextLessons = [
 {
  id:'torch-shape-index', runtime:'torch', group:'텐서 기초', title:'텐서의 행과 열을 꺼내기', short:'shape · 인덱싱 · 슬라이싱', time:'12분',
  lead:'숫자를 계산하기 전에 텐서의 모양과 선택한 축을 확인합니다.',
  concept:'shape=(2, 3)은 2행 3열입니다. X[0]은 첫 행이고 X[:, 1]은 모든 행의 두 번째 열입니다. 인덱스 0은 첫 위치입니다.',
  visual:['(2, 3) → 첫 행 (3,)','X[:, 1] → (2,)','정수 인덱스는 해당 축을 하나 줄입니다'],
  predict:'X[:, 1]에는 어떤 두 값이 담기고 shape는 무엇일까요?',
  code:`import torch

X = torch.tensor([[1., 2., 3.], [4., 5., 6.]])
first_row = X[0]
column = X[:, 0]
print("shape:", X.shape)
print("first row:", first_row)
print("column:", column)
`,
  task:'column에 X의 두 번째 열을 저장하세요. column의 값은 [2., 5.], shape는 (2,)입니다.',
  hint:'column = X[:, 1]',
  solution:`import torch

X = torch.tensor([[1., 2., 3.], [4., 5., 6.]])
first_row = X[0]
column = X[:, 1]
print("shape:", X.shape)
print("first row:", first_row)
print("column:", column)
`,
  referenceComplete:true,
  check:`assert tuple(X.shape) == (2, 3), "입력 텐서의 행과 열을 확인하세요."
assert torch.equal(first_row, torch.tensor([1., 2., 3.])), "첫 행을 선택하세요."
assert tuple(column.shape) == (2,) and torch.equal(column, torch.tensor([2., 5.])), "모든 행의 두 번째 열을 선택하세요."
`,
  explain:[['torch.tensor(data)','Python 리스트를 텐서로 만듭니다. 이 예제의 소수점 값은 부동소수점입니다.'],['X.shape','각 축의 크기입니다. 이 예제는 행이 2개, 열이 3개입니다.'],['X[:, 1]','모든 행(:)에서 인덱스 1인 열을 선택합니다.']],
  takeaway:'숫자와 함께 shape를 확인하면 행과 열을 혼동하기 어렵습니다.'
 },
 {
  id:'torch-loss-mean', runtime:'torch', group:'텐서 기초', title:'평균 제곱 오차를 한 칸씩', short:'오차 · 제곱 · 평균', time:'15분',
  lead:'예측이 목표와 얼마나 다른지 원소별로 계산한 뒤 숫자 하나로 모읍니다.',
  concept:'평균 제곱 오차는 예측과 목표의 차이를 각각 제곱한 다음 평균을 낸 값입니다. 두 텐서의 shape가 같은지 먼저 확인합니다.',
  visual:['오차 = prediction − target','loss = 평균(오차²)','음수 오차도 제곱하면 양수가 됩니다'],
  predict:'prediction이 [2, 2], target이 [2, 1]이면 오차와 평균 제곱 오차는 얼마일까요?',
  code:`import torch

prediction = torch.tensor([1., 3.])
target = torch.tensor([2., 1.])
error = prediction - target
squared_error = error ** 2
loss = squared_error.mean()
print("error:", error)
print("squared:", squared_error)
print("loss:", loss.item())
`,
  task:'prediction을 [2., 2.]로 바꿔 loss가 0.5가 되게 하세요. error와 squared_error도 새 값으로 계산해야 합니다.',
  hint:'prediction = torch.tensor([2., 2.])',
  solution:`import torch

prediction = torch.tensor([2., 2.])
target = torch.tensor([2., 1.])
error = prediction - target
squared_error = error ** 2
loss = squared_error.mean()
print("error:", error)
print("squared:", squared_error)
print("loss:", loss.item())
`,
  referenceComplete:true,
  check:`assert torch.equal(prediction, torch.tensor([2., 2.])) and torch.equal(target, torch.tensor([2., 1.])), "예측과 목표를 확인하세요."
assert prediction.shape == target.shape, "두 텐서의 shape를 같게 하세요."
assert torch.equal(error, prediction - target), "예측에서 목표를 빼세요."
assert torch.equal(squared_error, error ** 2), "각 오차를 제곱하세요."
assert loss.ndim == 0 and torch.allclose(loss, torch.tensor(0.5)), "제곱 오차의 평균을 계산하세요."
`,
  explain:[['prediction - target','같은 위치의 예측에서 목표를 빼 원소별 오차를 만듭니다.'],['error ** 2','각 오차를 제곱합니다.'],['mean()과 item()','mean()은 평균을 스칼라 텐서로 만들고 item()은 그 값을 Python 숫자로 꺼냅니다.']],
  takeaway:'손실은 원소별 오차가 하나의 값으로 어떻게 모이는지 추적하며 이해할 수 있습니다.'
 },
 {
  id:'torch-manual-neuron', runtime:'torch', group:'작은 신경망', title:'텐서로 뉴런 하나 만들기', short:'가중치 · 편향 · 예측', time:'15분',
  lead:'Linear 모듈을 쓰기 전에 입력, 가중치, 편향으로 예측 하나를 직접 만듭니다.',
  concept:'입력 X가 (샘플 수, 특성 수)이고 w가 (특성 수, 1)이면 X @ w는 샘플마다 하나의 점수입니다. b는 각 점수에 더할 편향입니다.',
  visual:['(2, 2) @ (2, 1) + 편향','→ 예측 (2, 1)','특성별 가중합과 편향을 구합니다'],
  predict:'첫 행 [1, 2]와 가중치 [2, -1]의 내적은 얼마일까요? b=1이면 점수는 얼마일까요?',
  code:`import torch

X = torch.tensor([[1., 2.], [3., 4.]])
w = torch.tensor([[2.], [-1.]])
b = torch.tensor([0.5])
prediction = X @ w + b
print("shape:", prediction.shape)
print("prediction:", prediction)
`,
  task:'b를 1.0으로 바꿔 예측값 [[1.], [3.]]을 계산하세요. X, w의 모양을 유지하세요.',
  hint:'b = torch.tensor([1.0])',
  solution:`import torch

X = torch.tensor([[1., 2.], [3., 4.]])
w = torch.tensor([[2.], [-1.]])
b = torch.tensor([1.0])
prediction = X @ w + b
print("shape:", prediction.shape)
print("prediction:", prediction)
`,
  referenceComplete:true,
  check:`assert tuple(X.shape) == (2, 2) and tuple(w.shape) == (2, 1) and tuple(b.shape) == (1,), "입력, 가중치, 편향의 shape를 확인하세요."
assert torch.equal(X, torch.tensor([[1., 2.], [3., 4.]])) and torch.equal(w, torch.tensor([[2.], [-1.]])), "입력과 가중치를 유지하세요."
assert torch.allclose(b, torch.tensor([1.])), "편향을 1로 바꾸세요."
assert tuple(prediction.shape) == (2, 1) and torch.allclose(prediction, X @ w + b), "가중합과 편향으로 예측을 계산하세요."
assert torch.allclose(prediction, torch.tensor([[1.], [3.]])), "두 샘플의 예측을 확인하세요."
`,
  explain:[['X @ w','각 샘플 행과 가중치 열의 내적을 계산합니다.'],['+ b','편향을 각 샘플 점수에 더합니다. 크기가 (1,)인 b가 방송됩니다.'],['prediction.shape','두 샘플에 예측 하나씩이므로 (2, 1)입니다.']],
  takeaway:'선형 뉴런의 점수는 입력의 가중합과 편향으로 계산합니다. 활성화 함수는 이 다음에 적용할 수 있습니다.'
 },
 {
  id:'torch-train-evaluate', runtime:'torch', group:'모델 평가', title:'학습과 평가 데이터를 나누기', short:'train · eval · no_grad', time:'20분',
  lead:'학습에 사용하지 않은 입력에서 모델을 평가하며 데이터 누수를 피합니다.',
  concept:'학습 데이터만 손실 계산과 파라미터 갱신에 사용합니다. 평가 데이터는 학습이 끝난 뒤 성능 확인에 사용합니다. eval()은 평가 모드로 전환하고 no_grad()는 평가의 기울기 기록을 끕니다. 서로 다른 역할입니다.',
  visual:['학습: x=0, 1, 2','평가: x=3, 4','평가 데이터는 가중치 갱신에 사용하지 않습니다'],
  predict:'평가 데이터를 학습 손실에 섞으면 새로운 입력에서 잘 작동하는지 공정하게 볼 수 있을까요?',
  code:`import torch
from torch import nn

train_x = torch.tensor([[0.], [1.], [2.]])
train_y = torch.tensor([[1.], [3.], [5.]])
val_x = torch.tensor([[3.], [4.]])
val_y = torch.tensor([[7.], [9.]])
model = nn.Linear(1, 1)
with torch.no_grad():
    model.weight.zero_()
    model.bias.zero_()
optimizer = torch.optim.SGD(model.parameters(), lr=0.05)
steps = 100
model.train()
for step in range(steps):
    optimizer.zero_grad()
    prediction = model(train_x)
    loss = ((prediction - train_y) ** 2).mean()
    loss.backward()
    optimizer.step()

model.eval()
with torch.no_grad():
    val_prediction = model(val_x)
    val_loss = ((val_prediction - val_y) ** 2).mean()
print("validation loss:", val_loss.item())
`,
  task:'steps를 250으로 늘리고, 학습에 사용하지 않은 val_x에 대한 val_loss가 0.01보다 작은지 확인하세요.',
  hint:'steps = 250',
  solution:`import torch
from torch import nn

train_x = torch.tensor([[0.], [1.], [2.]])
train_y = torch.tensor([[1.], [3.], [5.]])
val_x = torch.tensor([[3.], [4.]])
val_y = torch.tensor([[7.], [9.]])
model = nn.Linear(1, 1)
with torch.no_grad():
    model.weight.zero_()
    model.bias.zero_()
optimizer = torch.optim.SGD(model.parameters(), lr=0.05)
steps = 250
model.train()
for step in range(steps):
    optimizer.zero_grad()
    prediction = model(train_x)
    loss = ((prediction - train_y) ** 2).mean()
    loss.backward()
    optimizer.step()

model.eval()
with torch.no_grad():
    val_prediction = model(val_x)
    val_loss = ((val_prediction - val_y) ** 2).mean()
print("validation loss:", val_loss.item())
`,
  referenceComplete:true,
  check:`assert torch.equal(train_x, torch.tensor([[0.], [1.], [2.]])) and torch.equal(train_y, torch.tensor([[1.], [3.], [5.]])), "학습 데이터를 확인하세요."
assert torch.equal(val_x, torch.tensor([[3.], [4.]])) and torch.equal(val_y, torch.tensor([[7.], [9.]])), "평가 데이터를 확인하세요."
assert not set(train_x.flatten().tolist()) & set(val_x.flatten().tolist()), "학습과 평가 입력은 겹치지 않아야 합니다."
assert steps == 250 and model.training is False, "250단계 학습 후 평가 모드로 전환하세요."
assert not val_prediction.requires_grad and not val_loss.requires_grad, "torch.no_grad() 안에서 평가하세요."
with torch.no_grad():
    expected_val = model(val_x)
    expected_loss = ((expected_val - val_y) ** 2).mean()
assert torch.allclose(val_prediction, expected_val) and torch.allclose(val_loss, expected_loss), "평가 데이터로 예측과 손실을 계산하세요."
assert val_loss.item() < 0.01, "학습 후 평가 손실을 확인하세요."
`,
  explain:[['model.train() / model.eval()','학습과 평가 모드를 전환합니다. Dropout이나 BatchNorm 등이 이 모드의 영향을 받습니다.'],['torch.no_grad()','블록 안의 연산에서 기울기 기록을 끕니다. eval()과 역할이 다릅니다.'],['학습 데이터와 평가 데이터','파라미터 갱신에는 train만 사용하고 val은 학습 후 성능 확인에 사용합니다.']],
  takeaway:'평가 데이터는 가중치 갱신에 사용하지 않습니다. 이 작은 고정 예제의 결과만으로 실제 데이터에서의 성능을 보장할 수는 없습니다.'
 }
];
