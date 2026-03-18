export type BenchmarkStatus = "Pass" | "Review" | "Warning";
export type BenchmarkConfidence = "High" | "Medium" | "Low";

export interface BenchmarkCase {
  id: string;
  caseName: string;
  sourceLanguage: string;
  targetLanguage: string;
  languagePair: string;
  validationScore: number;
  confidence: BenchmarkConfidence;
  generatedTests: number;
  runtimeMs: number;
  status: BenchmarkStatus;
  reviewNote: string;
}

export interface BenchmarkMetric {
  label: string;
  value: string;
  detail: string;
}

export interface BenchmarkPairAggregate {
  languagePair: string;
  averageValidation: number;
  successRate: number;
  averageRuntime: number;
  averageConfidence: number;
  cases: number;
}

const confidenceScore: Record<BenchmarkConfidence, number> = {
  High: 92,
  Medium: 76,
  Low: 58,
};

export const benchmarkCases: BenchmarkCase[] = [
  {
    id: "fib-py-js",
    caseName: "Fibonacci recursion",
    sourceLanguage: "Python",
    targetLanguage: "JavaScript",
    languagePair: "Python -> JavaScript",
    validationScore: 94,
    confidence: "High",
    generatedTests: 6,
    runtimeMs: 1180,
    status: "Pass",
    reviewNote: "Recursive flow and base cases preserved with clean JS export semantics.",
  },
  {
    id: "binary-js-py",
    caseName: "Binary search helper",
    sourceLanguage: "JavaScript",
    targetLanguage: "Python",
    languagePair: "JavaScript -> Python",
    validationScore: 91,
    confidence: "High",
    generatedTests: 7,
    runtimeMs: 1260,
    status: "Pass",
    reviewNote: "Loop boundaries and off-by-one behavior remained stable across translation.",
  },
  {
    id: "utility-java-py",
    caseName: "String utility method",
    sourceLanguage: "Java",
    targetLanguage: "Python",
    languagePair: "Java -> Python",
    validationScore: 88,
    confidence: "Medium",
    generatedTests: 5,
    runtimeMs: 1520,
    status: "Review",
    reviewNote: "Nullability assumptions need human review around optional input handling.",
  },
  {
    id: "sort-cpp-py",
    caseName: "Sorting helper",
    sourceLanguage: "C++",
    targetLanguage: "Python",
    languagePair: "C++ -> Python",
    validationScore: 86,
    confidence: "Medium",
    generatedTests: 6,
    runtimeMs: 1640,
    status: "Review",
    reviewNote: "Index-heavy flow is preserved, but iterator-to-list semantics require inspection.",
  },
  {
    id: "transformer-py-go",
    caseName: "Data transformer",
    sourceLanguage: "Python",
    targetLanguage: "Go",
    languagePair: "Python -> Go",
    validationScore: 83,
    confidence: "Medium",
    generatedTests: 8,
    runtimeMs: 1890,
    status: "Review",
    reviewNote: "Struct shaping is correct, though nil and zero-value behavior should be checked manually.",
  },
  {
    id: "class-py-js",
    caseName: "Class-based model",
    sourceLanguage: "Python",
    targetLanguage: "JavaScript",
    languagePair: "Python -> JavaScript",
    validationScore: 92,
    confidence: "High",
    generatedTests: 7,
    runtimeMs: 1330,
    status: "Pass",
    reviewNote: "Constructor behavior and instance methods translated cleanly into ES class syntax.",
  },
  {
    id: "loops-js-py",
    caseName: "Loop-heavy utility",
    sourceLanguage: "JavaScript",
    targetLanguage: "Python",
    languagePair: "JavaScript -> Python",
    validationScore: 89,
    confidence: "High",
    generatedTests: 6,
    runtimeMs: 1210,
    status: "Pass",
    reviewNote: "Imperative loops and accumulator behavior are consistent after migration.",
  },
  {
    id: "parser-java-py",
    caseName: "Edge-case parser",
    sourceLanguage: "Java",
    targetLanguage: "Python",
    languagePair: "Java -> Python",
    validationScore: 74,
    confidence: "Low",
    generatedTests: 4,
    runtimeMs: 2110,
    status: "Warning",
    reviewNote: "Exception-path handling and token boundary logic show likely semantic risk.",
  },
  {
    id: "collections-py-go",
    caseName: "Collection normalizer",
    sourceLanguage: "Python",
    targetLanguage: "Go",
    languagePair: "Python -> Go",
    validationScore: 81,
    confidence: "Medium",
    generatedTests: 6,
    runtimeMs: 1820,
    status: "Review",
    reviewNote: "Map ordering assumptions and default values deserve targeted regression checks.",
  },
  {
    id: "io-cpp-py",
    caseName: "File parsing routine",
    sourceLanguage: "C++",
    targetLanguage: "Python",
    languagePair: "C++ -> Python",
    validationScore: 79,
    confidence: "Low",
    generatedTests: 5,
    runtimeMs: 2050,
    status: "Warning",
    reviewNote: "Resource handling translated, but stream-state edge cases remain uncertain.",
  },
  {
    id: "api-py-js",
    caseName: "API response formatter",
    sourceLanguage: "Python",
    targetLanguage: "JavaScript",
    languagePair: "Python -> JavaScript",
    validationScore: 90,
    confidence: "High",
    generatedTests: 6,
    runtimeMs: 1280,
    status: "Pass",
    reviewNote: "Object shaping and conditional branches match the original formatter behavior.",
  },
  {
    id: "math-java-py",
    caseName: "Numeric helper suite",
    sourceLanguage: "Java",
    targetLanguage: "Python",
    languagePair: "Java -> Python",
    validationScore: 87,
    confidence: "Medium",
    generatedTests: 7,
    runtimeMs: 1490,
    status: "Review",
    reviewNote: "Type coercion is mostly correct, but integer division semantics need review.",
  },
];

export const benchmarkLastUpdated = "March 16, 2026";

export function getLanguagePairOptions(cases: BenchmarkCase[]) {
  return ["All pairs", ...Array.from(new Set(cases.map((item) => item.languagePair)))];
}

export function getBenchmarkMetrics(cases: BenchmarkCase[]): BenchmarkMetric[] {
  const total = cases.length || 1;
  const passCount = cases.filter((item) => item.status === "Pass").length;
  const avgValidation = Math.round(cases.reduce((sum, item) => sum + item.validationScore, 0) / total);
  const avgConfidence = Math.round(cases.reduce((sum, item) => sum + confidenceScore[item.confidence], 0) / total);
  const avgRuntime = Math.round(cases.reduce((sum, item) => sum + item.runtimeMs, 0) / total);
  const pairsCovered = new Set(cases.map((item) => item.languagePair)).size;

  return [
    {
      label: "Overall success rate",
      value: `${Math.round((passCount / total) * 100)}%`,
      detail: `${passCount} of ${cases.length} runs landed as full passes.`,
    },
    {
      label: "Average validation score",
      value: `${avgValidation}/100`,
      detail: "Semantic preservation signal averaged across the benchmark suite.",
    },
    {
      label: "Average confidence",
      value: `${avgConfidence}%`,
      detail: "Confidence normalizes High, Medium, and Low into a single benchmark index.",
    },
    {
      label: "Average runtime",
      value: `${(avgRuntime / 1000).toFixed(2)}s`,
      detail: "End-to-end migration latency across representative examples.",
    },
    {
      label: "Language pairs covered",
      value: `${pairsCovered}`,
      detail: "Representative migrations spanning the current supported conversion set.",
    },
    {
      label: "Benchmark cases run",
      value: `${cases.length}`,
      detail: "Curated cases mixing clean passes, review items, and warning scenarios.",
    },
  ];
}

export function getPairAggregates(cases: BenchmarkCase[]): BenchmarkPairAggregate[] {
  const grouped = Array.from(
    cases.reduce((map, item) => {
      const existing = map.get(item.languagePair) ?? [];
      existing.push(item);
      map.set(item.languagePair, existing);
      return map;
    }, new Map<string, BenchmarkCase[]>()),
  );

  return grouped
    .map(([languagePair, items]) => {
      const total = items.length;
      const averageValidation = Math.round(items.reduce((sum, item) => sum + item.validationScore, 0) / total);
      const averageRuntime = Math.round(items.reduce((sum, item) => sum + item.runtimeMs, 0) / total);
      const averageConfidence = Math.round(
        items.reduce((sum, item) => sum + confidenceScore[item.confidence], 0) / total,
      );
      const successRate = Math.round((items.filter((item) => item.status === "Pass").length / total) * 100);

      return {
        languagePair,
        averageValidation,
        successRate,
        averageRuntime,
        averageConfidence,
        cases: total,
      };
    })
    .sort((a, b) => b.averageValidation - a.averageValidation);
}

export function getFlaggedCases(cases: BenchmarkCase[]) {
  return cases
    .filter((item) => item.status !== "Pass")
    .sort((a, b) => a.validationScore - b.validationScore)
    .slice(0, 3);
}
