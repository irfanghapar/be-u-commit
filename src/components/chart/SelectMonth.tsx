"use client"

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectMonthProps {
  onChange: (value: string) => void;
  selectedMonth: string;
  includeAllOption?: boolean;
  includeTodayAndWeek?: boolean;
  className?: string; // Add this line
}

export function SelectMonth({ onChange, selectedMonth, includeAllOption = false, includeTodayAndWeek = false, className }: SelectMonthProps) {
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ]

  const additionalOptions = [
    ...(includeAllOption ? [{ value: "all", label: "All Months" }] : []),
    ...(includeTodayAndWeek ? [
      { value: "today", label: "Today" },
      { value: "7days", label: "Last 7 Days" },
    ] : []),
  ]

  const allOptions = [...additionalOptions, ...months]

  return (
    <Select onValueChange={onChange} value={selectedMonth}>
      <SelectTrigger className={`w-[180px] ${className}`}> {/* Update this line */}
        <SelectValue placeholder="Select month" />
      </SelectTrigger>
      <SelectContent>
        {allOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}