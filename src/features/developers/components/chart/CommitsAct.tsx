"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { useState, useEffect } from "react"

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
import { fetchTotalCommits, filterCommitsByMonth, aggregateCommitsByMonth } from "@/features/dashboard/services/totalCommit"

export const description = "A bar chart with a label"

const chartConfig = {
  commits: {
    label: "Commits",
    color: "#72C6FF",
  },
} satisfies ChartConfig

interface CommitsActProps {
  developerId: string
}

interface ChartDataPoint {
  date: string;
  commits: number;
}

export function CommitsAct({ developerId }: CommitsActProps) {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState('all')
  const [trend, setTrend] = useState({ percentage: 0, direction: 'up' })

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    if (selectedMonth === 'all') {
      // For yearly view, show month abbreviations
      return date.toLocaleString('default', { month: 'short' });
    } else {
      // For monthly view, show day numbers
      return date.getDate().toString().padStart(2, '0');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTotalCommits(selectedYear, developerId)
        let filteredData = filterCommitsByMonth(data, selectedMonth === 'all' ? 'all' : parseInt(selectedMonth))
        let aggregatedData = selectedMonth === 'all' 
          ? aggregateCommitsByMonth(filteredData)
          : filteredData

        const formattedData = aggregatedData.map(item => ({
          date: new Date(item.date).toLocaleString('default', { month: 'long', day: 'numeric' }),
          commits: item.totalCommits
        }))

        setChartData(formattedData)

        // Calculate trend
        if (selectedMonth === 'all') {
          // Compare with previous year
          const previousYearData = await fetchTotalCommits(selectedYear - 1, developerId)
          const currentYearTotal = aggregatedData.reduce((sum, item) => sum + item.totalCommits, 0)
          const previousYearTotal = previousYearData.reduce((sum, item) => sum + item.totalCommits, 0)
          const percentageChange = ((currentYearTotal - previousYearTotal) / previousYearTotal) * 100
          setTrend({
            percentage: Math.abs(percentageChange).toFixed(1),
            direction: percentageChange >= 0 ? 'up' : 'down'
          })
        } else {
          // Compare with previous month
          const currentMonthIndex = parseInt(selectedMonth) - 1
          const previousMonthIndex = currentMonthIndex - 1
          const currentMonthTotal = aggregatedData.reduce((sum, item) => sum + item.totalCommits, 0)
          
          let previousMonthTotal
          if (previousMonthIndex >= 0) {
            const previousMonthData = filterCommitsByMonth(data, previousMonthIndex + 1)
            previousMonthTotal = previousMonthData.reduce((sum, item) => sum + item.totalCommits, 0)
          } else {
            // If it's January, fetch data from previous year's December
            const previousYearData = await fetchTotalCommits(selectedYear - 1, developerId)
            const decemberData = filterCommitsByMonth(previousYearData, 12)
            previousMonthTotal = decemberData.reduce((sum, item) => sum + item.totalCommits, 0)
          }

          const percentageChange = ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100
          setTrend({
            percentage: Math.abs(percentageChange).toFixed(1),
            direction: percentageChange >= 0 ? 'up' : 'down'
          })
        }
      } catch (error) {
        console.error("Error fetching commit data:", error)
      }
    }

    fetchData()
  }, [developerId, selectedYear, selectedMonth])

  return (
    <Card>
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle>Total Commits</CardTitle>
        <div className="flex gap-2">
          <SelectYear 
            onChange={setSelectedYear} 
            selectedYear={selectedYear} 
            className="text-black" // Add this line
          />
          <SelectMonth 
            onChange={setSelectedMonth} 
            selectedMonth={selectedMonth} 
            includeAllOption={true} 
            className="text-black" // Add this line
          />
        </div>
      </div>
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
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={formatXAxis}
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
        <div className={`flex gap-2 font-medium leading-none ${trend.direction === 'up' ? 'text-darkGreen' : 'text-red'}`}>
          {trend.direction === 'up' ? 'Trending up' : 'Trending down'} by {trend.percentage}% compared to {selectedMonth === 'all' ? 'last year' : 'last month'}
          {trend.direction === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total commits for {selectedMonth === 'all' ? selectedYear : `${new Date(selectedYear, parseInt(selectedMonth) - 1).toLocaleString('default', { month: 'long' })} ${selectedYear}`}
        </div>
      </CardFooter>
    </Card>
  )
}