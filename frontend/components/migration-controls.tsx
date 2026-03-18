"use client";

import { FlaskConical, Lightbulb, ScrollText, ShieldCheck, WandSparkles } from "lucide-react";

import { LanguageSelector } from "@/components/language-selector";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MigrationMode } from "@/lib/types";

const modes: MigrationMode[] = [
  "direct translation",
  "idiomatic rewrite",
  "performance-focused rewrite",
  "safe/minimal rewrite",
];

export function MigrationControls({
  sourceLanguage,
  targetLanguage,
  mode,
  setSourceLanguage,
  setTargetLanguage,
  setMode,
  onMigrate,
  onTests,
  onValidate,
  onExplain,
  onOptimize,
  onExample,
  isBusy,
}: {
  sourceLanguage: string;
  targetLanguage: string;
  mode: MigrationMode;
  setSourceLanguage: (value: string) => void;
  setTargetLanguage: (value: string) => void;
  setMode: (value: MigrationMode) => void;
  onMigrate: () => void;
  onTests: () => void;
  onValidate: () => void;
  onExplain: () => void;
  onOptimize: () => void;
  onExample: () => void;
  isBusy: boolean;
}) {
  return (
    <Card className="overflow-hidden p-5">
      <div className="grid gap-5 xl:grid-cols-[1fr_auto]">
        <div>
          <p className="surface-label">Migration controls</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Configure the translation pass</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Choose languages, decide how opinionated the rewrite should be, then generate artifacts without leaving the workspace.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 self-start">
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300">
            Keep outputs visible during refresh
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300">
            SQLite-backed run history
          </div>
        </div>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <div className="space-y-2">
          <p className="surface-label">Source</p>
          <LanguageSelector
            value={sourceLanguage}
            onValueChange={setSourceLanguage}
            placeholder="Source language"
            includeAuto
          />
        </div>
        <div className="space-y-2">
          <p className="surface-label">Target</p>
          <LanguageSelector
            value={targetLanguage}
            onValueChange={setTargetLanguage}
            placeholder="Target language"
          />
        </div>
        <div className="space-y-2">
          <p className="surface-label">Mode</p>
          <Select value={mode} onValueChange={(value) => setMode(value as MigrationMode)}>
            <SelectTrigger>
              <SelectValue placeholder="Migration mode" />
            </SelectTrigger>
            <SelectContent>
              {modes.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <p className="surface-label">Quick start</p>
          <Button variant="outline" className="w-full" onClick={onExample}>
            Use Example
          </Button>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <Button className="relative w-full justify-center" onClick={onMigrate} disabled={isBusy}>
          <WandSparkles className="absolute left-4 h-4 w-4" />
          <span className="mx-auto">Migrate Code</span>
        </Button>
        <Button variant="secondary" className="relative w-full justify-center" onClick={onTests} disabled={isBusy}>
          <FlaskConical className="absolute left-4 h-4 w-4" />
          <span className="mx-auto">Generate Tests</span>
        </Button>
        <Button variant="secondary" className="relative w-full justify-center" onClick={onValidate} disabled={isBusy}>
          <ShieldCheck className="absolute left-4 h-4 w-4" />
          <span className="mx-auto">Validate Migration</span>
        </Button>
        <Button variant="secondary" className="relative w-full justify-center" onClick={onExplain} disabled={isBusy}>
          <ScrollText className="absolute left-4 h-4 w-4" />
          <span className="mx-auto">Explain Changes</span>
        </Button>
        <Button variant="secondary" className="relative w-full justify-center" onClick={onOptimize} disabled={isBusy}>
          <Lightbulb className="absolute left-4 h-4 w-4" />
          <span className="mx-auto">Suggest Optimizations</span>
        </Button>
      </div>
    </Card>
  );
}
