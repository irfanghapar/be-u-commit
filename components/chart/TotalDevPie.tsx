"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"

export const description = "A donut chart with text"

const chartData = [
  { browser: "Vendor", visitors: 275, fill: "var(--color-vendor)" },
  { browser: "BIMB", visitors: 200, fill: "var(--color-BIMB)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  vendor: {
    label: "vendor",
    color: "hsl(var(--chart-1))",
  },
  BankIslam: {
    label: "BIMB",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function TotalDevPie() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card className="flex w-full h-full">
      <div className="">
        <div className="flex items-center px-4 pt-4 mx-4 mt-4">
          <img className="mr-4 mt-1 h-12 w-12 rounded-lg" src="/profile.jpeg" alt="" />
          <CardHeader className="p-0 m-0">
            <CardTitle className="text-xl leading-tight">Total Developers</CardTitle>
            <CardDescription className="text-gray-400 text-xs leading-tight">Vendors & Non-Vendors</CardDescription>
          </CardHeader>
        </div>
        <CardContent className="flex items-left pb-0">
          <div>
            <div className="mt-20 pt-9 ml-2 flex justify-center mr-4">
              <span className="text-4xl font-bold text-left">210</span>
              <span className="ml-2 text-muted-foreground text-left">Total</span>
            </div>
            <div className="ml-2 pl-1 mt-3 flex items-left gap-1 font-medium text-sm leading-none text-green">
              <TrendingUp className="h-5 w-5" />4
            </div>
          </div>
          <ChartContainer
            config={chartConfig}
            className="aspect-square w-[200px] h-[250px] ml-4"
            >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={48}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-2xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Visitors
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-right"
            />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="ml-2 mt-2 mb-2 flex flex-col items-start gap-0 text-sm">
          <div className="leading-none text-gray-400">
            Showing for Last 24 Hours
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
