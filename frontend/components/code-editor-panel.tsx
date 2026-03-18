"use client";

import dynamic from "next/dynamic";
import { CircleDot, FileCode2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export function CodeEditorPanel({
  title,
  language,
  value,
  onChange,
  readOnly = false,
  status = readOnly ? "Generated output" : "Ready for input",
}: {
  title: string;
  language: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  status?: string;
}) {
  const lineCount = value ? value.split("\n").length : 0;
  const charCount = value.length;

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-2">
            <FileCode2 className="h-4 w-4 text-slate-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{title}</p>
            <p className="text-xs text-slate-400">{status}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge>{language || "auto"}</Badge>
          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-slate-400 sm:flex">
            <CircleDot className="h-3 w-3 text-emerald-300" />
            {readOnly ? "Output" : "Editable"}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-slate-500">
        <span>Monaco editor</span>
        <span>
          {lineCount} lines · {charCount} chars
        </span>
      </div>
      <div className="bg-[linear-gradient(180deg,rgba(2,6,23,0.68),rgba(15,23,42,0.46))] p-2">
        <MonacoEditor
          theme="vs-dark"
          language={language === "cpp" ? "cpp" : language || "plaintext"}
          value={value}
          onChange={(next) => onChange?.(next ?? "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            readOnly,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            automaticLayout: true,
            padding: { top: 18, bottom: 18 },
            lineNumbersMinChars: 3,
          }}
          height="460px"
        />
      </div>
    </Card>
  );
}
