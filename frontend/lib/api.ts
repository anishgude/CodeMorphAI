import {
  ExplanationResponse,
  HistoryDetail,
  HistoryItem,
  MigrationMode,
  MigrationResponse,
  OptimizeResponse,
  TestsResponse,
  ValidationResponse,
} from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Request failed with ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function migrateCode(payload: {
  source_code: string;
  source_language?: string;
  target_language: string;
  migration_mode: MigrationMode;
}) {
  return request<MigrationResponse>("/api/migrate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function generateTests(payload: {
  source_code: string;
  migrated_code: string;
  source_language: string;
  target_language: string;
}) {
  return request<TestsResponse>("/api/generate-tests", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function validateMigration(payload: {
  source_code: string;
  migrated_code: string;
  source_language: string;
  target_language: string;
}) {
  return request<ValidationResponse>("/api/validate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function explainMigration(payload: {
  source_code: string;
  migrated_code: string;
  source_language: string;
  target_language: string;
}) {
  return request<ExplanationResponse>("/api/explain", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function optimizeCode(payload: { migrated_code: string; target_language: string }) {
  return request<OptimizeResponse>("/api/optimize", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchHistory() {
  return request<HistoryItem[]>("/api/history");
}

export async function fetchRun(runId: number) {
  return request<HistoryDetail>(`/api/history/${runId}`);
}
