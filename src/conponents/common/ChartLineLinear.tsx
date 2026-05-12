/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { CartesianGrid, Label, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
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

import { useGetAllBookings } from "@/services";

export const description = "A linear line chart for net sales analytics";



const chartConfig = {
  sales: {
    label: "Net Sales",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartLineLinear() {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "yearly">("weekly");

  let weeklyData = [
    { day: "1", sales: 35000, percent: "17.3%" },
    { day: "5", sales: 22000, percent: "10.9%" },
    { day: "10", sales: 46000, percent: "22.7%" },
    { day: "15", sales: 15000, percent: "7.4%" },
    { day: "20", sales: 28000, percent: "13.8%" },
    { day: "25", sales: 34000, percent: "16.8%" },
    { day: "30", sales: 22500, percent: "11.1%" },
  ];


  function getDay(date: Date) {
    return date.getDate();
  }

  const getTotalRevenue = () => {
    return chartData
      .reduce((sum: number, item: { sales: number }) => sum + item.sales, 0)
      .toLocaleString() + " USD";
  };


  const { data: apidata, isPending } = useGetAllBookings({
    // text: searchText,
    page: 1,
    page_size: 20,
  });

  const chartData = (apidata?.data || []).map((item: any) => ({
    day: new Date(item.createdAt).getDate().toString(),
    sales: Number(item.productPrice || 0),
  }));

  const groupedData = Object.values(
    (apidata?.data || []).reduce((acc: any, item: any) => {
      const day = new Date(item.createdAt).getDate().toString();
      const price = Number(item.productPrice || 0);

      if (!acc[day]) acc[day] = { day, sales: 0 };
      acc[day].sales += price;

      return acc;
    }, {})
  );

  return (
    <Card className="rounded-2xl col-span-2  ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Net Sales
          </CardTitle>
        </div>
      </CardHeader>
      {/* Chart */}
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={groupedData}
            margin={{
              left: 12,
              right: 12,
              top: 20,
              bottom: 20
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
            >
              <Label
                value="Days"
                offset={-10}
                position="insideBottom"
                style={{ fill: "#6B7280", fontSize: 12 }}
              />
            </XAxis>
            <YAxis
              width={56}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
              ticks={[100, 200, 300, 400, 500]}
              stroke="#9CA3AF"
              tick={{ fontSize: 12, fontWeight: 500 }}
            >
              <Label
                value="Sales (Rs)"
                angle={-90}
                position="insideLeft"
                style={{ fill: "#6B7280", fontSize: 12 }}
              />
            </YAxis>

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelKey="day"
                  formatter={(value) => [
                    `Rs. ${Number(value).toLocaleString()} `,
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