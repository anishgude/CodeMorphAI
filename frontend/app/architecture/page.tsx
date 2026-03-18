import { ArchitectureFlow } from "@/components/architecture-flow";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const details = [
  {
    title: "Input and normalization",
    body: "CodeMorph accepts pasted code or file uploads, normalizes language choices, and blocks invalid same-language migrations.",
  },
  {
    title: "Analysis and prompt construction",
    body: "The backend extracts signatures, chunks large files, builds structured prompts, and keeps prompts modular per task.",
  },
  {
    title: "Artifact generation",
    body: "Migration, tests, explanations, validation, and optimization are exposed as focused services with normalized JSON responses.",
  },
];

export default function ArchitecturePage() {
  return (
    <main className="page-shell min-h-screen">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <Badge className="bg-cyan-400/10 text-cyan-100">System design</Badge>
          <h1 className="mt-5 text-balance text-5xl font-semibold text-white">A clean migration pipeline with room to scale.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            The app is intentionally modular: synchronous APIs today, structured service boundaries ready for background
            jobs, evaluation layers, and richer parser integrations later.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Pipeline stages", "7"],
            ["Stored artifacts", "6+"],
            ["Extensible direction", "Async jobs ready"],
          ].map(([label, value]) => (
            <Card key={label} className="p-5">
              <p className="surface-label">{label}</p>
              <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
            </Card>
          ))}
        </div>
        <div className="mt-12">
          <ArchitectureFlow />
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {details.map((item) => (
            <Card key={item.title} className="p-6">
              <h2 className="text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">{item.body}</p>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
