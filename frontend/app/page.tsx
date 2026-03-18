import { ArchitectureFlow } from "@/components/architecture-flow";
import { FeatureGrid } from "@/components/feature-grid";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="page-shell min-h-screen">
      <Navbar />
      <HeroSection />
      <FeatureGrid />
      <HowItWorks />
      <section className="section-divider mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 max-w-3xl">
          <Badge className="bg-cyan-400/10 text-cyan-100">Architecture teaser</Badge>
          <h2 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">A pipeline that feels engineered, not improvised.</h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            Parsing, prompt construction, migration, validation, and optimization are intentionally separated so the product reads like a serious AI systems project.
          </p>
        </div>
        <ArchitectureFlow />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Prompt orchestration", "Separate builders for migration, explanations, tests, validation, and optimizations."],
            ["Artifact persistence", "Run history stores generated outputs for fast comparison and review."],
            ["Future-ready", "Async jobs and richer parser integrations can be added without changing the UI surface."],
          ].map(([title, body]) => (
            <Card key={title} className="p-6">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{body}</p>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
