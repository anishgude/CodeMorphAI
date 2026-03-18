"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";

const nodes = [
  "Input Code",
  "Parsing",
  "Prompt Construction",
  "LLM Migration",
  "Test Generation",
  "Validation",
  "Optimization Suggestions",
];

export function ArchitectureFlow() {
  return (
    <div className="grid gap-4 lg:grid-cols-[repeat(7,minmax(0,1fr))]">
      {nodes.map((node, index) => (
        <div key={node} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <Card className="flex min-h-40 items-center justify-center p-5 text-center transition duration-300 hover:-translate-y-1">
              <div>
                <p className="surface-label text-cyan-300">Stage {index + 1}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{node}</h3>
              </div>
            </Card>
          </motion.div>
          {index < nodes.length - 1 ? (
            <div className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 lg:block">
              <ArrowRight className="h-4 w-4 text-slate-600" />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
