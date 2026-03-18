export type MigrationMode =
  | "direct translation"
  | "idiomatic rewrite"
  | "performance-focused rewrite"
  | "safe/minimal rewrite";

export interface MigrationResponse {
  migrated_code: string;
  summary: string;
  semantic_diff: string[];
  notes: string[];
  run_id: number;
}

export interface ExplanationResponse {
  explanation: string;
  architectural_changes: string[];
  syntax_changes: string[];
  runtime_considerations: string[];
}

export interface ValidationResponse {
  validation_score: number;
  confidence_level: string;
  likely_equivalence: boolean;
  detected_risks: string[];
  edge_cases: string[];
  recommendations: string[];
  high_risk_differences: string[];
  missing_functionality_warnings: string[];
  manual_review_points: string[];
}

export interface OptimizeResponse {
  optimized_code: string;
  optimization_notes: string[];
  complexity_notes: string[];
}

export interface TestsResponse {
  generated_tests: string;
  test_strategy: string[];
}

export interface HistoryItem {
  id: number;
  created_at: string;
  source_language: string;
  target_language: string;
  migration_mode: string;
  title: string;
  status: string;
}

export interface HistoryDetail extends HistoryItem {
  source_code: string;
  migrated_code: string;
  explanation: string;
  semantic_diff: string;
  generated_tests: string;
  validation_report_json: string;
  optimization_report_json: string;
  notes: string;
}
