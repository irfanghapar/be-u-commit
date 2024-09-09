"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"
import Image from 'next/image'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select" // Adjust this import based on your project structure

export const description = "A line chart with a label"

// Initial chart data
const initialChartData = [
  { month: "January", developer: 186},
  { month: "February", developer: 305 },
  { month: "March", developer: 237 },
  { month: "April", developer: 73 },
  { month: "May", developer: 209 },
  { month: "June", developer: 214 },
]

// Dummy function to filter data based on selected time range
const filterChartData = (data, range) => {
  // Implement filtering logic based on `range`
  // For now, return all data as placeholder
  return data
}

const chartConfig = {
  developer: {
    label: "Total Developer",
    color: "#9224FF",
  },
} satisfies ChartConfig

export function TotalDevCommitsLine() {
  const [timeRange, setTimeRange] = useState("90d") // Default time range
  const [chartData, setChartData] = useState(filterChartData(initialChartData, timeRange))

  const handleRangeChange = (value) => {
    setTimeRange(value)
    setChartData(filterChartData(initialChartData, value))
  }

  return (
    <Card>
      <CardHeader className="relative">
        <div className="flex">
        <div className="mr-4 h-12 w-12 rounded-lg overflow-hidden">
          <Image
            src="/commit.png"
            alt=""
            width={48}  // h-12 corresponds to 48px
            height={48} // w-12 corresponds to 48px
          />
        </div>
          <div>
          <CardTitle className="text-xl leading-tight">Total Developer Commits</CardTitle>
          <CardDescription className="mt-1 text-xs">January - June 2024</CardDescription>
          </div>
        </div>
        <div className="absolute top-2 right-2 pt-2 pr-4">
          <Select value={timeRange} onValueChange={handleRangeChange}>
            <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[200px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="developer"
              type="natural"
              stroke="var(--color-developer)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-developer)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Total developer who commits has increased 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-xs leading-none text-gray-400">
          Last update 24 hours ago
        </div>
      </CardFooter>
    </Card>
  )
}
