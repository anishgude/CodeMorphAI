import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk } from "next/font/google";

import "@/app/globals.css";
import { ToasterProvider } from "@/components/toaster";

const fontSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CodeMorph AI",
  description: "AI-powered code migration engine with validation, explanations, tests, and optimization guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={fontSans.variable}>
        <ToasterProvider>{children}</ToasterProvider>
      </body>
    </html>
  );
}
