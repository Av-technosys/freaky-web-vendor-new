
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
import { useGetAllBookings } from "@/services";

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



  const { data: apidata, isPending } = useGetAllBookings({
    // text: searchText,
    page: 1,
    page_size: 20,
  });


  const colors = [
    // 🔵 Blues
    "#3B82F6", "#1E40AF", "#60A5FA", "#0EA5E9",

    // 🟡 Yellows / Gold
    "#FACC15", "#EAB308", "#FFD700", "#FFF3B0",

    // 🔴 Reds / Pinks
    "#EF4444", "#DC2626", "#F43F5E", "#FB7185",

    // 🟢 Greens
    "#22C55E", "#16A34A", "#4ADE80", "#14532D",

    // 🟣 Purples
    "#8B5CF6", "#7C3AED", "#C084FC", "#4C1D95",

    // 🟠 Oranges
    "#F97316", "#EA580C", "#FDBA74",

    // ⚫ Neutrals
    "#000000", "#111827", "#374151", "#9CA3AF", "#F3F4F6", "#FFFFFF",

    // 🌈 Pastels
    "#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF",

    // ⚡ Neon
    "#39FF14", "#FF00FF", "#00FFFF", "#FF073A",

    // 🌊 Teal / Cyan
    "#14B8A6", "#06B6D4", "#0891B2",

    // 🧊 Unique
    "#6EE7B7", "#FDE68A", "#A5B4FC", "#FCA5A5"
  ];


  function getRandomColor(key: string) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = key.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  const pieData = Object.values(
    (apidata?.data || []).reduce((acc: any, item: any) => {
      const service = item.productName || "Unknown";

      if (!acc[service]) {
        acc[service] = {
          service,
          bookings: 0,
          fill: getRandomColor(service), // color helper
        };
      }

      acc[service].bookings += 1;

      return acc;
    }, {})
  );


  return (
    <Card className="flex flex-col md:min-w-[33.33%]" >
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
              data={pieData}
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

        {pieData.map((item: any) => (
          <div key={item.service} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            <span>{item.service}</span>
          </div>
        ))}


        <div className="col-span-2 text-gray-600 text-center font-bold text-[20px] ">
          Total Booking - {pieData?.reduce((sum, s: any) => sum + s.bookings, 0) as string}
        </div>

      </CardFooter>

    </Card>
  );
}