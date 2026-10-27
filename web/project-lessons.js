// 작은 프로젝트: 핵심 개념을 연결하고 예제와 경계 조건을 함께 확인합니다.
export const projectLessons = [
 {
  id:'project-python-scores',runtime:'python',group:'복습 · 프로젝트',title:'프로젝트: 점수를 검증하고 평균 구하기',short:'점수 검증 · 평균 함수',time:'20분',
  lead:'리스트와 조건, 함수와 오류를 연결해 점수 평균을 계산합니다.',
  concept:'점수는 0부터 100까지의 정수여야 합니다. 값이 없거나 정수가 아닌 값, 범위 밖의 값이 있으면 ValueError로 알립니다. 유효한 목록은 합계를 개수로 나눈 평균을 반환합니다.',
  visual:['점수 목록 → 검증 → 평균','[60, 80, 100] → 80','빈 목록과 범위 밖 입력도 확인합니다'],
  predict:'점수 목록이 비어 있을 때 평균을 바로 계산하면 왜 문제가 될까요?',
  code:`def average_score(scores):
    if not scores:
        raise ValueError("점수가 없습니다.")
    for score in scores:
        if type(score) is not int or score < 0 or score > 100:
            raise ValueError("점수는 0~100의 정수여야 합니다.")
    return sum(scores) / len(scores)

scores = [60, 80]
result = average_score(scores)
print("평균:", result)
`,
  task:'scores에 100을 추가해 평균 80을 계산하세요. 함수는 빈 목록, 정수가 아닌 값, 0~100 범위 밖을 거부해야 합니다.',
  hint:'scores = [60, 80, 100]',
  solution:`def average_score(scores):
    if not scores:
        raise ValueError("점수가 없습니다.")
    for score in scores:
        if type(score) is not int or score < 0 or score > 100:
            raise ValueError("점수는 0~100의 정수여야 합니다.")
    return sum(scores) / len(scores)

scores = [60, 80, 100]
result = average_score(scores)
print("평균:", result)
`,
  check:`assert scores == [60, 80, 100] and result == 80, "점수 세 개의 평균을 계산하세요."
assert average_score([0, 100]) == 50 and average_score([80]) == 80, "경계 값과 점수 하나를 확인하세요."
for invalid in ([], [-1], [101], [4.5], [True], ["30"]):
    try:
        average_score(invalid)
    except ValueError:
        pass
    else:
        raise AssertionError("빈 목록, 정수가 아닌 값, 범위 밖은 ValueError가 필요합니다.")`,
  explain:[['type(score) is not int','이 실습에서는 불리언을 포함해 int가 아닌 값은 점수로 받지 않습니다.'],['raise ValueError(...)','유효하지 않은 점수임을 호출자에게 알립니다.'],['sum(scores) / len(scores)','목록의 합을 점수 개수로 나눕니다. 빈 목록은 나누기 전에 거부합니다.']],
  takeaway:'입력 검증과 계산을 함수 안에 모으면 다른 목록에서도 같은 규칙을 적용할 수 있습니다.'
 },
 {
  id:'project-cpp-summary',runtime:'cpp',group:'복습 · 프로젝트',title:'프로젝트: 숫자 목록 요약하기',short:'vector · 함수 · 표준 알고리즘',time:'25분',
  lead:'vector와 함수, 표준 알고리즘을 묶어 숫자 목록을 요약합니다.',
  concept:'비어 있지 않은 vector의 개수, 합계, 최댓값을 구합니다. 빈 목록에는 std::nullopt를 반환합니다. max_element의 결과는 범위가 비어 있지 않을 때만 역참조합니다.',
  visual:['[3, 4, 5, 8]','4개 · 합계 20 · 최댓값 8','빈 목록은 값 없음으로 표현합니다'],
  predict:'빈 vector의 최댓값을 바로 역참조하면 안전할까요?',
  code:`#include <algorithm>
#include <cassert>
#include <iostream>
#include <numeric>
#include <optional>
#include <vector>

struct Summary { int count; int total; int maximum; };

std::optional<Summary> summarize(const std::vector<int>& values) {
    if (values.empty()) return std::nullopt;
    int total = std::accumulate(values.begin(), values.end(), 0);
    int maximum = *std::max_element(values.begin(), values.end());
    return Summary{static_cast<int>(values.size()), total, maximum};
}

int main() {
    assert(!summarize({}).has_value());
    auto negative = summarize({-4});
    assert(negative && negative->count == 1 && negative->total == -4 && negative->maximum == -4);
    std::vector<int> values{3, 4, 5};
    auto result = summarize(values);
    if (result) std::cout << result->count << " " << result->total << " " << result->maximum << "\\n";
}
`,
  task:'values에 8을 추가해 4 20 8을 출력하세요. summarize는 빈 목록을 거부하고 음수 한 개도 올바르게 처리해야 합니다.',
  hint:'std::vector<int> values{3, 4, 5, 8};',
  solution:`#include <algorithm>
#include <cassert>
#include <iostream>
#include <numeric>
#include <optional>
#include <vector>

struct Summary { int count; int total; int maximum; };

std::optional<Summary> summarize(const std::vector<int>& values) {
    if (values.empty()) return std::nullopt;
    int total = std::accumulate(values.begin(), values.end(), 0);
    int maximum = *std::max_element(values.begin(), values.end());
    return Summary{static_cast<int>(values.size()), total, maximum};
}

int main() {
    assert(!summarize({}).has_value());
    auto negative = summarize({-4});
    assert(negative && negative->count == 1 && negative->total == -4 && negative->maximum == -4);
    std::vector<int> values{3, 4, 5, 8};
    auto result = summarize(values);
    if (result) std::cout << result->count << " " << result->total << " " << result->maximum << "\\n";
}
`,expectedOutput:'4 20 8',referenceComplete:true,
  explain:[['std::accumulate(first, last, 0)','<numeric>의 함수로 범위의 원소를 0부터 더합니다.'],['std::max_element(first, last)','<algorithm>의 함수로 최댓값의 위치를 반환합니다. 빈 범위에서는 end를 반환하므로 역참조하지 않습니다.'],['std::optional<Summary>','요약이 없을 수도 있음을 표현합니다. result가 있는지 확인한 뒤 ->로 멤버에 접근합니다.'],['assert','조건이 거짓이면 프로그램을 실패시켜 이 예제의 경계 조건을 확인합니다.']],
  takeaway:'비어 있는 입력을 먼저 처리하고 표준 알고리즘의 범위와 반환값을 확인합니다. 사이트의 C++ 실습 검사는 출력 비교이므로 별도의 자가 검사를 포함했습니다.'
 },
 {
  id:'project-torch-prediction',runtime:'torch',group:'복습 · 프로젝트',title:'프로젝트: 텐서 예측과 손실 계산하기',short:'텐서 예측 · MSE · shape',time:'20분',
  lead:'텐서와 함수를 연결해 선형 예측과 평균 제곱 오차를 계산합니다.',
  concept:'예측은 y = wx + b입니다. 평균 제곱 오차는 각 예측과 목표의 차이를 제곱해 평균을 낸 값입니다. 실수로 방송 규칙이 적용되지 않도록 loss 함수에서 두 shape가 같은지 확인합니다.',
  visual:['x → wx + b → 예측','평균 제곱 오차','예측과 목표의 shape를 비교합니다'],
  predict:'x=[1, 2], w=2, b=1이면 예측은 무엇일까요? 목표가 [3, 5]일 때 손실은 얼마일까요?',
  code:`import torch

def predict(x, weight, bias):
    return x * weight + bias

def mse(prediction, target):
    if prediction.shape != target.shape:
        raise ValueError("예측과 목표의 shape가 같아야 합니다.")
    return ((prediction - target) ** 2).mean()

x = torch.tensor([[1.], [2.]])
target = torch.tensor([[3.], [5.]])
weight = torch.tensor(1.)
bias = torch.tensor(1.)
prediction = predict(x, weight, bias)
loss = mse(prediction, target)
print("예측:", prediction.flatten().tolist())
print("손실:", loss.item())
`,
  task:'weight를 2로 바꿔 예측 [3, 5]와 손실 0을 만드세요. mse는 shape가 다르면 ValueError를 발생시켜야 합니다.',
  hint:'weight = torch.tensor(2.)',
  solution:`import torch

def predict(x, weight, bias):
    return x * weight + bias

def mse(prediction, target):
    if prediction.shape != target.shape:
        raise ValueError("예측과 목표의 shape가 같아야 합니다.")
    return ((prediction - target) ** 2).mean()

x = torch.tensor([[1.], [2.]])
target = torch.tensor([[3.], [5.]])
weight = torch.tensor(2.)
bias = torch.tensor(1.)
prediction = predict(x, weight, bias)
loss = mse(prediction, target)
print("예측:", prediction.flatten().tolist())
print("손실:", loss.item())
`,
  check:`assert weight.item() == 2 and prediction.shape == (2, 1), "가중치와 예측 shape를 확인하세요."
assert torch.allclose(prediction, target) and torch.isclose(loss, torch.tensor(0.)), "예측과 손실을 확인하세요."
assert torch.allclose(predict(torch.tensor([[3.]]), torch.tensor(2.), torch.tensor(1.)), torch.tensor([[7.]])), "입력과 가중치로 예측해야 합니다."
assert torch.isclose(mse(torch.tensor([1., 3.]), torch.tensor([0., 1.])), torch.tensor(2.5)), "제곱 오차의 평균을 계산하세요."
try:
    mse(torch.tensor([[1.], [2.]]), torch.tensor([1., 2.]))
except ValueError:
    pass
else:
    raise AssertionError("shape가 다르면 ValueError가 필요합니다.")`,
  explain:[['torch.tensor(...)','Python의 숫자와 리스트로 텐서를 만듭니다.'],['prediction.shape','텐서의 각 축 크기입니다. shape가 다르면 원치 않는 broadcasting이 일어날 수 있습니다.'],['mean() / item()','mean은 평균 텐서를 반환합니다. item은 원소 하나를 Python 숫자로 읽습니다.']],
  takeaway:'예측과 목표의 shape를 비교한 뒤 손실을 계산합니다. 이 수업은 파라미터 학습 없이 고정값으로 계산합니다.'
 }
];
