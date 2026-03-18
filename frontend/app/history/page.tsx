import type { HistoryItem } from "@/lib/types";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { fetchHistory } from "@/lib/api";

export default async function HistoryPage() {
  let history: HistoryItem[] = [];
  try {
    history = await fetchHistory();
  } catch {
    history = [];
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-16">
        <Badge className="bg-cyan-400/10 text-cyan-200">History Overview</Badge>
        <h1 className="mt-4 text-4xl font-semibold text-white">Recent migration runs</h1>
        <div className="mt-8 space-y-4">
          {history.map((item) => (
            <Card key={item.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    {item.source_language} {"->"} {item.target_language} {"|"} {item.migration_mode}
                  </p>
                </div>
                <Badge>{item.status}</Badge>
              </div>
            </Card>
          ))}
          {!history.length ? (
            <Card className="p-5 text-sm text-slate-400">No migration history is available yet.</Card>
          ) : null}
        </div>
      </section>
      <Footer />
    </main>
  );
}
