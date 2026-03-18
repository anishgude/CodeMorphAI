export const demoSnippets = [
  {
    id: "python-fib",
    title: "Python Fibonacci",
    language: "python",
    target: "javascript",
    code: `def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
`,
  },
  {
    id: "javascript-class",
    title: "JavaScript Class",
    language: "javascript",
    target: "python",
    code: `class Cart {
  constructor(items = []) {
    this.items = items;
  }

  add(item) {
    this.items.push(item);
    return this.items.length;
  }
}
`,
  },
  {
    id: "java-utility",
    title: "Java Utility Method",
    language: "java",
    target: "python",
    code: `public class MathUtil {
    public static int clamp(int value, int min, int max) {
        return Math.max(min, Math.min(max, value));
    }
}
`,
  },
  {
    id: "cpp-algorithm",
    title: "C++ Algorithm",
    language: "cpp",
    target: "python",
    code: `#include <vector>
#include <algorithm>

int maxValue(const std::vector<int>& values) {
    return *std::max_element(values.begin(), values.end());
}
`,
  },
];
