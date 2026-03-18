"use client";

import { motion } from "framer-motion";
import { Binary, BrainCircuit, Gauge, ShieldCheck, TestTube2 } from "lucide-react";

import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Multi-language migration",
    body: "Translate across practical source-target pairs with an extensible pipeline for future adapters.",
    icon: Binary,
  },
  {
    title: "Test generation",
    body: "Generate behavior-oriented tests that reflect expected outputs and edge-case coverage.",
    icon: TestTube2,
  },
  {
    title: "Validation reports",
    body: "Combine structural checks, equivalence reasoning, and review checkpoints into a confidence report.",
    icon: ShieldCheck,
  },
  {
    title: "AI explanations",
    body: "Summarize syntax changes, architectural shifts, and runtime considerations for the migration.",
    icon: BrainCircuit,
  },
  {
    title: "Optimization suggestions",
    body: "Surface safe performance and readability improvements without casually changing behavior.",
    icon: Gauge,
  },
];

export function FeatureGrid() {
  return (
    <section className="section-divider mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Capabilities</p>
        <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Built like a serious AI developer tool</h2>
        <p className="mt-4 text-base leading-7 text-slate-400">
          Every artifact is designed for reviewability: migration output, technical explanations, validation scoring,
          test generation, and optimization guidance.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {features.map(({ title, body, icon: Icon }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
          >
            <Card className="group h-full p-6 transition duration-300 hover:-translate-y-1">
              <div className="mb-5 inline-flex rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3">
                <Icon className="h-5 w-5 text-cyan-300 transition group-hover:scale-110" />
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
