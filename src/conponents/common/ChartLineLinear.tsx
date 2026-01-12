/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import type { ChartConfig } from "../../components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export const description = "A linear line chart for net sales analytics";

const weeklyData = [
  { day: "Mon", sales: 35000, percent: "17.3%" },
  { day: "Tue", sales: 22000, percent: "10.9%" },
  { day: "Wed", sales: 46000, percent: "22.7%" },
  { day: "Thu", sales: 15000, percent: "7.4%" },
  { day: "Fri", sales: 28000, percent: "13.8%" },
  { day: "Sat", sales: 34000, percent: "16.8%" },
  { day: "Sun", sales: 22500, percent: "11.1%" },
];

const monthlyData = [
  { day: "Jan", sales: 45000 },
  { day: "Feb", sales: 38000 },
  { day: "Mar", sales: 48000 },
  { day: "Apr", sales: 42000 },
  { day: "May", sales: 47000 },
  { day: "Jun", sales: 43000 },
  { day: "Jul", sales: 49000 },
  { day: "Aug", sales: 45000 },
  { day: "Sep", sales: 44000 },
  { day: "Oct", sales: 40000 },
  { day: "Nov", sales: 48000 },
  { day: "Dec", sales: 49500 },
];

const yearlyData = [
  { day: "2020", sales: 45000 },
  { day: "2021", sales: 47000 },
  { day: "2022", sales: 48000 },
  { day: "2023", sales: 49000 },
  { day: "2024", sales: 46000 },
  { day: "2025", sales: 49500 },
];


const chartConfig = {
  sales: {
    label: "Net Sales",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartLineLinear() {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "yearly">("weekly");

  const data = timeframe === "weekly" ? weeklyData : timeframe === "monthly" ? monthlyData : yearlyData;

  const getDescription = () => {
    switch (timeframe) {
      case "weekly": return "Showing net sales for the current week";
      case "monthly": return "January - December 2024";
      case "yearly": return "2020 - 2025";
      default: return "Net sales overview";
    }
  };

  const getTotalRevenue = () => {
    return data.reduce((sum, item) => sum + item.sales, 0).toLocaleString() + " USD";
  };

  return (
    <Card className="rounded-2xl col-span-2  ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Net Sales
          </CardTitle>
          <CardDescription>{getDescription()}</CardDescription>
        </div>

        <Select value={timeframe} onValueChange={(value: "weekly" | "monthly" | "yearly") => setTimeframe(value)}>
          <SelectTrigger className="w-28 bg-[#FFEFD2] border-none font-medium">
            <SelectValue placeholder="Weekly" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      {/* Summary Stats */}
      <CardContent className="grid grid-cols-3 gap-4 pb-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Total Revenue</p>
          <p className="text-lg font-semibold text-yellow-600">{getTotalRevenue()}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Total Tickets</p>
          <p className="text-lg font-semibold text-yellow-600">2438</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Total Events</p>
          <p className="text-lg font-semibold text-yellow-600">32</p>
        </div>
      </CardContent>

      {/* Chart */}
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              top: 20,
            }}
          >
            <CartesianGrid
              stroke="#E6E6E6"
              strokeWidth={1}
              vertical={false}
              horizontal={true}
            />


            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <YAxis
              width={40}               // ← FIX excess left spacing

              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
              ticks={[10000, 20000, 30000, 40000, 50000]}   // <- SAME AS IMAGE
              stroke="#9CA3AF"   // grey tick text like design (#9CA3AF = Tailwind gray-400)
              tick={{ fontSize: 12, fontWeight: 500 }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelKey="day"
                  formatter={(value) => [
                    `${Number(value).toLocaleString()} USD`,
                    chartConfig.sales.label,
                  ]}
                />
              }
            />

            <Line
              dataKey="sales"
              type="linear"
              stroke="#FBBF24"   // BRIGHT YELLOW
              strokeWidth={3}
              dot={{
                r: 6,
                fill: "#FBBF24",
                strokeWidth: 2,
                stroke: "white",
              }}
            >

              {/* 1️⃣ Price Above Every Point */}
              {/* <LabelList
      dataKey="sales"
      position="top"
      formatter={(value :any) => value.toLocaleString()}
      style={{
        fill: "#000",
        fontWeight: 700,
        fontSize: 12,
      }}
    /> */}

              {/* 2️⃣ Percentage under it */}


            </Line>
          </LineChart>

        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this period <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total net sales for the selected timeframe
        </div> */}
      </CardFooter>
    </Card>
  );
}