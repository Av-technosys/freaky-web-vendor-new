"use client";

import { ChartLineLinear } from "../common/ChartLineLinear";
import RevenueStats from "../common/RevenueStats";
import MetricsCards from "../common/MetricsCards";
import { ChartPieDonut } from "../common/ChartPieDonut";
import withAuthorization from "@/lib/withAuthorization";

const DashBoard = () => {
  return (
    <div className="bg-[#FAF7EF] !pb-6 min-h-screen p-2 md:p-0 flex flex-col md:flex-row gap-2">
      {/* LEFT SIDE — MAIN CONTENT */}
      <div className="flex-1 flex flex-col gap-2">
        <MetricsCards />

        <div className="grid grid-cols-3 gap-2">
          <ChartLineLinear />
          <ChartPieDonut />
        </div>

        <RevenueStats />
      </div>

      {/* RIGHT SIDE — EVENTS */}
      {/* <div className="md:w-[280px]  w-full">
        <UpcommingEvents />
      </div> */}
    </div>
  );
};

export default withAuthorization("dashboard")(DashBoard);
