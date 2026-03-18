"use client";

import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DownloadButton({ value, filename }: { value: string; filename: string }) {
  function handleDownload() {
    const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Button variant="outline" size="sm" onClick={handleDownload}>
      <Download className="h-4 w-4" />
      Download
    </Button>
  );
}
