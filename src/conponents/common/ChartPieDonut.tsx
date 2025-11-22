
// import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

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

export const description = "Customer Booking Donut Chart";

const chartData = [
  { service: "Service-1", bookings: 250, fill: "#3B82F6" },     // blue
  { service: "Service-2", bookings: 450, fill: "#FACC15" },     // yellow
  { service: "Service-3", bookings: 170, fill: "#1E3A8A" },     // dark blue
  { service: "Service-4", bookings: 370, fill: "#F97316" },     // orange
  { service: "Service-5", bookings: 290, fill: "#000000" },     // black
];

const chartConfig = {
  bookings: {
    label: "Bookings",
  },
  "Service-1": {
    label: "Service-1",
    color: "#3B82F6",
  },
  "Service-2": {
    label: "Service-2",
    color: "#FACC15",
  },
  "Service-3": {
    label: "Service-3",
    color: "#1E3A8A",
  },
  "Service-4": {
    label: "Service-4",
    color: "#F97316",
  },
  "Service-5": {
    label: "Service-5",
    color: "#000000",
  },
} satisfies ChartConfig;

export function ChartPieDonut() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <Card className="flex flex-col md:min-w-[35%]" >
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-[22px] font-semibold leading-none text-center text-[#FFC107] ">
          Customer Booking</CardTitle>
      </CardHeader>
      <CardContent className=" pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square md:aspect-square max-sm:h-[180px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="bookings"
              nameKey="service"
              innerRadius={isMobile ? 30 : 50}
              outerRadius={isMobile ? 70 : 100}

              paddingAngle={0}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 max-sm:gap-1">

        {chartData.map((item) => (
          <div key={item.service} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            <span>{item.service}</span>
          </div>
        ))}

        <div className="col-span-2 text-gray-600 text-center font-bold text-[20px] ">
          Total Booking - {chartData.reduce((sum, s) => sum + s.bookings, 0)}
        </div>

      </CardFooter>

    </Card>
  );
}