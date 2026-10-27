// Descriptions are shown only when the corresponding header or call occurs in the example.
const entries = [
 [/#include\s*<iostream>/, '#include <iostream>', 'std::cout 등 표준 입출력 선언을 가져옵니다.'],
 [/#include\s*<vector>/, '#include <vector>', '크기를 바꿀 수 있는 연속 배열 std::vector를 제공합니다.'],
 [/#include\s*<string>/, '#include <string>', '문자열을 소유하는 std::string을 제공합니다.'],
 [/#include\s*<string_view>/, '#include <string_view>', '문자열을 소유하지 않는 뷰 std::string_view를 제공합니다.'],
 [/#include\s*<algorithm>/, '#include <algorithm>', '정렬·탐색 등 표준 알고리즘의 선언을 제공합니다.'],
 [/#include\s*<memory>/, '#include <memory>', 'unique_ptr, shared_ptr 등 메모리 관리 도구를 제공합니다.'],
 [/#include\s*<optional>/, '#include <optional>', '값이 있거나 없을 수 있음을 표현하는 std::optional을 제공합니다.'],
 [/#include\s*<utility>/, '#include <utility>', 'std::move와 std::swap 같은 유틸리티를 제공합니다.'],
 [/#include\s*<ranges>/, '#include <ranges>', 'C++20 범위와 뷰를 다루는 도구를 제공합니다.'],
 [/#include\s*<span>/, '#include <span>', '연속된 데이터의 비소유 뷰 std::span을 제공합니다.'],
 [/#include\s*<concepts>/, '#include <concepts>', 'std::integral 등 타입을 제한하는 표준 concepts를 제공합니다.'],
 [/#include\s*<stdexcept>/, '#include <stdexcept>', 'std::runtime_error 등 표준 예외 타입을 제공합니다.'],
 [/std::cout\s*<</, 'std::cout << 값', '값을 표준 출력에 씁니다. "\\n"은 줄바꿈을 나타냅니다.'],
 [/static_cast\s*<\s*int\s*>/, 'static_cast<int>(값)', '값을 int로 명시적으로 변환합니다. 원래 값이 int로 표현할 수 있는 범위인지 확인해야 합니다.'],
 [/std::swap\s*\(/, 'std::swap(a, b)', '두 값의 내용을 교환합니다.'],
 [/\.at\s*\(/, 'at(index)', '지정한 위치의 원소에 접근하며 범위를 벗어나면 std::out_of_range 예외를 던집니다.'],
 [/\.size\s*\(/, 'size()', '컨테이너의 원소 수를 반환합니다. std::string은 저장된 문자 단위(일반적인 UTF-8에서는 바이트) 수입니다.'],
 [/\.begin\s*\(\).*\.end\s*\(/s, 'begin()과 end()', 'begin은 첫 원소, end는 마지막 원소 다음 위치를 가리킵니다. [begin, end) 범위에 end는 포함되지 않습니다.'],
 [/std::sort\s*\(/, 'std::sort(first, last)', '전달된 [first, last) 범위의 원소를 기본적으로 오름차순으로 정렬합니다.'],
 [/std::find\s*\(/, 'std::find(first, last, value)', '범위에서 처음 일치하는 위치를 찾고, 없으면 last를 반환합니다.'],
 [/std::count_if\s*\(/, 'std::count_if(first, last, 조건)', '범위에서 조건이 참인 원소의 개수를 반환합니다.'],
 [/std::make_unique\s*</, 'std::make_unique<T>(...)', 'T 객체를 생성하고 단독 소유하는 unique_ptr을 반환합니다.'],
 [/std::make_shared\s*</, 'std::make_shared<T>(...)', 'T 객체를 생성하고 공동 소유하는 shared_ptr을 반환합니다.'],
 [/std::move\s*\(/, 'std::move(value)', '값을 이동에 사용할 수 있는 표현식으로 바꿉니다. 실제 이동과 이후 상태는 해당 타입에 따라 결정됩니다.'],
 [/\.use_count\s*\(/, 'shared_ptr::use_count()', '공유 소유자의 수를 반환합니다. 여러 스레드 사이에서 동기화 판단에 사용하지 않습니다.'],
 [/\.lock\s*\(/, 'weak_ptr::lock()', '대상이 살아 있으면 공유 소유권을 얻고, 그렇지 않으면 빈 shared_ptr을 반환합니다.'],
 [/\.expired\s*\(/, 'weak_ptr::expired()', '관찰 중인 객체의 공유 소유자가 모두 사라졌는지 확인합니다. 실제 접근은 lock()의 결과를 확인합니다.'],
 [/\.value_or\s*\(/, 'optional::value_or(대안)', '값이 있으면 그 값을, 없으면 대안 값을 반환합니다.'],
 [/std::views::filter/, 'std::views::filter(조건)', '조건에 맞는 원소를 순회하는 뷰를 만듭니다. 비소유 원본을 사용하는 경우 원본의 수명과 무효화를 확인합니다.'],
 [/std::span\s*</, 'std::span<T>', '연속된 원소의 비소유 뷰입니다. 소유 데이터의 수명이 끝나거나 재할당되면 사용할 수 없을 수 있습니다.'],
 [/\.substr\s*\(/, 'string_view::substr(시작, 길이)', '시작 위치와 최대 길이에 해당하는 부분 뷰를 반환합니다. 원본 문자를 복사하지 않습니다.'],
 [/std::runtime_error/, 'std::runtime_error', '실행 중 발생한 오류를 나타내는 표준 예외 타입입니다.'],
 [/static_assert\s*\(/, 'static_assert(조건)', '컴파일 시 조건을 검사하고 거짓이면 컴파일 오류를 발생시킵니다.'],
 [/std::integral\s+/, 'std::integral', '타입이 정수 타입인지 나타내는 C++20 표준 concept입니다.']
];

export function cppReferences(lesson) {
 const code = lesson.solution || lesson.code || '';
 return entries.filter(([pattern]) => pattern.test(code)).map(([,name,description]) => [name,description]);
}
