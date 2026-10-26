#include <iostream>
#include <vector>
#include <stdexcept>
static int _lab_count = 0;
[[maybe_unused]] static void _lab_begin() {
    if (++_lab_count > 128) throw std::runtime_error("trace limit: 128 steps");
}
[[maybe_unused]] static void _lab_array(const std::vector<int>& values, int active, int total, int line) {
    _lab_begin();
    if (values.size() > 32) throw std::runtime_error("array trace limit: 32 items");
    std::cout << "__BADAK_TRACE__{\"kind\":\"array\",\"values\":[";
    for (size_t i=0; i<values.size(); ++i) { if(i) std::cout << ','; std::cout << values[i]; }
    std::cout << "],\"active\":" << active << ",\"total\":" << total << ",\"line\":" << line << "}" << std::endl;
}
[[maybe_unused]] static void _lab_search(const std::vector<int>& values, int left, int right, int mid, int target, int line) {
    _lab_begin();
    if (values.size() > 32) throw std::runtime_error("search trace limit: 32 items");
    std::cout << "__BADAK_TRACE__{\"kind\":\"search\",\"values\":[";
    for (size_t i=0; i<values.size(); ++i) { if(i) std::cout << ','; std::cout << values[i]; }
    std::cout << "],\"left\":" << left << ",\"right\":" << right << ",\"mid\":" << mid << ",\"target\":" << target << ",\"line\":" << line << "}" << std::endl;
}
#define record_array(values, active, total) _lab_array(values, active, total, __LINE__)
#define record_search(values, left, right, mid, target) _lab_search(values, left, right, mid, target, __LINE__)
[[maybe_unused]] static void _lab_sort(const std::vector<int>& values, int first, int second, bool swapped, int line) {
    _lab_begin();
    if (values.size() > 32) throw std::runtime_error("sort trace limit: 32 items");
    std::cout << "__BADAK_TRACE__{\"kind\":\"sort\",\"values\":[";
    for (size_t i=0; i<values.size(); ++i) { if(i) std::cout << ','; std::cout << values[i]; }
    std::cout << "],\"first\":" << first << ",\"second\":" << second << ",\"swapped\":" << (swapped ? "true" : "false") << ",\"line\":" << line << "}" << std::endl;
}
#define record_sort(values, first, second, swapped) _lab_sort(values, first, second, swapped, __LINE__)
