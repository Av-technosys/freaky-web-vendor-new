
import { Card, CardContent } from "../../components/ui/card";
import MetricsCardsFrame1 from "../../assets/Images/MetricsCards-frame1.png";
import MetricsCardsFrame2 from "../../assets/Images/MetricsCards-frame2.png";
import { useGetAllBookings } from "@/services";
import { useMemo } from "react";

export default function MetricsCards() {
  // const [totalRevenue, setTotalRevenue] = useState(0);

  const { data: apidata, isPending } = useGetAllBookings({
    // text: searchText,
    page: 1,
    page_size: 20,
  });

  const totalRevenue: number = useMemo(() => {
    let sum = 0;
    apidata?.data?.forEach((item: any) => {
      sum += Number(item.productPrice)
    });
    return sum;
  }, [apidata])

  const totalBooking: number = useMemo(() => {
    let sum = 0;
    apidata?.data?.forEach((item: any) => {
      sum += 1;
    });
    return sum;
  }, [apidata])



  const data = [
    { title: "Average order value", value: "Rs. " + Number(totalRevenue / totalBooking).toFixed(2), icon: MetricsCardsFrame1 },
    { title: "Revenue", value: "Rs. " + Number(totalRevenue).toFixed(2), icon: MetricsCardsFrame2 },
    { title: "Total bookings", value: totalBooking, icon: MetricsCardsFrame2 },
  ];

  return (
    <div
      className="
        max-sm:flex max-sm:flex-row max-sm:overflow-x-auto max-sm:gap-2
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-2
        w-full
      "
    >
      {data.map((item, index) => (
        <Card
          key={index}
          className="
            rounded-2xl shadow-sm border bg-white"
        >
          <CardContent className="flex items-center gap-4 ">
            {/* Icon */}
            <div className="w-12 h-12">
              <img
                src={item.icon}
                alt="icon"
                className="object-contain w-full h-full"
              />
            </div>

            {/* Text */}
            <div>
              <p className="text-gray-600 font-medium">{item.title}</p>
              <p className="text-xl font-bold text-gray-800 mt-1">
                {item.value}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
