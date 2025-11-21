import { Card, CardContent } from "../../components/ui/card";
import { cn } from "../../lib/utils"

export default function RevenueStats() {
  const previousMonth = [
    { title: "Total Revenue Accrued", amount: "$25K", color: "text-green-600" },
    { title: "Total Revenue Realized", amount: "$15K", color: "text-blue-600" },
    { title: "Unrealized Revenue", amount: "$10K", color: "text-orange-500" },
  ];

  const currentMonth = [
    { title: "Total Revenue Accrued", amount: "$25K", color: "text-green-600" },
    { title: "Total Revenue Realized", amount: "$13K", color: "text-blue-600" },
    { title: "Unrealized Revenue", amount: "$12K", color: "text-orange-500" },
  ];

  return (
    <div className="bg-white md:w-full rounded-3xl p-6 md:p-4 shadow-sm border mx-auto max-sm:mt-4">

      {/* Previous Month */}
      <h2 className="text-[18px] font-semibold text-gray-700 mb-2">
        Previous Month
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {previousMonth.map((item, index) => (
          <Card
            key={index}
            className="
              md:min-w-[200px] md:h-[94px]
              rounded-lg border border-[#EFF0F6]
              bg-white shadow-none flex items-start
            "
          >
            <CardContent className="p-3 flex flex-col leading-none">
              <p className="text-gray-600 text-[14px] font-medium">
                {item.title}
              </p>

              <p className={cn("mt-2 text-[22px] font-bold", item.color)}>
                {item.amount}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Month */}
      <h2 className="text-[18px] font-semibold text-gray-700 mb-2">
        Current Month
      </h2>

      {/* MOBILE → ROW | DESKTOP → GRID */}
      <div
        className="
          max-sm:flex max-sm:flex-row max-sm:gap-3 max-sm:overflow-x-auto
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4
        "
      >
        {currentMonth.map((item, index) => (
          <Card
            key={index}
            className="
              md:min-w-[200px] md:h-[94px]
              rounded-lg border border-[#EFF0F6]
              bg-white shadow-none flex items-start
            "
          >
            <CardContent className="p-3 flex flex-col leading-none">
              <p className="text-gray-600 text-[14px] font-medium">
                {item.title}
              </p>

              <p className={`mt-2 text-[22px] font-bold ${item.color}`}>
                {item.amount}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
