import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges utility classes", () => {
    expect(cn("px-2", "px-4", "text-white")).toContain("px-4");
  });
});
