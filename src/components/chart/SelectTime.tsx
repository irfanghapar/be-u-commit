"use client"

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const timeOptions = [
  { value: "1w", label: "Last Week" },
  { value: "1m", label: "Last Month" },
  { value: "3m", label: "Last 3 Months" },
  { value: "6m", label: "Last 6 Months" },
  { value: "1y", label: "Last Year" },
];

export function SelectTime({ onChange }: { onChange: (value: string) => void }) {
  const [selectedTime, setSelectedTime] = React.useState(timeOptions[0].value);

  const handleChange = (value: string) => {
    setSelectedTime(value);
    onChange(value); // pass the selected value to parent for filtering
  };

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-black">Top Three Developer</h2>
      <Select onValueChange={handleChange} defaultValue={selectedTime}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Time" />
        </SelectTrigger>
        <SelectContent>
          {timeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
