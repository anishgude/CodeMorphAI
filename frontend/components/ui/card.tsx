import * as React from "react";

import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass-panel soft-ring rounded-[28px] border border-white/10 bg-card/75",
        className,
      )}
      {...props}
    />
  );
}
