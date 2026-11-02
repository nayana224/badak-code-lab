import { cppExpansionChecks } from './cpp-expansion-support.js';
// The original program is run separately; these checks call reusable functions
// with several small inputs in the same Docker sandbox. They are examples,
// not a proof of correctness or a security boundary.
const checks = {
 ...cppExpansionChecks,
 'cpp-function': `if (double_value(0) != 0 || double_value(-3) != -6 || double_value(5) != 10) return 1;`,
 'cpp-vector': `if (sum({}) != 0 || sum({-2, 5, -1}) != 2 || sum({7}) != 7) return 1;`,
 'cpp-search': `if (binary_search({}, 4) != -1 || binary_search({1, 3, 5, 7}, 1) != 0 || binary_search({1, 3, 5, 7}, 7) != 3 || binary_search({1, 3, 5, 7}, 4) != -1) return 1;`,
 'project-cpp-summary': `
  if (summarize({}).has_value()) return 1;
  auto a = summarize({-5, -2, -7});
  if (!a || a->count != 3 || a->total != -14 || a->maximum != -2) return 1;
  auto b = summarize({0, 4, -4, 4});
  if (!b || b->count != 4 || b->total != 4 || b->maximum != 4) return 1;`
};

export function cppExerciseCheck(id, code) {
 const check = checks[id];
 if (!check) return null;
 // Rename the learner's main so the same named functions can be called from
 // the test entry point. The reference code declares them at global scope.
 return `#define main badak_original_main\n${code}\n#undef main\nint main() {\n${check}\nreturn 0;\n}\n`;
}
