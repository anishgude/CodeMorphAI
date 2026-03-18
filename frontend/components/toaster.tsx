"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

type ToastItem = {
  id: number;
  title: string;
  description: string;
};

const ToastContext = createContext<{ push: (title: string, description: string) => void } | null>(null);

export function ToasterProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  return (
    <ToastContext.Provider
      value={{
        push(title: string, description: string) {
          const id = Date.now() + Math.random();
          setItems((current) => [...current, { id, title, description }]);
          window.setTimeout(() => {
            setItems((current) => current.filter((item) => item.id !== id));
          }, 2600);
        },
      }}
    >
      <ToastProvider>
        {children}
        {items.map((item) => (
          <Toast key={item.id} open>
            <ToastTitle>{item.title}</ToastTitle>
            <ToastDescription>{item.description}</ToastDescription>
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToasterProvider");
  }
  return context;
}
