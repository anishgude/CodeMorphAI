"use client";

import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { AlertCircle, ArrowRightLeft, GaugeCircle, Sparkles, Upload } from "lucide-react";

import { CodeEditorPanel } from "@/components/code-editor-panel";
import { Footer } from "@/components/footer";
import { HistoryList } from "@/components/history-list";
import { LoadingOverlay } from "@/components/loading-overlay";
import { MigrationControls } from "@/components/migration-controls";
import { Navbar } from "@/components/navbar";
import { ResultTabs } from "@/components/result-tabs";
import { useToast } from "@/components/toaster";
import { ValidationScoreCard } from "@/components/validation-score-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  explainMigration,
  fetchHistory,
  fetchRun,
  generateTests,
  migrateCode,
  optimizeCode,
  validateMigration,
} from "@/lib/api";
import { demoSnippets } from "@/lib/demo-snippets";
import {
  ExplanationResponse,
  HistoryItem,
  MigrationMode,
  OptimizeResponse,
  TestsResponse,
  ValidationResponse,
} from "@/lib/types";

export default function DashboardPage() {
  const { push } = useToast();
  const [sourceCode, setSourceCode] = useState(demoSnippets[0].code);
  const [migratedCode, setMigratedCode] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState(demoSnippets[0].language);
  const [targetLanguage, setTargetLanguage] = useState(demoSnippets[0].target);
  const [mode, setMode] = useState<MigrationMode>("idiomatic rewrite");
  const [summary, setSummary] = useState("");
  const [semanticDiff, setSemanticDiff] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [tests, setTests] = useState<TestsResponse | null>(null);
  const [validation, setValidation] = useState<ValidationResponse | null>(null);
  const [explanation, setExplanation] = useState<ExplanationResponse | null>(null);
  const [optimization, setOptimization] = useState<OptimizeResponse | null>(null);
  const [error, setError] = useState("");
  const [loadingLabel, setLoadingLabel] = useState("");
  const [activeRunId, setActiveRunId] = useState<number | null>(null);

  useEffect(() => {
    void refreshHistory();
  }, []);

  async function refreshHistory() {
    try {
      const items = await fetchHistory();
      setHistory(items);
    } catch {
      setHistory([]);
    }
  }

  function validateInputs(requireMigrated = false) {
    if (!sourceCode.trim()) {
      setError("Paste code or load a demo snippet before running a migration.");
      return false;
    }
    if (sourceLanguage && sourceLanguage === targetLanguage) {
      setError("Source and target languages must differ.");
      return false;
    }
    if (requireMigrated && !migratedCode.trim()) {
      setError("Generate migrated code before running that action.");
      return false;
    }
    setError("");
    return true;
  }

  async function handleMigrate() {
    if (!validateInputs()) return;
    setLoadingLabel("Migrating code");
    try {
      const response = await migrateCode({
        source_code: sourceCode,
        source_language: sourceLanguage || undefined,
        target_language: targetLanguage,
        migration_mode: mode,
      });
      setMigratedCode(response.migrated_code);
      setSummary(response.summary);
      setSemanticDiff(response.semantic_diff);
      setActiveRunId(response.run_id);
      await refreshHistory();
      push("Migration complete", "Translated code and summary updated.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Migration failed.");
      push("Migration failed", cause instanceof Error ? cause.message : "Migration failed.");
    } finally {
      setLoadingLabel("");
    }
  }

  async function handleTests() {
    if (!validateInputs(true)) return;
    setLoadingLabel("Generating tests");
    try {
      setTests(
        await generateTests({
          source_code: sourceCode,
          migrated_code: migratedCode,
          source_language: sourceLanguage,
          target_language: targetLanguage,
        }),
      );
      push("Tests generated", "Behavior-oriented test output is ready.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Test generation failed.");
      push("Test generation failed", cause instanceof Error ? cause.message : "Test generation failed.");
    } finally {
      setLoadingLabel("");
    }
  }

  async function handleValidate() {
    if (!validateInputs(true)) return;
    setLoadingLabel("Validating migration");
    try {
      setValidation(
        await validateMigration({
          source_code: sourceCode,
          migrated_code: migratedCode,
          source_language: sourceLanguage,
          target_language: targetLanguage,
        }),
      );
      push("Validation finished", "Score, risks, and recommendations were refreshed.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Validation failed.");
      push("Validation failed", cause instanceof Error ? cause.message : "Validation failed.");
    } finally {
      setLoadingLabel("");
    }
  }

  async function handleExplain() {
    if (!validateInputs(true)) return;
    setLoadingLabel("Explaining changes");
    try {
      setExplanation(
        await explainMigration({
          source_code: sourceCode,
          migrated_code: migratedCode,
          source_language: sourceLanguage,
          target_language: targetLanguage,
        }),
      );
      push("Explanation generated", "Architectural and syntax changes are now available.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Explanation failed.");
      push("Explanation failed", cause instanceof Error ? cause.message : "Explanation failed.");
    } finally {
      setLoadingLabel("");
    }
  }

  async function handleOptimize() {
    if (!validateInputs(true)) return;
    setLoadingLabel("Suggesting optimizations");
    try {
      setOptimization(
        await optimizeCode({
          migrated_code: migratedCode,
          target_language: targetLanguage,
        }),
      );
      push("Optimizations ready", "Safe refinement suggestions were generated.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Optimization failed.");
      push("Optimization failed", cause instanceof Error ? cause.message : "Optimization failed.");
    } finally {
      setLoadingLabel("");
    }
  }

  async function handleHistorySelect(runId: number) {
    setLoadingLabel("Loading historical run");
    try {
      const item = await fetchRun(runId);
      setActiveRunId(runId);
      setSourceCode(item.source_code);
      setMigratedCode(item.migrated_code);
      setSourceLanguage(item.source_language);
      setTargetLanguage(item.target_language);
      setSummary(item.notes || item.title);
      setSemanticDiff(item.semantic_diff ? item.semantic_diff.split("\n").map((line) => line.replace(/^- /, "")) : []);
      setTests(item.generated_tests ? { generated_tests: item.generated_tests, test_strategy: [] } : null);
      setExplanation(
        item.explanation
          ? { explanation: item.explanation, architectural_changes: [], syntax_changes: [], runtime_considerations: [] }
          : null,
      );
      setValidation(
        item.validation_report_json
          ? JSON.parse(item.validation_report_json)
          : null,
      );
      setOptimization(
        item.optimization_report_json
          ? {
              optimized_code: item.migrated_code,
              ...JSON.parse(item.optimization_report_json),
            }
          : null,
      );
      push("Run loaded", "Historical migration artifacts were restored into the workspace.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Failed to load history item.");
      push("History load failed", cause instanceof Error ? cause.message : "Failed to load history item.");
    } finally {
      setLoadingLabel("");
    }
  }

  function handleClearHistory() {
    setHistory([]);
    setActiveRunId(null);
    push("History cleared", "The local run history list was cleared from this workspace view.");
  }

  function handleUseExample() {
    const next = demoSnippets[Math.floor(Math.random() * demoSnippets.length)];
    setSourceCode(next.code);
    setSourceLanguage(next.language);
    setTargetLanguage(next.target);
    setError("");
    push("Example loaded", `${next.title} was inserted into the editor.`);
  }

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const content = await file.text();
    setSourceCode(content);
    setError("");
    push("File loaded", `${file.name} was loaded into the source editor.`);
  }

  return (
    <main className="page-shell min-h-screen">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 grid gap-5 xl:grid-cols-[1fr_auto] xl:items-end">
          <div>
            <Badge className="bg-cyan-400/10 text-cyan-100">Migration Dashboard</Badge>
            <h1 className="mt-4 text-balance text-4xl font-semibold text-white md:text-5xl">
              Translate code with validation, tests, and engineering context.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
              Paste code, load a demo, or upload a supported source file. Results stay visible while new runs process.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="h-4 w-4 text-cyan-300" />
                {sourceLanguage || "auto"} {"->"} {targetLanguage}
              </div>
            </div>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 transition hover:bg-white/[0.08]">
              <Upload className="h-4 w-4" />
              Upload file
              <input
                type="file"
                className="hidden"
                accept=".py,.js,.ts,.java,.cpp,.cs,.go,.rs"
                onChange={handleUpload}
              />
            </label>
          </div>
        </div>
        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Current mode", value: mode, icon: Sparkles, tone: "text-cyan-300" },
            {
              label: "Validation",
              value: validation ? `${validation.validation_score}/100` : "Awaiting run",
              icon: GaugeCircle,
              tone: "text-emerald-300",
            },
            {
              label: "History entries",
              value: String(history.length),
              icon: ArrowRightLeft,
              tone: "text-amber-300",
            },
            {
              label: "Artifacts ready",
              value: String([migratedCode, explanation, tests, validation, optimization].filter(Boolean).length),
              icon: Sparkles,
              tone: "text-cyan-300",
            },
          ].map(({ label, value, icon: Icon, tone }) => (
            <Card key={label} className="p-5">
              <div className="flex items-center justify-between">
                <p className="surface-label">{label}</p>
                <Icon className={`h-4 w-4 ${tone}`} />
              </div>
              <p className="mt-4 text-lg font-semibold text-white">{value}</p>
            </Card>
          ))}
        </div>

        <div className="relative space-y-6">
          {loadingLabel ? <LoadingOverlay label={loadingLabel} /> : null}
          <MigrationControls
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            mode={mode}
            setSourceLanguage={setSourceLanguage}
            setTargetLanguage={setTargetLanguage}
            setMode={setMode}
            onMigrate={handleMigrate}
            onTests={handleTests}
            onValidate={handleValidate}
            onExplain={handleExplain}
            onOptimize={handleOptimize}
            onExample={handleUseExample}
            isBusy={Boolean(loadingLabel)}
          />

          {error ? (
            <Card className="border-destructive/40 bg-red-500/5 p-4">
              <div className="flex items-center gap-3 text-sm text-red-200">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            </Card>
          ) : null}

          <div className="grid gap-6 xl:grid-cols-[1fr_1fr_320px]">
            <CodeEditorPanel
              title="Source Code"
              language={sourceLanguage || "plaintext"}
              value={sourceCode}
              onChange={setSourceCode}
              status="Paste code, upload a file, or load a demo snippet"
            />
            <CodeEditorPanel
              title="Target Output"
              language={targetLanguage}
              value={migratedCode}
              readOnly
              status="Generated output remains visible during refresh"
            />
            <div className="space-y-6">
              <ValidationScoreCard report={validation} />
              <HistoryList
                history={history}
                onSelect={handleHistorySelect}
                onClear={handleClearHistory}
                activeRunId={activeRunId}
              />
            </div>
          </div>

          <ResultTabs
            migratedCode={migratedCode}
            summary={summary}
            semanticDiff={semanticDiff}
            tests={tests}
            validation={validation}
            explanation={explanation}
            optimization={optimization}
            history={history}
          />

          <div className="flex justify-end">
            <Button
              variant="ghost"
              onClick={() => {
                if (window.confirm("Reset the current editors and generated artifacts?")) {
                  setSourceCode("");
                  setMigratedCode("");
                  setSummary("");
                  setSemanticDiff([]);
                  setTests(null);
                  setValidation(null);
                  setExplanation(null);
                  setOptimization(null);
                  setError("");
                }
              }}
            >
              Reset Workspace
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
