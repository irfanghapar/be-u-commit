"use client"

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const currentYear = new Date().getFullYear();
const years = Array.from({length: 5}, (_, i) => currentYear - i);

export function SelectYear({ onChange, selectedYear }: { onChange: (value: number) => void, selectedYear: number }) {
  return (
    <Select onValueChange={(value) => onChange(Number(value))} value={selectedYear.toString()}>
      <SelectTrigger className="w-full sm:w-[100px]">
        <SelectValue placeholder="Select Year" />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}