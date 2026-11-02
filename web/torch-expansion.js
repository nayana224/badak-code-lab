// CPU-sized PyTorch lessons. The examples use in-memory data and actual operations.
const batchSolution = `import torch
from torch import nn
from torch.utils.data import TensorDataset, DataLoader

torch.manual_seed(7)
x = torch.tensor([[-2.], [-1.], [1.], [2.]])
y = 2 * x + 1
loader = DataLoader(TensorDataset(x, y), batch_size=2, shuffle=False)
model = nn.Linear(1, 1)
optimizer = torch.optim.SGD(model.parameters(), lr=0.05)
epochs = 30
with torch.no_grad():
    initial_loss = ((model(x) - y) ** 2).mean().item()
for epoch in range(epochs):
    for batch, (batch_x, batch_y) in enumerate(loader):
        if epoch == 0 or epoch == epochs - 1:
            record("batch", epoch=epoch, batch=batch,
                   inputs=batch_x.flatten().tolist(), targets=batch_y.flatten().tolist())
        optimizer.zero_grad()
        loss = ((model(batch_x) - batch_y) ** 2).mean()
        loss.backward()
        optimizer.step()
with torch.no_grad():
    final_loss = ((model(x) - y) ** 2).mean().item()
print("initial loss:", initial_loss)
print("final loss:", final_loss)
`;
const stateSolution = `import io
import torch
from torch import nn

model = nn.Linear(1, 1)
with torch.no_grad():
    model.weight.fill_(2.)
    model.bias.fill_(1.)
x = torch.tensor([[3.]])
before = model(x).detach().clone()
buffer = io.BytesIO()
torch.save(model.state_dict(), buffer)
buffer.seek(0)
weights = torch.load(buffer, map_location="cpu", weights_only=True)
restored = nn.Linear(1, 1)
restored.load_state_dict(weights)
after = restored(x).detach()
print("original:", before.item())
print("restored:", after.item())
`;
const splitSolution = `import torch

# 배치 1개, 토큰 2개, 토큰마다 특성 4개
x = torch.tensor([[[1., 2., 3., 4.], [5., 6., 7., 8.]]])
batch, tokens, features = x.shape
heads = 2
head_dim = features // heads
split = x.reshape(batch, tokens, heads, head_dim).transpose(1, 2)
joined = split.transpose(1, 2).reshape(batch, tokens, features)
print("split:", split.shape)
print("joined:", joined)
`;
const attentionSolution = `import math
import torch

# Q, K, V는 이미 각 head로 나뉜 값입니다. 학습 가능한 투영은 아직 없습니다.
q = torch.tensor([[[[1., 0.], [0., 1.]], [[1., 1.], [1., 0.]]]])
k = q.clone()
v = torch.tensor([[[[1., 2.], [3., 4.]], [[5., 6.], [7., 8.]]]])
scores = q @ k.transpose(-2, -1) / math.sqrt(q.shape[-1])
weights = torch.softmax(scores, dim=-1)
heads = weights @ v
batch, head_count, tokens, head_dim = heads.shape
output = heads.transpose(1, 2).reshape(batch, tokens, head_count * head_dim)
print("weights shape:", weights.shape)
print("output shape:", output.shape)
print(output)
`;
export const torchExpansionLessons = [
 {
  id:'torch-batch-training', runtime:'torch', group:'모델 학습', title:'작은 배치마다 가중치 갱신하기', short:'DataLoader · 배치 학습 · epoch', time:'25분',
  lead:'샘플을 두 개씩 꺼내 실제 손실과 기울기를 계산하고 매 배치마다 가중치를 갱신합니다.',
  concept:'한 epoch은 전체 학습 데이터를 한 번 순회하는 것입니다. 각 배치에서 기존 기울기를 지우고 예측·손실·역전파·갱신을 수행합니다. shuffle=False라 순서가 고정됩니다. 첫 epoch과 마지막 epoch의 실제 입력·목표만 시각화에 기록합니다.',
  visual:['네 샘플 → 두 배치','각 배치: zero_grad → backward → step','한 번 전체를 읽으면 한 epoch'],
  predict:'샘플 4개를 배치 2개씩 나누어 한 epoch을 돌면 optimizer.step()은 몇 번 실행될까요?',
  code:batchSolution.replace('epochs = 30','epochs = 1'), solution:batchSolution, referenceComplete:true, trace:true,
  task:'epochs를 30으로 늘리고 전체 데이터의 최종 손실이 처음보다 작아지는지 확인하세요.', hint:'epochs = 30',
  check:`assert epochs == 30 and loader.batch_size == 2, "배치 크기와 epoch 수를 확인하세요."
assert final_loss < initial_loss and final_loss < 0.01, "배치별 갱신으로 전체 손실을 줄이세요."
assert abs(model.weight.item() - 2.) < 0.1 and abs(model.bias.item() - 1.) < 0.1, "학습한 기울기와 편향을 확인하세요."
assert all(torch.allclose(by, 2 * bx + 1) for bx, by in loader), "배치의 입력과 정답 짝을 확인하세요."`,
  explain:[['epoch와 배치','이 예제는 한 epoch마다 배치 두 개를 처리하고 각 배치에서 가중치를 갱신합니다.'],['record("batch", ...)','실습실 전용 함수로 실제 배치의 입력과 정답을 기록합니다. PyTorch 함수는 아닙니다.'],['enumerate(loader)','배치 번호와 배치의 입력·정답을 차례로 받습니다.']],
  takeaway:'배치별 평균 손실을 계산하고 매 배치마다 기울기 초기화·계산·갱신을 반복합니다.'
 },
 {
  id:'torch-state-dict', runtime:'torch', group:'모델 학습', title:'state_dict를 메모리에 저장하고 복원하기', short:'state_dict · save · load', time:'20분',
  lead:'학습된 파라미터를 메모리 버퍼에 저장하고 같은 구조의 새 모델에 불러옵니다.',
  concept:'state_dict는 모델의 파라미터와 등록된 버퍼를 담는 매핑입니다. 저장된 가중치를 동일한 구조의 모델에 불러와 예측을 비교합니다. 이 예제는 파일 대신 메모리 버퍼를 사용하며 코드 구조나 optimizer 상태는 별도로 저장해야 합니다.',
  visual:['모델 → state_dict','메모리에 저장 → 새 모델','같은 입력의 예측 비교'],
  predict:'같은 구조의 새 모델에 가중치를 복원하면 같은 입력에서 예측이 같을까요?',
  code:stateSolution.replace('model.weight.fill_(2.)','model.weight.fill_(1.)'), solution:stateSolution, referenceComplete:true,
  task:'원본 가중치를 2로 설정하고 입력 3의 원본·복원 예측이 모두 7인지 확인하세요.', hint:'model.weight.fill_(2.)',
  check:`assert before.item() == 7. and torch.allclose(before, after), "복원된 모델과 원본의 예측을 비교하세요."
assert restored is not model and torch.allclose(restored.weight, model.weight) and torch.allclose(restored.bias, model.bias), "동일 구조의 새 모델에 가중치를 불러오세요."
assert torch.allclose(restored(torch.tensor([[5.]])).detach(), torch.tensor([[11.]])), "새 입력의 복원 예측을 확인하세요."`,
  explain:[['model.state_dict()','모델의 파라미터와 등록된 버퍼를 이름별로 제공합니다.'],['io.BytesIO()와 seek(0)','파일 대신 메모리 버퍼를 만들고 저장 뒤 읽을 위치를 처음으로 옮깁니다.'],['torch.save와 torch.load','여기서는 state_dict를 저장하고 weights_only=True로 읽습니다. 신뢰하지 않는 파일은 주의해야 합니다.'],['load_state_dict','같은 구조의 새 모델에 이름이 맞는 파라미터와 버퍼를 복원합니다.']],
  takeaway:'가중치를 복원하려면 모델 구조를 준비하고 입력에 대한 결과를 비교해야 합니다.'
 },
 {
  id:'torch-split-heads', runtime:'torch', group:'Attention 기초', title:'특성을 여러 head로 나누고 다시 합치기', short:'reshape · transpose · head 차원', time:'20분',
  lead:'Attention을 계산하기 전에 토큰의 네 특성을 두 head의 두 특성으로 나눕니다.',
  concept:'(배치, 토큰, 특성)을 (배치, 토큰, head, head당 특성)으로 reshape한 뒤 토큰과 head 축을 바꿉니다. 원상 복구할 때 축 순서를 되돌리고 reshape합니다. 예제는 단순 분할이며 Q·K·V 투영은 포함하지 않습니다.',
  visual:['(1, 2, 4)','→ (1, 2, 2, 2)','각 head에 특성 2개'],
  predict:'특성 4개를 head 2개로 나누면 head당 특성은 몇 개일까요?',
  code:splitSolution.replace('heads = 2','heads = 1'), solution:splitSolution, referenceComplete:true,
  task:'heads를 2로 바꾸고 split의 shape와 joined가 원래 x와 같은지 확인하세요.', hint:'heads = 2',
  check:`assert heads == 2 and head_dim == 2 and split.shape == (1, 2, 2, 2), "head 수와 각 축의 크기를 확인하세요."
assert torch.equal(split[0, 0, 0], torch.tensor([1., 2.])) and torch.equal(split[0, 1, 1], torch.tensor([7., 8.])), "토큰과 head 축을 정확히 바꾸세요."
assert torch.equal(joined, x), "축 순서를 되돌려 원래 특성을 복원하세요."`,
  explain:[['reshape와 transpose','reshape는 전체 원소 수를 유지하며 모양을 바꾸고 transpose는 두 축을 교환합니다.'],['head_dim','전체 특성 수를 head 수로 나눈 각 head의 특성 수입니다.']],
  takeaway:'head와 토큰 축을 분리하고, 합칠 때는 바꾼 축 순서를 먼저 되돌립니다.'
 },
 {
  id:'torch-multi-head', runtime:'torch', group:'Attention 기초', title:'두 head의 Attention을 따로 계산하고 합치기', short:'multi-head · matmul · concat', time:'25분',
  lead:'이미 나뉜 Q·K·V에서 head마다 독립적으로 Attention을 계산하고 토큰별 특성을 이어 붙입니다.',
  concept:'Q·K·V의 shape는 (배치, head, 토큰, head당 특성)입니다. 마지막 두 축으로 각 head의 점수와 가중합을 계산하고 축을 바꿔 head별 출력을 이어 붙입니다. 이 수업에는 학습 가능한 Q·K·V 투영과 출력 투영, 마스크가 없습니다.',
  visual:['(batch, head, token, feature)','head마다 QKᵀ → softmax → V','각 토큰의 head 출력을 이어 붙임'],
  predict:'head 2개에 각각 특성 2개가 있다면 이어 붙인 출력의 특성 수는?',
  code:attentionSolution.replace('head_count * head_dim','head_count * head_dim'), solution:attentionSolution, referenceComplete:true,
  task:'두 head의 가중합을 구해 shape (1, 2, 4)의 output을 만드세요. 출력의 각 head 값이 순서대로 이어지는지 확인하세요.',
  hint:'output = heads.transpose(1, 2).reshape(batch, tokens, head_count * head_dim)',
  check:`import torch.nn.functional as F
assert q.shape == k.shape == v.shape == (1, 2, 2, 2), "배치, head, 토큰과 특성 차원을 확인하세요."
expected_heads = F.scaled_dot_product_attention(q, k, v)
assert torch.allclose(heads, expected_heads, atol=1e-6), "각 head의 Attention을 PyTorch 연산과 비교하세요."
assert output.shape == (1, 2, 4) and torch.allclose(output, expected_heads.transpose(1, 2).reshape(1, 2, 4), atol=1e-6), "head를 토큰별로 이어 붙이세요."
assert torch.allclose(weights.sum(dim=-1), torch.ones(1, 2, 2)), "각 query의 key 가중치 합을 확인하세요."`,
  explain:[['head별 QKᵀ','마지막 두 축에서 토큰끼리 점수를 계산하며 앞의 배치와 head 축은 유지됩니다.'],['transpose와 reshape','토큰 축을 head보다 앞으로 옮긴 뒤 각 head의 특성을 이어 붙입니다.']],
  takeaway:'이 예제는 여러 head의 핵심 계산과 결합만 다루며 완성된 Transformer 블록은 아닙니다.'
 }
];
export const torchExpansionQuizzes = {
 'torch-batch-training':{question:'샘플 4개를 배치 크기 2로 순회하면 한 epoch에서 optimizer.step()은 몇 번 호출되나요?',options:['2번','1번','4번'],answer:0,explanation:'두 샘플씩 총 두 배치이고 각 배치에서 한 번씩 갱신합니다.'},
 'torch-state-dict':{question:'같은 구조의 새 모델에 저장한 파라미터를 복원하면 같은 입력의 예측은?',options:['이 예제에서는 같다','항상 무작위로 달라진다'],answer:0,explanation:'가중치와 편향이 같고 같은 선형 계산을 하므로 예측도 같습니다.'},
 'torch-split-heads':{question:'특성 4개를 head 2개에 균등하게 나누면 head당 특성 수는?',options:['2','4','8'],answer:0,explanation:'4 ÷ 2 = 2이므로 각 head는 특성 두 개를 가집니다.'},
 'torch-multi-head':{question:'head가 2개이고 head마다 특성이 2개이면 이어 붙인 출력의 특성 수는?',options:['4','2','1'],answer:0,explanation:'두 head의 특성 두 개씩을 이어 붙여 2 × 2 = 4입니다.'}
};
export const torchExpansionExamples = {
 'epoch와 배치':'샘플 4개를 2개씩 읽으면 한 epoch에서 배치 두 개를 차례대로 처리합니다.',
 'record("batch", ...)':'record("batch", epoch=0, batch=0, inputs=[-2., -1.], targets=[-3., -1.])처럼 실제 값을 기록합니다.',
 'enumerate(loader)':'첫 배치는 번호 0과 입력·목표 텐서 한 쌍으로 나옵니다.',
 'model.state_dict()':'선형 모델은 보통 weight와 bias 이름으로 파라미터를 제공합니다.',
 'io.BytesIO()와 seek(0)':'버퍼에 저장하고 seek(0)을 호출해 다시 처음부터 읽습니다.',
 'torch.save와 torch.load':'torch.save(model.state_dict(), buffer) 후 안전한 출처의 내용을 weights_only=True로 읽습니다.',
 'load_state_dict':'restored.load_state_dict(weights)로 이름과 구조가 맞는 모델에 값을 채웁니다.',
 'reshape와 transpose':'(1, 2, 4)를 (1, 2, 2, 2)로 바꾸고 head 축과 토큰 축을 교환합니다.',
 'head_dim':'특성 4개를 head 2개로 나누면 각 head의 특성 수는 2입니다.',
 'head별 QKᵀ':'각 head에서 토큰 2개의 Q와 K를 내적하면 2×2 점수 행렬이 생깁니다.',
 'transpose와 reshape':'(1, 2, 2, 2) 출력을 토큰별 head 순서로 바꾸고 (1, 2, 4)로 만듭니다.'
};
