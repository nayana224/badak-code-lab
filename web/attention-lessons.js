export const attentionLessons = [
 {
  id:'torch-similarity',runtime:'torch',group:'Attention 기초',title:'벡터 내적으로 토큰의 유사도 구하기',short:'내적 · 유사도 · shape',time:'15분',
  lead:'Attention의 출발점은 한 질문 벡터가 각 키와 얼마나 맞는지 계산하는 것입니다.',
  concept:'query가 (2,), keys가 (3,2)이면 keys @ query는 각 행과 query의 내적을 계산해 (3,) 점수를 만듭니다. 여기서는 숫자를 직접 지정합니다.',
  visual:['(3, 2) @ (2,)','→ (3,)','키마다 점수를 하나씩 만듭니다'],
  predict:'query가 [1,0]이라면 각 키의 두 번째 값은 내적에 얼마나 기여할까요?',
  code:'import torch\nquery = torch.tensor([1., 0.])\nkeys = torch.tensor([[1., 0.], [0., 1.], [1., 1.]])\nscores = keys @ query\nprint(scores)\n',
  task:'query를 [0., 1.]로 바꾸어 scores가 [0., 1., 1.]이 되도록 하세요.',hint:'query = torch.tensor([0., 1.])',
  solution:'import torch\nquery = torch.tensor([0., 1.])\nkeys = torch.tensor([[1., 0.], [0., 1.], [1., 1.]])\nscores = keys @ query\nprint(scores)\n',
  check:'assert query.shape == (2,) and keys.shape == (3, 2), "query와 keys의 shape를 확인하세요."\nassert torch.allclose(query, torch.tensor([0., 1.])) and torch.allclose(scores, keys @ query) and torch.allclose(scores, torch.tensor([0., 1., 1.])), "각 키와 query의 내적을 구하세요."',
  explain:[['keys @ query','각 키 행과 query의 내적을 계산합니다.'],['torch.tensor(...)','숫자들을 CPU 텐서로 만듭니다.']],takeaway:'내적 점수는 각 키와 query 사이의 하나의 비교값입니다.'
 },
 {
  id:'torch-softmax',runtime:'torch',group:'Attention 기초',title:'softmax를 바닥부터 만들기',short:'softmax · 수치 안정성',time:'18분',
  lead:'점수를 지수화하고 합으로 나누어 가중치를 만듭니다.',
  concept:'softmax는 각 점수의 지수값을 전체 지수값의 합으로 나눕니다. 지수 계산 전에 최댓값을 빼면 결과 비율은 같고 큰 입력에서 오버플로를 줄일 수 있습니다.',
  visual:['점수 → exp → 합으로 나누기','가중치 합 = 1','최댓값을 먼저 빼서 안정성을 높입니다'],
  predict:'[1000, 1001, 1002]에서 최댓값을 빼면 어떤 숫자가 남을까요?',
  code:'import torch\nlogits = torch.tensor([1000., 1001., 1002.])\nshifted = logits - logits.max()\nexp_values = torch.exp(shifted)\nweights = exp_values / exp_values.sum()\nprint(weights, weights.sum())\n',
  task:'logits를 [1001., 1001., 1002.]로 바꿔 weights를 계산하세요. torch.softmax와 같은지 확인합니다.',hint:'logits = torch.tensor([1001., 1001., 1002.])',
  solution:'import torch\nlogits = torch.tensor([1001., 1001., 1002.])\nshifted = logits - logits.max()\nexp_values = torch.exp(shifted)\nweights = exp_values / exp_values.sum()\nprint(weights, weights.sum())\n',
  check:'assert torch.allclose(logits, torch.tensor([1001., 1001., 1002.])), "점수를 바꾸세요."\nassert torch.allclose(shifted, logits - logits.max()) and torch.allclose(weights, torch.softmax(logits, dim=0), atol=1e-6), "최댓값을 빼고 지수값의 합으로 나누세요."\nassert torch.isfinite(weights).all() and abs(weights.sum().item()-1) < 1e-6, "유한한 가중치의 합이 1인지 확인하세요."',
  explain:[['torch.exp','각 원소에 지수 함수를 적용합니다.'],['max()와 sum()','점수의 최댓값과 지수값의 합을 계산합니다.'],['torch.softmax(logits, dim=0)','비교를 위한 PyTorch의 softmax 구현입니다.']],takeaway:'softmax의 가중치는 0 이상이며 선택한 축에서 합이 1입니다.'
 },
 {
  id:'torch-attention',runtime:'torch',group:'Attention 기초',title:'Q·K·V로 작은 Attention 직접 계산하기',short:'QKᵀ · softmax · V',time:'25분',
  lead:'두 토큰의 작은 행렬로 scaled dot-product attention을 직접 계산합니다.',
  concept:'Q와 K의 내적을 √d로 나누고 각 query 행에 softmax를 적용한 뒤 V를 가중합합니다. 여기서는 학습된 투영 없이 Q·K·V를 직접 지정합니다.',
  visual:['Q (2,2) · Kᵀ (2,2)','scores → weights → output','각 행은 한 query의 가중치입니다'],
  predict:'Q와 K가 단위 행렬이면 각 query는 어느 키에 더 큰 가중치를 줄까요?',
  code:'import math\nimport torch\nQ = torch.tensor([[1., 0.], [0., 1.]])\nK = torch.tensor([[1., 0.], [0., 1.]])\nV = torch.tensor([[1., 2.], [3., 4.]])\nscores = (Q @ K.T) / math.sqrt(Q.shape[-1])\nweights = torch.softmax(scores, dim=-1)\noutput = weights @ V\nrecord("attention", scores=scores.tolist(), weights=weights.tolist(), result=output.tolist())\nprint("weights:", weights)\nprint("output:", output)\n',
  task:'V의 첫 행을 [2., 2.]로 바꾸고 scores, weights, output을 다시 계산하세요. 실행 후 실제 행렬을 시각화에서 확인하세요.',hint:'V = torch.tensor([[2., 2.], [3., 4.]])',
  solution:'import math\nimport torch\nQ = torch.tensor([[1., 0.], [0., 1.]])\nK = torch.tensor([[1., 0.], [0., 1.]])\nV = torch.tensor([[2., 2.], [3., 4.]])\nscores = (Q @ K.T) / math.sqrt(Q.shape[-1])\nweights = torch.softmax(scores, dim=-1)\noutput = weights @ V\nrecord("attention", scores=scores.tolist(), weights=weights.tolist(), result=output.tolist())\nprint("weights:", weights)\nprint("output:", output)\n',
  check:'assert Q.shape == K.shape == V.shape == (2, 2), "Q, K, V의 shape를 확인하세요."\nassert torch.allclose(V, torch.tensor([[2., 2.], [3., 4.]])), "V의 첫 행을 바꾸세요."\nassert torch.allclose(scores, (Q @ K.T) / math.sqrt(Q.shape[-1])) and torch.allclose(weights, torch.softmax(scores, dim=-1)) and torch.allclose(output, weights @ V), "각 행렬 연산을 확인하세요."\nassert torch.allclose(weights.sum(dim=-1), torch.ones(2)), "각 행의 가중치 합을 확인하세요."',
  explain:[['Q @ K.T','각 query와 key의 내적 점수입니다.'],['math.sqrt(Q.shape[-1])','key/query 특성 수의 제곱근으로 점수를 나눕니다.'],['softmax(..., dim=-1)','각 query 행의 키별 점수를 가중치로 바꿉니다.'],['record("attention", ...)','실습실의 기록 도우미로 실제 계산된 행렬을 표시합니다. PyTorch 표준 함수가 아닙니다.']],
  trace:true,takeaway:'Attention은 query별로 key 가중치를 만든 뒤 value를 가중합합니다.'
 },
 {
  id:'torch-causal-attention',runtime:'torch',group:'Attention 기초',title:'미래 토큰을 가리는 인과 마스크',short:'causal mask · softmax',time:'20분',
  lead:'현재 위치보다 뒤의 토큰을 보지 않도록 점수 행렬에 마스크를 적용합니다.',
  concept:'행은 query 위치, 열은 key 위치입니다. 열이 행보다 큰 곳은 미래이므로 softmax 전에 음의 무한대로 채웁니다. 각 행에는 최소한 현재 위치가 남습니다.',
  visual:['행 0: 현재만','행 1: 현재와 과거','미래 위치의 가중치는 0입니다'],
  predict:'두 토큰에서 첫 query가 두 번째 key를 볼 수 있을까요?',
  code:'import math\nimport torch\nQ = torch.tensor([[1., 0.], [0., 1.]])\nK = Q.clone()\nV = torch.tensor([[1., 2.], [3., 4.]])\nscores = (Q @ K.T) / math.sqrt(Q.shape[-1])\nfuture = torch.triu(torch.ones_like(scores, dtype=torch.bool), diagonal=1)\nmasked = scores.masked_fill(future, float("-inf"))\nweights = torch.softmax(masked, dim=-1)\noutput = weights @ V\nprint(weights)\nprint(output)\n',
  task:'V의 첫 행을 [2., 2.]로 바꾸세요. 첫 query의 출력은 [2., 2.]이고 미래 위치 가중치는 0입니다.',hint:'V = torch.tensor([[2., 2.], [3., 4.]])',
  solution:'import math\nimport torch\nQ = torch.tensor([[1., 0.], [0., 1.]])\nK = Q.clone()\nV = torch.tensor([[2., 2.], [3., 4.]])\nscores = (Q @ K.T) / math.sqrt(Q.shape[-1])\nfuture = torch.triu(torch.ones_like(scores, dtype=torch.bool), diagonal=1)\nmasked = scores.masked_fill(future, float("-inf"))\nweights = torch.softmax(masked, dim=-1)\noutput = weights @ V\nprint(weights)\nprint(output)\n',
  check:'assert Q.shape == K.shape == V.shape == (2, 2) and torch.allclose(V, torch.tensor([[2., 2.], [3., 4.]])), "입력 텐서를 확인하세요."\nassert future.dtype == torch.bool and torch.equal(future, torch.tensor([[False, True], [False, False]])), "미래 위치만 마스킹하세요."\nexpected = torch.softmax(((Q @ K.T) / math.sqrt(Q.shape[-1])).masked_fill(future, float("-inf")), dim=-1)\nassert torch.allclose(weights, expected) and torch.allclose(output, expected @ V) and weights[0, 1].item() == 0, "마스킹 후 softmax와 가중합을 계산하세요."',
  explain:[['torch.triu(..., diagonal=1)','주 대각선 위의 원소를 선택합니다.'],['masked_fill','조건이 참인 위치의 값을 바꾼 새 텐서를 만듭니다.'],['float("-inf")','softmax에서 해당 위치의 가중치를 0으로 만드는 음의 무한대입니다.']],takeaway:'인과 마스크는 query가 미래의 key를 참조하지 못하도록 합니다.'
 }
];
