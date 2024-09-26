"use client"

import { useState, useEffect } from "react"
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
import { SelectYear } from "@/components/chart/SelectYear"
import { SelectMonth } from "@/components/chart/SelectMonth"
import { fetchTotalDeveloperCommits } from "@/features/developers/services/totalDevCommits"
import { processCommitData } from "@/features/developers/services/process"

export const description = "A line chart with a label"

const chartConfig = {
  developer: {
    label: "Total Developer",
    color: "#9224FF",
  },
} satisfies ChartConfig

export function TotalDevCommitsLine() {
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [selectedMonth, setSelectedMonth] = useState("all")
  const [rawData, setRawData] = useState([])
  const [chartData, setChartData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const formatXAxisTick = (value: string) => {
    if (selectedMonth === 'all') {
      // For yearly view, return month abbreviation
      return value.slice(0, 3);
    } else {
      // For monthly view, return day of month
      return new Date(value).getDate().toString();
    }
  };

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const fetchedData = await fetchTotalDeveloperCommits(selectedYear)
        console.log('Raw data:', fetchedData);
        setRawData(fetchedData)
        setError(null)
      } catch (error) {
        setError('Failed to load data from the server')
        console.error('Error details:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [selectedYear])
  
  useEffect(() => {
    console.log('Raw data in effect:', rawData);
    if (Array.isArray(rawData) && rawData.length > 0) {
      const transformedData = processCommitData(rawData, selectedMonth);
      console.log('Transformed data:', transformedData);
      setChartData(transformedData);
    } else {
      console.log('Raw data is empty, null, or not an array');
      setChartData([]);
    }
  }, [rawData, selectedMonth])

  const handleYearChange = (year: number) => {
    setSelectedYear(year)
  }

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Card>
      <CardHeader className="relative">
        <div className="flex">
          <div className="mr-4 h-12 w-12 rounded-lg overflow-hidden">
            <Image
              src="/commit.png"
              alt=""
              width={48}
              height={48}
            />
          </div>
          <div>
            <CardTitle className="text-xl leading-tight">Total Developer Commits</CardTitle>
            <CardDescription className="mt-1 text-xs">
              {chartData.length > 0 
                ? `${chartData[0].label} - ${chartData[chartData.length - 1].label} ${selectedYear}`
                : "No data available"}
            </CardDescription>
          </div>
        </div>
        <div className="absolute top-2 right-2 pt-2 pr-4 flex space-x-2">
          <SelectYear onChange={handleYearChange} selectedYear={selectedYear} />
          <SelectMonth onChange={handleMonthChange} selectedMonth={selectedMonth} />
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
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatXAxisTick}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="developer"
              type="natural"
              stroke="#9224FF"
              strokeWidth={2}
              dot={{
                fill: "#9224FF",
              }}
              activeDot={{
                r: 8,
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