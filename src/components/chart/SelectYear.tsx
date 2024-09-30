"use client"

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const currentYear = new Date().getFullYear();
const years = Array.from({length: 5}, (_, i) => currentYear - i);

interface SelectYearProps {
  onChange: (value: number) => void;
  selectedYear: number;
  className?: string; // Add this line
}

export function SelectYear({ onChange, selectedYear, className }: SelectYearProps) {
  return (
    <Select onValueChange={(value) => onChange(Number(value))} value={selectedYear.toString()}>
      <SelectTrigger className={`w-full sm:w-[100px] ${className}`}> {/* Update this line */}
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