"use client";

import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HistoryItem } from "@/lib/types";

export function HistoryList({
  history,
  onSelect,
  onClear,
  activeRunId,
}: {
  history: HistoryItem[];
  onSelect: (runId: number) => void;
  onClear: () => void;
  activeRunId?: number | null;
}) {
  return (
    <Card className="flex h-[360px] flex-col overflow-hidden p-4">
      <div className="mb-4 flex shrink-0 items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white">Run history</p>
          <p className="text-xs text-slate-400">Recent migrations stored in SQLite</p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="h-8 shrink-0 rounded-xl px-3 text-slate-100"
          onClick={onClear}
          disabled={!history.length}
        >
          <Trash2 className="h-3.5 w-3.5" />
          Clear History
        </Button>
      </div>
      <div className="thin-scrollbar -mr-1 flex-1 space-y-3 overflow-y-auto pr-3">
        {!history.length ? (
          <div className="rounded-[24px] border border-dashed border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-slate-400">
            No runs yet. Use a demo snippet or paste code to create the first migration.
          </div>
        ) : null}
        {history.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full rounded-[24px] border p-4 text-left transition duration-200 ${
              activeRunId === item.id
                ? "border-cyan-400/30 bg-cyan-400/10 shadow-[0_18px_40px_rgba(8,145,178,0.14)]"
                : "border-white/10 bg-white/[0.04] hover:-translate-y-0.5 hover:bg-white/[0.08]"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-white">{item.title}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {item.source_language} {"->"} {item.target_language} {"|"} {item.migration_mode}
                </p>
              </div>
              <Badge>{item.status}</Badge>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
            </p>
          </button>
        ))}
      </div>
    </Card>
  );
}
