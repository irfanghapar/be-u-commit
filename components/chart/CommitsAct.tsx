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
  { month: "January", commits: 0 },
  { month: "February", commits: 0 },
  { month: "March", commits: 237 },
  { month: "April", commits: 73 },
  { month: "May", commits: 209 },
  { month: "June", commits: 214 },
  { month: "July", commits: 186 },
  { month: "August", commits: 0 },
  { month: "September", commits: 0 },
  { month: "October", commits: 186 },
  { month: "November", commits: 22 },
  { month: "December", commits: 0 },

]

const chartConfig = {
  commits: {
    label: "Commits",
    color: "#72C6FF",
  },
} satisfies ChartConfig

export function CommitsAct() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Commits</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="lg:w-full h-[220px] sm:h-[300px] md:h-[220px]">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="commits" fill="#72C6FF" radius={8}>
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
        <div className="flex gap-2 text-darkGreen font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total commits for one year
        </div>
      </CardFooter>
    </Card>
  )
}
