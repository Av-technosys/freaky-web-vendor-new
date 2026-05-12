import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { cn } from "../../lib/utils"
import { getPayments } from "@/helper/payments";

export default function RevenueStats() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [previousMonth, setPreviousMonth] = useState([
    { title: "Total Revenue Accrued", amount: "$0", color: "text-green-600" },
    { title: "Total Revenue Realized", amount: "$0", color: "text-blue-600" },
    { title: "Unrealized Revenue", amount: "$0", color: "text-orange-500" },
  ]);

  const [currentMonth, setCurrentMonth] = useState([
    { title: "Total Revenue Accrued", amount: "$0", color: "text-green-600" },
    { title: "Total Revenue Realized", amount: "$0", color: "text-blue-600" },
    { title: "Unrealized Revenue", amount: "$0", color: "text-orange-500" },
  ]);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);

      const res = await getPayments();
      const list = res?.data || [];

      const mapped = list.map((p: any) => ({
        id: p.paymentId,
        status: p.paymentStatus,
        amount: Number(p.amount || 0),
        serviceName: p.productName,
        date: new Date(p.createdAt).toDateString(),
        createdAt: new Date(p.createdAt),
        contactName: p.contactName,
      }));

      setPayments(mapped);

      // =========================
      // Revenue Calculation
      // =========================

      const now = new Date();

      const currentMonthIndex = now.getMonth();
      const currentYear = now.getFullYear();

      const previousMonthIndex =
        currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;

      const previousMonthYear =
        currentMonthIndex === 0 ? currentYear - 1 : currentYear;

      const calculateRevenue = (paymentsData: any[]) => {
        let accrued = 0;
        let realized = 0;
        let unrealized = 0;

        paymentsData.forEach((payment) => {
          const amount = Number(payment.amount || 0);

          accrued += amount;

          if (payment.status === "CAPTURED") {
            realized += amount;
          } else {
            unrealized += amount;
          }
        });

        return {
          accrued,
          realized,
          unrealized,
        };
      };

      const currentMonthPayments = mapped.filter((payment: any) => {
        const date = payment.createdAt;

        return (
          date.getMonth() === currentMonthIndex &&
          date.getFullYear() === currentYear
        );
      });

      const previousMonthPayments = mapped.filter((payment: any) => {
        const date = payment.createdAt;

        return (
          date.getMonth() === previousMonthIndex &&
          date.getFullYear() === previousMonthYear
        );
      });

      const currentRevenue = calculateRevenue(currentMonthPayments);
      const previousRevenue = calculateRevenue(previousMonthPayments);

      setCurrentMonth([
        {
          title: "Total Revenue Accrued",
          amount: `$${currentRevenue.accrued}`,
          color: "text-green-600",
        },
        {
          title: "Total Revenue Realized",
          amount: `$${currentRevenue.realized}`,
          color: "text-blue-600",
        },
        {
          title: "Unrealized Revenue",
          amount: `$${currentRevenue.unrealized}`,
          color: "text-orange-500",
        },
      ]);

      setPreviousMonth([
        {
          title: "Total Revenue Accrued",
          amount: `$${previousRevenue.accrued}`,
          color: "text-green-600",
        },
        {
          title: "Total Revenue Realized",
          amount: `$${previousRevenue.realized}`,
          color: "text-blue-600",
        },
        {
          title: "Unrealized Revenue",
          amount: `$${previousRevenue.unrealized}`,
          color: "text-orange-500",
        },
      ]);
    } catch (err) {
      console.error("payment fetch error", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white md:w-full rounded-3xl p-6 md:p-4 shadow-sm border mx-auto max-sm:mt-4">


      {/* Current Month */}
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
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
          <StatsCard
            key={index}
            title={item.title}
            amount={item.amount}
            color={item.color}
          />
        ))}
      </div>

      {/* Previous Month */}
      <h2 className=" pl-0 text-xl font-semibold text-gray-700 mb-2">
        Previous Month
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {previousMonth.map((item, index) => (
          <StatsCard
            key={index}
            title={item.title}
            amount={item.amount}
            color={item.color}
          />
        ))}
      </div>


    </div>
  );
}


function StatsCard({ title, amount, color }: any) {
  return (
    <Card
      key={title}
      className=" shadow-none"
    >
      <CardHeader>
        <CardTitle className="text-gray-600 font-medium">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-3 flex flex-col leading-none">

        <div className=" px-3">
          <p className={cn(" text-2xl font-bold", color)}>
            {amount}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}