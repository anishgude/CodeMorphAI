"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";

const steps = [
  "Input code or upload a file",
  "Parse structure and infer language",
  "Construct migration prompts",
  "Generate translated code and tests",
  "Validate equivalence and risks",
  "Review optimization suggestions",
];

export function HowItWorks() {
  return (
    <section className="section-divider mx-auto max-w-7xl px-6 py-20">
      <Card className="overflow-hidden p-8 md:p-10">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.26em] text-amber-300">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">A structured migration pipeline, not a single prompt.</h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            CodeMorph stages analysis, prompt construction, generation, validation, and optimization into a reviewable,
            recruiter-friendly flow.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-6">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
              className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                {index < steps.length - 1 ? <ArrowRight className="h-4 w-4 text-slate-500" /> : null}
              </div>
              <div className="mt-5 text-sm leading-6 text-slate-300">{step}</div>
            </motion.div>
          ))}
        </div>
      </Card>
    </section>
  );
}
