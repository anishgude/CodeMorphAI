import { BarChart3 } from "lucide-react";

import { BenchmarkDashboard } from "@/components/benchmark-dashboard";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { benchmarkCases } from "@/lib/benchmark-data";

export default function BenchmarkPage() {
  return (
    <main className="page-shell min-h-screen">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Badge className="bg-cyan-400/10 text-cyan-100">Benchmark / Evaluation</Badge>
            <h1 className="mt-5 text-balance text-5xl font-semibold text-white">System-level quality signals for CodeMorph AI.</h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              This benchmark layer measures representative migrations across supported language pairs to show where the
              platform is strongest, where review is still needed, and how quickly the system performs overall.
            </p>
          </div>
          <Card className="max-w-xl p-5">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3">
                <BarChart3 className="h-5 w-5 text-cyan-300" />
              </div>
              <div>
                <p className="surface-label">Evaluation layer</p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Seeded benchmark data gives the product a measurable system view without introducing a heavyweight
                  offline evaluation pipeline.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <BenchmarkDashboard cases={benchmarkCases} />
      </section>
      <Footer />
    </main>
  );
}
