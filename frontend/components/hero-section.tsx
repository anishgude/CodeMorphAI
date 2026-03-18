"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  WandSparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-10 lg:pb-24 lg:pt-16">
      <div className="aurora left-[-6rem] top-12 h-64 w-64 bg-cyan-400/30" />
      <div className="aurora bottom-6 right-[-2rem] h-72 w-72 bg-amber-300/18" />
      <div className="absolute inset-0 grid-lines opacity-20" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start xl:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-[38rem]"
        >
          <Badge className="mb-6 bg-cyan-400/10 text-cyan-100">AI Code Migration Engine</Badge>
          <h1 className="max-w-[12ch] text-5xl font-semibold tracking-tight text-white sm:max-w-[13ch] sm:text-[3.5rem] sm:leading-[1.04] xl:max-w-[13.5ch] xl:text-[3.75rem] xl:leading-[1.03] 2xl:max-w-[14ch] 2xl:text-[4rem] 2xl:leading-[1.02]">
            <span className="sm:hidden">
              Translate legacy code into modern stacks with validation, tests, and architecture-aware explanations.
            </span>
            <span className="hidden sm:block">
              Translate legacy code into modern stacks with validation, tests, and architecture-aware explanations.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-balance text-lg leading-8 text-slate-300">
            CodeMorph AI converts code across languages, preserves semantics, generates tests, validates likely equivalence,
            and surfaces technical tradeoffs in a polished developer workflow.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg" className="h-14 min-w-[176px] rounded-[26px] px-7">
              <Link href="/dashboard" className="flex w-full items-center justify-center gap-3">
                Try Demo
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 min-w-[176px] rounded-[26px] px-7">
              <Link href="/architecture" className="flex w-full items-center justify-center">
                View Architecture
              </Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {["Structured outputs", "Semantic validation", "Test generation"].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="relative flex items-start lg:min-h-[34rem] lg:justify-end lg:pt-7 lg:pl-4 xl:min-h-[36rem] xl:pt-8 xl:pl-6"
        >
          <div className="pointer-events-none absolute -inset-14 rounded-[64px] bg-[radial-gradient(circle_at_56%_44%,rgba(56,189,248,0.19),transparent_43%),radial-gradient(circle_at_72%_66%,rgba(34,211,238,0.12),transparent_34%)] blur-sm" />
          <Card className="relative w-full max-w-[36rem] overflow-hidden border-white/12 p-5 shadow-[0_28px_90px_rgba(2,8,23,0.45)] md:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.12),transparent_30%)]" />
            <div className="relative space-y-5">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-full border border-white/10 bg-white/[0.055] px-3.5 py-2 text-[11px] uppercase tracking-[0.18em] text-slate-200">
                {["Parser", "Migration", "Tests", "Validation"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <span>{item}</span>
                    <span className="font-semibold text-emerald-300">+</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="surface-label">Live migration preview</p>
                  <p className="mt-2 text-lg font-semibold text-white">Python to JavaScript, idiomatic mode</p>
                </div>
                <div className="rounded-full border border-amber-300/20 bg-amber-300/10 p-2">
                  <WandSparkles className="h-4 w-4 text-amber-300" />
                </div>
              </div>
              <div className="grid gap-4">
                <div className="rounded-[24px] border border-white/10 bg-slate-950/72 p-4">
                  <p className="surface-label">Source / Python</p>
                  <pre className="thin-scrollbar mt-3 overflow-x-auto text-sm text-cyan-100">{`def fibonacci(n):\n    if n < 2:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)`}</pre>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-slate-950/72 p-4">
                  <p className="surface-label">Output / JavaScript</p>
                  <pre className="thin-scrollbar mt-3 overflow-x-auto text-sm text-amber-100">{`export function fibonacci(n) {\n  if (n < 2) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}`}</pre>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Validation", "91 / 100"],
                  ["Confidence", "High"],
                  ["Generated Tests", "6 cases"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
                  >
                    <p className="surface-label">{label}</p>
                    <p className="mt-3 text-[1.75rem] font-semibold leading-none text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
