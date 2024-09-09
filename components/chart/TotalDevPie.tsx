"use client"

import * as React from "react"
import { TrendingUp, User } from "lucide-react"
import { Label, Pie, PieChart, Sector } from "recharts"
import Image from "next/image"

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
  { company: "BIMB", developer: 50, fill: "#E2376F" },
  { company: "Vendor", developer: 275, fill: "#FFC0DA" }
]

const chartConfig = {
  developer: {
    label: "Developers",
  },
  BIMB: {
    label: "BIMB",
    color: "#E2376F",
  },
  Vendor: {
    label: "Vendor",
    color: "#FFC0DA",
  }

} satisfies ChartConfig

export function TotalDevPie() {
  // Add interactive feature: activeIndex to track which slice is hovered
  const [activeIndex, setActiveIndex] = React.useState(0)

  // Handle hovering over pie slices
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }
  const totalDeveloper = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.developer, 0)
  }, [])

  return (
    <Card className="flex w-full h-full">
      <div className="">
        <div className="flex items-center px-4 pt-4 mx-4 mt-2">
        <div className="mr-4 mt-1 h-12 w-12 rounded-lg overflow-hidden">
          <Image
            src="/dev_icon.png"
            alt=""
            width={48}   
            height={48}  
          />
        </div>          
          <CardHeader className="p-0 m-0">
            <CardTitle className="text-xl leading-tight">Total Developers</CardTitle>
            <CardDescription className="text-xs">Vendors & Non-Vendors</CardDescription>
          </CardHeader>
        </div>
        <CardContent className="flex items-left pb-0">
          <div>
            <div className="mt-20 pt-9 ml-2 flex justify-center mr-4">
              <span className="text-4xl font-bold text-left">{totalDeveloper}</span>
              <span className="ml-2 text-muted-foreground text-left">Total</span>
            </div>
            <div className="ml-2 pl-1 mt-3 flex items-left gap-1 font-medium text-sm leading-none text-green">
              <TrendingUp className="h-5 w-5" />4
              <User className="h-4 w-4"></User>
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
                dataKey="developer"
                nameKey="company"
                innerRadius={48}
                strokeWidth={5}
                // Add the interactivity here
                activeIndex={activeIndex}
                activeShape={({ outerRadius = 0, ...props }) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
                  </g>
                )}
                onMouseEnter={onPieEnter} // Handle mouse enter event
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      const bimbDevelopers = chartData.find((data) => data.company === "BIMB")?.developer || 0;
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
                            {bimbDevelopers.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            BIMB
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="company" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-right"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="ml-2 mt-2 mb-2 flex flex-col items-start gap-0 text-sm">
          <div className="text-xs leading-none text-gray-400">
            Last update 24 hours ago
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
