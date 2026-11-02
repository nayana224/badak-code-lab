// Each example is self-contained and uses only C++20 features in the local runtime.
function lesson(data) {
  return { runtime:'cpp', group:'모던 C++ 심화', time:'20분', referenceComplete:true, ...data };
}
export const cppExpansionLessons = [
 lesson({
  id:'cpp-value-category', title:'이름이 있는 값과 임시 값 구분하기', short:'lvalue · rvalue · 오버로드',
  lead:'같은 숫자라도 표현식에 이름이 있는지에 따라 어떤 함수가 선택되는지 확인합니다.',
  concept:'이 수업에서 변수 이름은 lvalue이고 숫자 리터럴은 prvalue입니다. lvalue는 int&에, 임시 정수는 int&&에 전달되어 각각의 오버로드가 선택됩니다. 일반적인 C++ 값 범주 전체를 설명하는 예제는 아닙니다.',
  visual:['number → 이름이 있는 객체','7 → 임시 정수','오버로드가 참조의 종류를 구분합니다'],
  predict:'변수 number와 정수 7을 각각 전달하면 어느 함수가 호출될까요?',
  code:`#include <iostream>

void show(int& value) { std::cout << "lvalue " << value << "\\n"; }
void show(int&& value) { std::cout << "rvalue " << value << "\\n"; }

int main() {
    int number = 2;
    show(number);
    show(7);
}
`,
  solution:`#include <iostream>

void show(int& value) { std::cout << "lvalue " << value << "\\n"; }
void show(int&& value) { std::cout << "rvalue " << value << "\\n"; }

int main() {
    int number = 4;
    show(number);
    show(7);
}
`,
  task:'number를 4로 바꾸고 lvalue 4와 rvalue 7이 차례로 출력되게 하세요.', hint:'int number = 4;', expectedOutput:'lvalue 4\nrvalue 7',
  explain:[['lvalue와 prvalue','변수 이름은 객체를 가리키는 lvalue이며 정수 리터럴은 이 예제에서 prvalue입니다.'],['int&와 int&& 오버로드','함수 호출 시 표현식에 맞는 참조 매개변수의 오버로드를 선택합니다.']],
  takeaway:'표현식의 값 범주와 실제로 선택된 참조 오버로드를 구분합니다.'
 }),
 lesson({
  id:'cpp-named-rvalue-reference', title:'이름이 붙은 우측값 참조와 std::move', short:'int&& · std::move · 오버로드',
  lead:'우측값 참조 변수에도 이름이 생기면 그 표현식은 lvalue라는 점을 실험합니다.',
  concept:'int&& ref는 임시 정수에 바인딩될 수 있지만 이름 ref를 쓴 표현식은 lvalue입니다. std::move(ref)는 이동 가능한 범주의 표현식으로 바꿔 int&& 오버로드를 선택하게 합니다. std::move 자체가 정수를 옮기지는 않습니다.',
  visual:['ref → lvalue','std::move(ref) → xvalue','표현식의 범주를 함수로 확인합니다'],
  predict:'이름 ref를 직접 넘길 때와 std::move(ref)를 넘길 때 호출되는 함수는 같을까요?',
  code:`#include <iostream>
#include <utility>

void show(int& value) { std::cout << "lvalue " << value << "\\n"; }
void show(int&& value) { std::cout << "rvalue " << value << "\\n"; }

int main() {
    int&& ref = 3;
    show(ref);
    show(std::move(ref));
}
`,
  solution:`#include <iostream>
#include <utility>

void show(int& value) { std::cout << "lvalue " << value << "\\n"; }
void show(int&& value) { std::cout << "rvalue " << value << "\\n"; }

int main() {
    int&& ref = 5;
    show(ref);
    show(std::move(ref));
}
`,
  task:'ref의 초기값을 5로 바꾸고 lvalue 5와 rvalue 5를 차례로 출력하세요.', hint:'int&& ref = 5;', expectedOutput:'lvalue 5\nrvalue 5',
  explain:[['이름 붙은 int&&','변수의 선언 타입이 int&&여도 변수 이름 ref라는 표현식은 lvalue입니다.'],['std::move(ref)','이 표현식을 xvalue로 변환합니다. 실제 이동 여부는 선택된 연산에 달려 있습니다.']],
  takeaway:'std::move는 이동을 강제로 실행하지 않고 이동에 사용할 수 있는 표현식을 만듭니다.'
 }),
 lesson({
  id:'cpp-exchange', title:'std::exchange로 이전 값과 새 값 나누기', short:'std::exchange · 상태 변경',
  lead:'객체의 이전 값을 반환하면서 지정한 새 값을 넣는 동작을 직접 따라갑니다.',
  concept:'std::exchange(object, new_value)는 object의 이전 값을 결과로 돌려주고 object에 새 값을 대입합니다. 이 정수 예제에서는 기존 값과 변경된 값을 함께 확인합니다.',
  visual:['count = 3','old = exchange(count, 7)','old는 3, count는 7'],
  predict:'count가 3일 때 exchange(count, 7)의 반환값과 변경된 count는 각각 무엇일까요?',
  code:`#include <iostream>
#include <utility>
int main() {
    int count = 3;
    int old = std::exchange(count, 5);
    std::cout << old << " " << count << "\\n";
}
`,
  solution:`#include <iostream>
#include <utility>
int main() {
    int count = 3;
    int old = std::exchange(count, 7);
    std::cout << old << " " << count << "\\n";
}
`,
  task:'새 값을 7로 바꾸어 이전 값과 새 값 3 7을 출력하세요.', hint:'std::exchange(count, 7)', expectedOutput:'3 7',
  explain:[['std::exchange','첫 번째 인자의 이전 값을 반환하고 두 번째 인자를 첫 번째 인자에 대입합니다.'],['이전 값과 새 값','반환된 old와 변경된 count는 서로 다른 정수 객체입니다.']],
  takeaway:'값을 교체하면서 이전 상태가 필요할 때 exchange의 반환값을 확인합니다.'
 }),
 lesson({
  id:'cpp-rule-zero', title:'vector에 맡기는 자원 관리: 규칙 0', short:'rule of zero · vector · 값 복사',
  lead:'직접 메모리를 해제하는 코드 없이 표준 라이브러리 객체에 수명 관리를 맡깁니다.',
  concept:'std::vector를 멤버로 소유하면 특별한 자원 관리가 필요 없는 클래스는 소멸자나 복사·이동 연산을 직접 정의하지 않을 수 있습니다. 정수 vector를 가진 이 예제의 복사는 원소를 복사하므로 독립적으로 수정됩니다.',
  visual:['원본 Book → vector','복사본 → 별도 vector','각 vector가 자기 메모리를 정리합니다'],
  predict:'복사본의 첫 점수만 바꾸면 원본의 첫 점수도 바뀔까요?',
  code:`#include <iostream>
#include <vector>

struct Book {
    std::vector<int> scores;
};

int main() {
    Book first{{2, 4}};
    Book second = first;
    second.scores[0] = 5;
    std::cout << first.scores[0] << " " << second.scores[0] << "\\n";
}
`,
  solution:`#include <iostream>
#include <vector>

struct Book {
    std::vector<int> scores;
};

int main() {
    Book first{{2, 4}};
    Book second = first;
    second.scores[0] = 7;
    std::cout << first.scores[0] << " " << second.scores[0] << "\\n";
}
`,
  task:'복사본의 첫 점수를 7로 바꾸어 원본과 복사본의 값 2 7을 출력하세요.', hint:'second.scores[0] = 7;', expectedOutput:'2 7',
  explain:[['규칙 0과 vector','자원을 관리하는 멤버에 수명 관리를 맡겨 클래스가 특별 멤버 함수를 직접 정의할 필요를 줄입니다.'],['Book second = first','이 예제에서는 정수 vector가 복사되므로 두 객체의 원소가 독립적입니다.']],
  takeaway:'표준 라이브러리의 자원 관리 타입을 사용하면 소유권 구현을 직접 다룰 일을 줄일 수 있습니다.'
 }),
 lesson({
  id:'cpp-exception-strong', title:'실패하면 기존 값을 보존하기', short:'예외 · 입력 검증 · 상태 보존',
  lead:'값을 바꾸기 전에 입력을 확인해 실패했을 때 이전 상태를 유지합니다.',
  concept:'replace_first는 입력이 비어 있거나 새 값이 음수라면 변경 전에 예외를 던집니다. 이 함수의 예제에서는 검증 실패 시 vector가 그대로 남고, 성공하면 첫 정수를 교체합니다. 일반적인 모든 함수가 이 보장을 자동으로 갖는 것은 아닙니다.',
  visual:['입력 검증 → 실패: 변경 없음','검증 성공 → 값 교체','실패 전 상태를 비교합니다'],
  predict:'첫 원소가 3이고 새 값이 -1이면 예외가 난 뒤 첫 원소는 무엇일까요?',
  code:`#include <iostream>
#include <stdexcept>
#include <vector>

void replace_first(std::vector<int>& values, int value) {
    if (values.empty() || value < 0) throw std::invalid_argument("invalid");
    values[0] = value;
}

int main() {
    std::vector<int> values{3};
    try { replace_first(values, -1); }
    catch (const std::invalid_argument&) { std::cout << "invalid "; }
    replace_first(values, 5);
    std::cout << values[0] << "\\n";
}
`,
  solution:`#include <iostream>
#include <stdexcept>
#include <vector>

void replace_first(std::vector<int>& values, int value) {
    if (values.empty() || value < 0) throw std::invalid_argument("invalid");
    values[0] = value;
}

int main() {
    std::vector<int> values{3};
    try { replace_first(values, -1); }
    catch (const std::invalid_argument&) { std::cout << "invalid " << values[0] << " "; }
    replace_first(values, 5);
    std::cout << values[0] << "\\n";
}
`,
  task:'catch에서 변경되지 않은 첫 값도 출력해 invalid 3 5를 확인하세요.', hint:'catch 안에서 values[0]도 출력하세요.', expectedOutput:'invalid 3 5',
  explain:[['변경 전 입력 검증','빈 vector 또는 음수를 먼저 거부해 실패 시 values를 건드리지 않습니다.'],['std::invalid_argument','유효하지 않은 인자를 알리는 표준 예외 타입입니다.']],
  takeaway:'실패했을 때 상태가 유지되는지 예외 발생 경로와 성공 경로를 각각 확인합니다.'
 })
];
