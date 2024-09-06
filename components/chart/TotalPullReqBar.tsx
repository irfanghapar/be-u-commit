"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

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

export const description = "A bar chart with a label"

const chartData = [
  { month: "January", pullRequest: 186 },
  { month: "February", pullRequest: 305 },
  { month: "March", pullRequest: 237 },
  { month: "April", pullRequest: 73 },
  { month: "May", pullRequest: 209 },
  { month: "June", pullRequest: 214 },
  { month: "January", pullRequest: 186 },
  { month: "February", pullRequest: 305 },
  { month: "March", pullRequest: 237 },
  { month: "April", pullRequest: 73 },
  { month: "May", pullRequest: 209 },
  { month: "June", pullRequest: 214 },
]

const chartConfig = {
  pullRequest: {
    label: "Pull Requests",
    color: "#FFB342",
  },
} satisfies ChartConfig

export function TotalPullReq() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Pull Request</CardTitle>
        <CardDescription>By Developer</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[222px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20 }}
            width={12}
            height={12}
          >
            <defs>
              <linearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFA500" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="pullRequest" fill="url(#yellowGradient)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Total Pull Request increase 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-gray-400">
          Last update 24 hours ago
        </div>
      </CardFooter>
    </Card>
  )
}