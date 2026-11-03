export const cppExpansionQuizzes = {
 'cpp-value-category':{question:'int number = 4;에서 show(number)와 show(7)이 각각 선택하는 것은?',options:['int&와 int&&','int&&와 int&','둘 다 int&'],answer:0,explanation:'변수 이름은 lvalue이므로 int&, 정수 리터럴은 prvalue이므로 int&& 오버로드가 선택됩니다.'},
 'cpp-named-rvalue-reference':{question:'int&& ref = 5; 다음 ref와 std::move(ref)의 표현식 범주는?',options:['lvalue와 xvalue','둘 다 lvalue','둘 다 prvalue'],answer:0,explanation:'이름 ref는 lvalue이고 std::move(ref)는 xvalue입니다. std::move 자체가 값을 이동하지는 않습니다.'},
 'cpp-exchange':{question:'count=3일 때 old=std::exchange(count, 7) 후 old와 count는?',options:['3과 7','7과 3','7과 7'],answer:0,explanation:'exchange는 이전 값 3을 반환하고 count에 7을 대입합니다.'},
 'cpp-rule-zero':{question:'정수 vector를 소유하는 Book을 복사한 뒤 복사본만 바꾸면?',options:['원본의 원소는 유지된다','원본도 항상 바뀐다'],answer:0,explanation:'이 예제의 vector 복사는 원소를 복사하므로 두 vector는 독립적입니다.'},
 'cpp-exception-strong':{question:'values가 [3]이고 replace_first(values, -1)이 검증에 실패하면?',options:['예외가 나고 values는 [3]이다','values는 [-1]이 된다','values가 자동으로 비워진다'],answer:0,explanation:'음수는 값을 바꾸기 전에 예외를 던지므로 이 함수에서 기존 값 3이 유지됩니다.'}
};
export const cppExpansionExamples = {
 '#include <numeric>':'합계 함수 std::accumulate를 사용하려면 <numeric> 헤더를 포함합니다.',
 '#include <cassert>':'assert(2 + 2 == 4);는 조건을 검사합니다. NDEBUG가 정의되면 검사가 제거될 수 있습니다.',
 'unordered_map::at(key)':'counts.at("cat")은 기존 키 cat의 값을 읽습니다. 키가 없으면 out_of_range 예외가 발생합니다.',
 'lvalue와 prvalue':'int n = 4;에서 n은 lvalue, 정수 리터럴 7은 prvalue입니다.',
 'int&와 int&& 오버로드':'show(n)은 int& 버전, show(7)은 int&& 버전을 선택합니다.',
 '이름 붙은 int&&':'int&& ref = 5;에서 ref라는 이름을 쓴 표현식은 lvalue입니다.',
 'std::move(ref)':'show(ref)는 int& 오버로드를, show(std::move(ref))는 int&& 오버로드를 호출합니다.',
 'std::exchange':'n=3일 때 old=std::exchange(n, 7)이면 old는 3이고 n은 7입니다.',
 '이전 값과 새 값':'exchange가 반환한 old는 이전 값 3이고, 변경된 count는 새 값 7입니다.',
 '규칙 0과 vector':'vector 멤버가 자신의 메모리를 관리하므로 Book에 해제 코드를 직접 쓰지 않습니다.',
 'Book second = first':'정수 vector [2, 4]를 복사한 뒤 second의 첫 원소만 7로 바꾸면 first는 [2, 4]로 남습니다.',
 '변경 전 입력 검증':'values가 [3]이고 새 값이 -1이면 먼저 예외가 나므로 [3]은 그대로입니다.',
 'std::invalid_argument':'throw std::invalid_argument("invalid");는 잘못된 인자를 예외로 알립니다.'
};
// Executed after the learner's visible program passes, in the existing C++ sandbox.
// These finite examples improve feedback; they do not prove general correctness.
export const cppExpansionChecks = {
 'cpp-exception-strong': `
  std::vector<int> empty;
  bool empty_threw = false;
  try { replace_first(empty, 2); } catch (const std::invalid_argument&) { empty_threw = true; }
  if (!empty_threw || !empty.empty()) return 1;
  std::vector<int> values{3, 4};
  bool negative_threw = false;
  try { replace_first(values, -1); } catch (const std::invalid_argument&) { negative_threw = true; }
  if (!negative_threw || values != std::vector<int>{3, 4}) return 1;
  replace_first(values, 0);
  if (values != std::vector<int>{0, 4}) return 1;`
};
