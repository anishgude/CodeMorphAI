"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BarChart3, Code2, LayoutDashboard, Sparkles, Workflow } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Overview", icon: Code2 },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/benchmark", label: "Benchmark", icon: BarChart3 },
  { href: "/architecture", label: "Architecture", icon: Workflow },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[28px] border border-white/10 bg-slate-950/65 px-5 py-4 shadow-[0_20px_80px_rgba(2,8,23,0.38)] backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-2.5 shadow-[0_10px_28px_rgba(6,182,212,0.18)]">
            <Code2 className="h-5 w-5 text-cyan-300" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.28em] text-cyan-100">CODEMORPH AI</p>
            <p className="text-xs text-slate-500">AI Code Migration Engine</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/[0.03] p-1.5 md:flex">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              href={href}
              key={href}
              className={cn(
                "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition",
                pathname === href ? "text-slate-950" : "text-slate-300 hover:text-white",
              )}
            >
              {pathname === href ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white shadow-[0_10px_30px_rgba(255,255,255,0.14)]"
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                />
              ) : null}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {label}
              </span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300 lg:flex">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            Production-style demo
          </div>
          <Button asChild variant="outline" className="h-11 min-w-[136px] rounded-full px-6">
            <Link href="/dashboard" className="flex w-full items-center justify-center">
              Try Demo
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
