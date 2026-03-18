"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

export function ToastProvider(props: React.ComponentProps<typeof ToastPrimitive.Provider>) {
  return <ToastPrimitive.Provider swipeDirection="right" {...props} />;
}

export function ToastViewport() {
  return (
    <ToastPrimitive.Viewport className="fixed bottom-4 right-4 z-[100] flex w-96 max-w-[calc(100vw-2rem)] flex-col gap-3" />
  );
}

export function Toast({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Root>) {
  return (
    <ToastPrimitive.Root
      className={cn(
        "glass-panel relative rounded-[24px] border border-white/10 p-4 shadow-panel data-[state=open]:animate-in data-[state=closed]:animate-out",
        className,
      )}
      {...props}
    />
  );
}

export function ToastTitle(props: React.ComponentProps<typeof ToastPrimitive.Title>) {
  return <ToastPrimitive.Title className="text-sm font-semibold text-white" {...props} />;
}

export function ToastDescription(props: React.ComponentProps<typeof ToastPrimitive.Description>) {
  return <ToastPrimitive.Description className="mt-1 text-sm text-slate-300" {...props} />;
}

export function ToastClose(props: React.ComponentProps<typeof ToastPrimitive.Close>) {
  return (
    <ToastPrimitive.Close className="absolute right-3 top-3 rounded-full p-1 text-slate-400 hover:bg-white/5" {...props}>
      <X className="h-4 w-4" />
    </ToastPrimitive.Close>
  );
}
