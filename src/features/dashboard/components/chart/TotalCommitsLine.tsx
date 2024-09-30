"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { fetchTotalCommits, filterCommitsByMonth, aggregateCommitsByMonth } from "@/features/dashboard/services/totalCommit"
import { SelectYear } from "@/components/chart/SelectYear"
import { SelectMonth } from "@/components/chart/SelectMonth"
import { format } from "date-fns"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive area chart"


const chartConfig = {
  totalCommits: {
    label: "Total Commits ",
    color: "#0099FF",
  },
} satisfies ChartConfig

export function TotalCommits() {
  const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = React.useState("all")
  const [commitsData, setCommitsData] = React.useState<{ date: string; totalCommits: number }[]>([])
  const [lastUpdateTime, setLastUpdateTime] = React.useState("")

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTotalCommits(selectedYear)
        setCommitsData(data)
        setLastUpdateTime(format(new Date(), 'MM/dd/yyyy, h:mm:ss a'))
      } catch (error) {
        console.error("Error fetching commit data:", error)
      }
    }

    fetchData()
  }, [selectedYear])

  const filteredData = React.useMemo(() => {
    const filtered = filterCommitsByMonth(commitsData, selectedMonth === "all" ? "all" : parseInt(selectedMonth))
    return selectedMonth === "all" ? aggregateCommitsByMonth(filtered) : filtered
  }, [commitsData, selectedMonth])

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="text-xl font-semibold text-black mb-1">Contributions</CardTitle>
          <CardDescription>
            Showing total commits by all devs
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <SelectYear onChange={setSelectedYear} selectedYear={selectedYear} />
          <SelectMonth onChange={setSelectedMonth} selectedMonth={selectedMonth} includeAllOption={true} />
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full pl-0" // Remove left padding
        >
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 30, left: -20, bottom: 20 }} // Adjusted left margin
          >
            <defs>
              <linearGradient id="fillTotalCommits" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#0099FF"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#0099FF"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10} // Increased tickMargin
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="totalCommits"
              type="monotone"
              fill="url(#fillTotalCommits)"
              stroke="#0099FF"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
        <div className="text-xs leading-none text-gray-300">
          Last update {lastUpdateTime}
        </div>
      </CardContent>
    </Card>
  )
}
