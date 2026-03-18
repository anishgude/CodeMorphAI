"use client";

import { motion } from "framer-motion";
import { FileSearch, Files, ShieldCheck, TestTube2, WandSparkles } from "lucide-react";

import { CopyButton } from "@/components/copy-button";
import { DownloadButton } from "@/components/download-button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ExplanationResponse,
  HistoryItem,
  OptimizeResponse,
  TestsResponse,
  ValidationResponse,
} from "@/lib/types";

function TextList({ items }: { items: string[] }) {
  const normalizedItems = items
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return (
    <div className="space-y-3">
      {normalizedItems.map((item, index) => (
        <div
          key={`${index}-${item.slice(0, 40)}`}
          className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function SectionTitle({ label, title, description }: { label: string; title: string; description: string }) {
  return (
    <div className="mb-5">
      <p className="surface-label">{label}</p>
      <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}

export function ResultTabs({
  migratedCode,
  summary,
  semanticDiff,
  tests,
  validation,
  explanation,
  optimization,
  history,
}: {
  migratedCode: string;
  summary: string;
  semanticDiff: string[];
  tests: TestsResponse | null;
  validation: ValidationResponse | null;
  explanation: ExplanationResponse | null;
  optimization: OptimizeResponse | null;
  history: HistoryItem[];
}) {
  return (
    <Tabs defaultValue="code">
      <TabsList>
        <TabsTrigger value="code">Migrated Code</TabsTrigger>
        <TabsTrigger value="explanation">Explanation</TabsTrigger>
        <TabsTrigger value="diff">Semantic Diff</TabsTrigger>
        <TabsTrigger value="tests">Tests</TabsTrigger>
        <TabsTrigger value="validation">Validation Report</TabsTrigger>
        <TabsTrigger value="optimizations">Optimizations</TabsTrigger>
        <TabsTrigger value="history">Run History</TabsTrigger>
      </TabsList>
      <TabsContent value="code">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="surface-label">Artifact</p>
                <p className="mt-2 text-xl font-semibold text-white">Migrated output</p>
                <p className="mt-2 text-sm text-slate-400">{summary || "Generated code will appear here."}</p>
              </div>
              <div className="flex gap-2">
                <CopyButton value={migratedCode} />
                <DownloadButton value={migratedCode} filename="codemorph-output.txt" />
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-3">
              {["Target-language implementation", "Ready for review", "Persisted in history"].map((item) => (
                <div key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300">
                  {item}
                </div>
              ))}
            </div>
            <pre className="thin-scrollbar overflow-x-auto rounded-[24px] border border-white/10 bg-slate-950/72 p-5 text-sm text-cyan-100">
              {migratedCode || "// Your migrated code will appear here"}
            </pre>
          </Card>
        </motion.div>
      </TabsContent>
      <TabsContent value="explanation">
        <Card className="p-6">
          <SectionTitle
            label="Explanation"
            title="Architectural migration notes"
            description="Review the higher-level reasoning behind the translation before you ship or refactor further."
          />
          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm leading-7 text-slate-300">
              {explanation?.explanation || "Generate an explanation to inspect architectural and syntax changes."}
            </p>
          </div>
          {explanation ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <div className="mb-4 flex items-center gap-2 text-white">
                  <Files className="h-4 w-4 text-cyan-300" />
                  <span className="text-sm font-medium">Architectural shifts</span>
                </div>
                <TextList items={explanation.architectural_changes} />
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <div className="mb-4 flex items-center gap-2 text-white">
                  <FileSearch className="h-4 w-4 text-amber-300" />
                  <span className="text-sm font-medium">Syntax changes</span>
                </div>
                <TextList items={explanation.syntax_changes} />
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <div className="mb-4 flex items-center gap-2 text-white">
                  <ShieldCheck className="h-4 w-4 text-emerald-300" />
                  <span className="text-sm font-medium">Runtime considerations</span>
                </div>
                <TextList items={explanation.runtime_considerations} />
              </div>
            </div>
          ) : null}
        </Card>
      </TabsContent>
      <TabsContent value="diff">
        <Card className="p-6">
          <SectionTitle
            label="Semantic diff"
            title="Behavioral and technical deltas"
            description="Use this view to quickly scan what changed beyond syntax."
          />
          <div className="mt-4">
            <TextList items={semanticDiff.length ? semanticDiff : ["No semantic diff generated yet."]} />
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="tests">
        <Card className="p-6">
          <SectionTitle
            label="Tests"
            title="Generated verification suite"
            description="Behavior-oriented tests generated from the source and migrated implementations."
          />
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <pre className="thin-scrollbar overflow-x-auto rounded-[24px] border border-white/10 bg-slate-950/70 p-5 text-sm text-emerald-100">
              {tests?.generated_tests || "# Tests will appear here"}
            </pre>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-4 flex items-center gap-2 text-white">
                <TestTube2 className="h-4 w-4 text-emerald-300" />
                <span className="text-sm font-medium">Test strategy</span>
              </div>
              <TextList items={tests?.test_strategy ?? ["Generate tests to view the strategy."]} />
            </div>
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="validation">
        <Card className="p-6">
          <SectionTitle
            label="Validation"
            title="Equivalence and review report"
            description="Structural checks, risks, edge cases, and human review prompts gathered in one place."
          />
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-4 text-sm font-medium text-white">Detected risks</div>
              <TextList items={validation?.detected_risks ?? ["Run validation to inspect risks."]} />
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-4 text-sm font-medium text-white">Edge cases</div>
              <TextList items={validation?.edge_cases ?? ["Edge cases will appear here."]} />
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-4 text-sm font-medium text-white">Recommendations</div>
              <TextList items={validation?.recommendations ?? ["Recommendations will appear here."]} />
            </div>
          </div>
          {validation ? (
            <details className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <summary className="cursor-pointer text-sm font-medium text-white">Detailed review checkpoints</summary>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <TextList items={validation.high_risk_differences} />
                <TextList items={validation.manual_review_points} />
              </div>
            </details>
          ) : null}
        </Card>
      </TabsContent>
      <TabsContent value="optimizations">
        <Card className="p-6">
          <SectionTitle
            label="Optimizations"
            title="Safe refactor opportunities"
            description="Behavior-preserving cleanup and complexity guidance for the migrated target language."
          />
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <pre className="thin-scrollbar overflow-x-auto rounded-[24px] border border-white/10 bg-slate-950/70 p-5 text-sm text-amber-100">
              {optimization?.optimized_code || "// Optimized output will appear here"}
            </pre>
            <div className="space-y-4">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <div className="mb-4 flex items-center gap-2 text-white">
                  <WandSparkles className="h-4 w-4 text-amber-300" />
                  <span className="text-sm font-medium">Optimization notes</span>
                </div>
                <TextList items={optimization?.optimization_notes ?? ["No optimization notes yet."]} />
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <div className="mb-4 text-sm font-medium text-white">Complexity notes</div>
                <TextList items={optimization?.complexity_notes ?? ["No complexity notes yet."]} />
              </div>
            </div>
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="history">
        <Card className="p-6">
          <SectionTitle
            label="Run history"
            title="Stored migration sessions"
            description="Recent artifacts persisted to SQLite for reloading and review."
          />
          <div className="mt-4 space-y-3">
            {history.map((item) => (
              <div key={item.id} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">
                {item.title} {"|"} {item.source_language} {"->"} {item.target_language}
              </div>
            ))}
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
