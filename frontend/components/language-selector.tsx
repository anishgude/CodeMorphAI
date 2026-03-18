"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const languages = [
  "python",
  "javascript",
  "java",
  "cpp",
  "csharp",
  "go",
  "rust",
  "typescript",
];

export function LanguageSelector({
  value,
  onValueChange,
  placeholder,
  includeAuto = false,
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  includeAuto?: boolean;
}) {
  const normalizedValue = includeAuto && !value ? "auto" : value;

  return (
    <Select
      value={normalizedValue}
      onValueChange={(nextValue) => onValueChange(nextValue === "auto" ? "" : nextValue)}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {includeAuto ? <SelectItem value="auto">Auto-detect</SelectItem> : null}
        {languages.map((language) => (
          <SelectItem value={language} key={language}>
            {language}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
