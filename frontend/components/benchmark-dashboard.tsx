"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock3,
  Download,
  Filter,
  FlaskConical,
  ShieldAlert,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  benchmarkLastUpdated,
  getBenchmarkMetrics,
  getFlaggedCases,
  getLanguagePairOptions,
  getPairAggregates,
  type BenchmarkCase,
} from "@/lib/benchmark-data";
import { cn } from "@/lib/utils";

function getStatusTone(status: BenchmarkCase["status"]) {
  if (status === "Pass") {
    return "border-emerald-400/25 bg-emerald-400/10 text-emerald-200";
  }
  if (status === "Review") {
    return "border-amber-300/25 bg-amber-300/10 text-amber-100";
  }
  return "border-rose-400/25 bg-rose-400/10 text-rose-100";
}

function getConfidenceTone(confidence: BenchmarkCase["confidence"]) {
  if (confidence === "High") {
    return "text-emerald-200";
  }
  if (confidence === "Medium") {
    return "text-amber-100";
  }
  return "text-rose-100";
}

export function BenchmarkDashboard({ cases }: { cases: BenchmarkCase[] }) {
  const [selectedPair, setSelectedPair] = useState("All pairs");

  const pairOptions = getLanguagePairOptions(cases);
  const filteredCases = selectedPair === "All pairs" ? cases : cases.filter((item) => item.languagePair === selectedPair);
  const metrics = getBenchmarkMetrics(filteredCases);
  const pairAggregates = getPairAggregates(filteredCases);
  const flaggedCases = getFlaggedCases(filteredCases);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(filteredCases, null, 2)], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `codemorph-benchmark-${selectedPair.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.json`;
    link.click();
    URL.revokeObjectURL(href);
  };

  return (
    <div className="mt-10 space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
            <Clock3 className="h-4 w-4 text-cyan-300" />
            Last updated: {benchmarkLastUpdated}
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
            <ShieldAlert className="h-4 w-4 text-amber-200" />
            Pass = stable, Review = inspect, Warning = manual attention
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="w-full sm:w-[240px]">
            <Select value={selectedPair} onValueChange={setSelectedPair}>
              <SelectTrigger>
                <span className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-slate-400" />
                  <SelectValue placeholder="Filter by pair" />
                </span>
              </SelectTrigger>
              <SelectContent>
                {pairOptions.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="secondary" className="h-12 rounded-2xl px-5" onClick={exportJson}>
            <Download className="h-4 w-4" />
            Export JSON
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
          >
            <Card className="relative overflow-hidden p-6">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
              <p className="surface-label">{metric.label}</p>
              <p className="mt-4 text-3xl font-semibold text-white">{metric.value}</p>
              <p className="mt-3 max-w-[32ch] text-sm leading-6 text-slate-400">{metric.detail}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge className="bg-cyan-400/10 text-cyan-100">Language pair performance</Badge>
              <h2 className="mt-4 text-2xl font-semibold text-white">Validation quality across representative migrations</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                Average validation score by language pair, derived from the curated benchmark suite used to evaluate
                CodeMorph&apos;s migration quality.
              </p>
            </div>
            <div className="hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-300 md:block">
              <BarChart3 className="h-5 w-5 text-cyan-300" />
            </div>
          </div>
          <div className="mt-8 h-[330px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pairAggregates} barSize={34}>
                <CartesianGrid vertical={false} stroke="rgba(148,163,184,0.12)" />
                <XAxis
                  dataKey="languagePair"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  cursor={{ fill: "rgba(148,163,184,0.06)" }}
                  contentStyle={{
                    background: "rgba(2, 6, 23, 0.92)",
                    border: "1px solid rgba(148,163,184,0.14)",
                    borderRadius: "18px",
                    color: "#e2e8f0",
                  }}
                />
                <Bar dataKey="averageValidation" radius={[12, 12, 8, 8]}>
                  {pairAggregates.map((item) => (
                    <Cell
                      key={item.languagePair}
                      fill={item.averageValidation >= 90 ? "#67e8f9" : item.averageValidation >= 82 ? "#38bdf8" : "#fbbf24"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <Badge className="bg-white/[0.06] text-slate-200">Runtime and confidence</Badge>
          <div className="mt-5 space-y-4">
            {pairAggregates.map((item) => (
              <div key={item.languagePair} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white">{item.languagePair}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{item.cases} benchmark cases</p>
                  </div>
                  <Badge className="bg-white/[0.06] text-slate-200">{item.successRate}% success</Badge>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                      <span>Average runtime</span>
                      <span>{(item.averageRuntime / 1000).toFixed(2)}s</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.06]">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-sky-400"
                        style={{ width: `${Math.min(100, (item.averageRuntime / 2400) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                      <span>Confidence index</span>
                      <span>{item.averageConfidence}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.06]">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-amber-300 to-emerald-300"
                        style={{ width: `${item.averageConfidence}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div>
              <h2 className="text-xl font-semibold text-white">Representative benchmark runs</h2>
              <p className="mt-1 text-sm text-slate-400">Curated examples spanning stable passes, reviews, and warning cases.</p>
            </div>
            <Badge className="bg-cyan-400/10 text-cyan-100">{filteredCases.length} rows</Badge>
          </div>
          <div className="thin-scrollbar overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/[0.03] text-slate-400">
                <tr>
                  {["Case", "Source", "Target", "Validation", "Confidence", "Tests", "Runtime", "Status"].map((label) => (
                    <th key={label} className="px-6 py-4 font-medium">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((item) => (
                  <tr key={item.id} className="border-t border-white/6 text-slate-200">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-white">{item.caseName}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{item.languagePair}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">{item.sourceLanguage}</td>
                    <td className="px-6 py-4">{item.targetLanguage}</td>
                    <td className="px-6 py-4 font-semibold text-white">{item.validationScore}/100</td>
                    <td className={cn("px-6 py-4 font-medium", getConfidenceTone(item.confidence))}>{item.confidence}</td>
                    <td className="px-6 py-4">{item.generatedTests}</td>
                    <td className="px-6 py-4">{(item.runtimeMs / 1000).toFixed(2)}s</td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.18em]",
                          getStatusTone(item.status),
                        )}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="p-6">
            <Badge className="bg-amber-300/10 text-amber-100">Review queue</Badge>
            <h2 className="mt-4 text-xl font-semibold text-white">Flagged cases that still need manual inspection</h2>
            <div className="mt-5 space-y-4">
              {flaggedCases.map((item) => (
                <div key={item.id} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-white">{item.caseName}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{item.languagePair}</p>
                    </div>
                    <Badge className={cn("border", getStatusTone(item.status))}>{item.status}</Badge>
                  </div>
                  <div className="mt-4 flex gap-4 text-sm">
                    <div>
                      <p className="surface-label">Validation</p>
                      <p className="mt-2 text-lg font-semibold text-white">{item.validationScore}/100</p>
                    </div>
                    <div>
                      <p className="surface-label">Confidence</p>
                      <p className={cn("mt-2 text-lg font-semibold", getConfidenceTone(item.confidence))}>{item.confidence}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-400">{item.reviewNote}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <Badge className="bg-white/[0.06] text-slate-200">Methodology</Badge>
            <h2 className="mt-4 text-xl font-semibold text-white">What this benchmark represents</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-400">
              <p className="flex gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                Representative source samples across the currently supported language pairs, covering recursion, loops,
                classes, parsers, and transformation utilities.
              </p>
              <p className="flex gap-3">
                <FlaskConical className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />
                Scores combine validation output, generated test depth, and confidence signals into a practical product
                evaluation layer rather than a research benchmark.
              </p>
              <p className="flex gap-3">
                <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-amber-200" />
                Review and warning rows are intentionally retained so the platform reads like a realistic AI engineering
                tool, not a perfect-demo dashboard.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
