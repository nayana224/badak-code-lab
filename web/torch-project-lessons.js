// Two small, independently testable applications of earlier PyTorch lessons.
const trainSolution = `import torch
from torch import nn

def train_model(x, y, steps=200):
    model = nn.Linear(1, 1)
    optimizer = torch.optim.SGD(model.parameters(), lr=0.05)
    model.train()
    for _ in range(steps):
        optimizer.zero_grad()
        loss = ((model(x) - y) ** 2).mean()
        loss.backward()
        optimizer.step()
    return model

def evaluate(model, x, y):
    model.eval()
    with torch.no_grad():
        predictions = model(x)
        loss = ((predictions - y) ** 2).mean()
    return predictions, loss

torch.manual_seed(7)
train_x = torch.tensor([[-2.], [-1.], [0.], [1.], [2.]])
train_y = 2 * train_x + 1
test_x = torch.tensor([[3.], [4.]])
test_y = 2 * test_x + 1
model = train_model(train_x, train_y)
predictions, test_loss = evaluate(model, test_x, test_y)
print("평가 예측:", predictions.flatten().tolist())
print("평가 손실:", test_loss.item())
`;
const causalSolution = `import math
import torch

def causal_attention(q, k, v):
    scores = (q @ k.T) / math.sqrt(q.shape[-1])
    future = torch.triu(torch.ones_like(scores, dtype=torch.bool), diagonal=1)
    masked = scores.masked_fill(future, float("-inf"))
    weights = torch.softmax(masked, dim=-1)
    return weights, weights @ v

q = torch.tensor([[1., 0.], [0., 1.], [1., 1.]])
k = q.clone()
v = torch.tensor([[1., 2.], [3., 4.], [5., 6.]])
weights, output = causal_attention(q, k, v)
print("가중치:", weights)
print("출력:", output)
`;
export const torchProjectLessons = [
 {
  id:'project-torch-train-evaluate', runtime:'torch', group:'복습 · 프로젝트', title:'프로젝트: 선형 모델을 학습하고 평가하기', short:'학습 함수 · 평가 데이터 · no_grad', time:'30분',
  lead:'학습과 평가를 함수로 나누고, 학습에 사용하지 않은 값의 예측을 확인합니다.',
  concept:'훈련 데이터로 가중치를 갱신하고 별도의 평가 데이터에서 손실을 측정합니다. model.eval()은 평가 모드로 전환하고 no_grad()는 계산 기록을 끕니다. Linear만 쓰는 이 예에서는 eval 자체가 출력값을 바꾸지 않지만 Dropout 같은 층에는 영향을 줍니다. 두 점의 결과는 일반화 성능을 충분히 증명하지 않습니다.',
  visual:['훈련 데이터 → 가중치 갱신','별도 평가 데이터 → 예측과 손실','평가 중에는 가중치를 바꾸지 않습니다'],
  predict:'평가 데이터를 학습에도 사용하면 새로운 데이터에 대한 성능을 공정하게 확인할 수 있을까요?',
  code:trainSolution.replace('steps=200','steps=20'), solution:trainSolution, referenceComplete:true,
  task:'train_model의 steps 기본값을 200으로 바꾸고, 별도 입력에 대한 손실을 확인하세요. 이후 자유 실험으로 목표 기울기를 바꿔 모델이 다시 학습하는지 확인하세요.', hint:'def train_model(x, y, steps=200):',
  check:`assert test_loss.item() < 0.001, "학습 단계를 늘려 평가 손실을 확인하세요."
assert not predictions.requires_grad and not model.training, "평가는 eval과 no_grad 안에서 진행하세요."
assert torch.allclose(predictions, model(test_x).detach(), atol=1e-5), "평가 데이터의 모델 예측이어야 합니다."
torch.manual_seed(7)
x2 = torch.tensor([[-2.], [-1.], [0.], [1.], [2.]])
y2 = -x2 + 2
m2 = train_model(x2, y2)
before = [p.detach().clone() for p in m2.parameters()]
p2, loss2 = evaluate(m2, torch.tensor([[3.]]), torch.tensor([[-1.]]))
assert loss2.item() < .001 and abs(p2.item() + 1) < .04, "다른 목표에도 학습과 평가 함수를 사용하세요."
assert not p2.requires_grad and all(torch.equal(a, b) for a, b in zip(before, m2.parameters())), "평가에서 가중치를 바꾸거나 기울기를 기록하지 마세요."`,
  explain:[['train_model(x, y, steps)','전달된 입력과 목표로 새 Linear 모델을 학습해 반환합니다.'],['model.train() / model.eval()','학습·평가 모드를 설정합니다. 일부 층의 동작이 모드에 따라 달라집니다.'],['torch.no_grad()','평가 연산의 기울기 그래프 생성을 끕니다. eval()과는 별도 역할입니다.'],['별도의 평가 데이터','훈련에 쓰지 않은 입력을 사용합니다. 데이터가 두 개뿐인 이 예로 실제 성능을 단정할 수는 없습니다.']],
  takeaway:'훈련은 기울기로 모델을 갱신하고, 평가는 가중치를 바꾸지 않은 채 별도 데이터에서 측정합니다.'
 },
 {
  id:'project-torch-causal-attention', runtime:'torch', group:'복습 · 프로젝트', title:'프로젝트: 인과 Attention 함수를 직접 만들고 검증하기', short:'Q·K·V · 인과 마스크 · 검증', time:'30분',
  lead:'세 토큰의 Q·K·V에서 미래를 가리는 Attention을 함수로 묶고 다른 입력으로도 확인합니다.',
  concept:'각 query 행과 key 열의 내적 점수를 특성 수의 제곱근으로 나눕니다. 미래 열을 음의 무한대로 가리고 행별 softmax를 취한 뒤 value를 가중합합니다. 이 예는 이미 만들어진 Q·K·V를 사용하며 학습 가능한 투영이나 다중 헤드는 포함하지 않습니다.',
  visual:['Q @ Kᵀ → 미래 가리기','softmax → 가중치','가중치 @ V → 출력'],
  predict:'첫 query는 몇 번째 value만 볼 수 있을까요? 마지막 value만 바꿨을 때 첫 출력도 바뀔까요?',
  code:causalSolution.replace('diagonal=1','diagonal=0'), solution:causalSolution, referenceComplete:true,
  task:'미래 위치만 가리도록 diagonal=1을 사용해 함수를 작성하세요. 통과 후 diagonal=0이면 어떤 문제가 생기는지, 또 마지막 V 행을 바꾸어 앞쪽 출력이 달라지지 않는지도 직접 확인하세요.', hint:'diagonal=1',
  check:`import torch.nn.functional as F
assert weights.shape == (3, 3) and output.shape == (3, 2), "세 토큰의 가중치와 출력 shape를 확인하세요."
assert torch.allclose(output, F.scaled_dot_product_attention(q, k, v, is_causal=True), atol=1e-6), "PyTorch 인과 Attention 결과와 비교하세요."
assert torch.allclose(weights.sum(dim=-1), torch.ones(3)) and torch.count_nonzero(torch.triu(weights, diagonal=1)) == 0, "행별 가중치의 합과 미래 마스크를 확인하세요."
v_changed = v.clone()
v_changed[-1] += 100
w2, out2 = causal_attention(q, k, v_changed)
assert torch.allclose(output[:2], out2[:2], atol=1e-6), "미래 value의 변화가 앞쪽 결과에 영향을 주면 안 됩니다."
q2 = torch.tensor([[2., 0.], [1., 1.]])
k2 = torch.tensor([[0., 1.], [1., 0.]])
v2 = torch.tensor([[2., 3., 4.], [5., 6., 7.]])
w3, out3 = causal_attention(q2, k2, v2)
assert torch.allclose(out3, F.scaled_dot_product_attention(q2, k2, v2, is_causal=True), atol=1e-6), "다른 토큰 수와 value 차원도 처리하세요."`,
  explain:[['q @ k.T / math.sqrt(q.shape[-1])','query와 key의 내적을 특성 수의 제곱근으로 나눕니다.'],['torch.triu(..., diagonal=1)','주 대각선 위, 즉 미래 key 위치가 True인 마스크를 만듭니다.'],['masked_fill과 softmax','미래 점수에 음의 무한대를 넣고 각 행에서 정규화해 미래 가중치를 0으로 만듭니다.'],['weights @ v','각 query의 가중치로 value 행을 합칩니다.']],
  takeaway:'인과 Attention은 각 위치에서 현재와 과거 value만 가중합합니다. 완성된 Transformer 전체는 아닙니다.'
 }
];
