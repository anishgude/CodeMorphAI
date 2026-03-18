"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

import { Card } from "@/components/ui/card";
import { ValidationResponse } from "@/lib/types";

export function ValidationScoreCard({ report }: { report: ValidationResponse | null }) {
  const score = report?.validation_score ?? 0;
  const data = [{ name: "score", value: score, fill: "#67e8f9" }];
  const riskLabel = score >= 85 ? "Low risk" : score >= 70 ? "Review advised" : "High risk";

  return (
    <Card className="overflow-hidden p-5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="surface-label">Validation score</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{score} / 100</h3>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300">
          {riskLabel}
        </div>
      </div>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart innerRadius="70%" outerRadius="100%" barSize={16} data={data} startAngle={90} endAngle={-270}>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar background dataKey="value" />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-3">
          <p className="surface-label">Confidence</p>
          <p className="mt-2 text-sm font-medium text-white">{report?.confidence_level ?? "n/a"}</p>
        </div>
        <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-3">
          <p className="surface-label">Equivalence</p>
          <p className="mt-2 text-sm font-medium text-white">{report?.likely_equivalence ? "Likely" : "Unknown"}</p>
        </div>
      </div>
    </Card>
  );
}
