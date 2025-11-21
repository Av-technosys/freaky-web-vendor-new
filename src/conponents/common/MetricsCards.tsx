"use client";

import { Card, CardContent } from "../../components/ui/card";
import MetricsCardsFrame1 from "../../assets/Images/MetricsCards-frame1.png";
import MetricsCardsFrame2 from "../../assets/Images/MetricsCards-frame2.png";
import MetricsCardsFrame3 from "../../assets/Images/MetricsCards-frame3.png";

export default function MetricsCards() {
  const data = [
    { title: "Average order value", value: "$430", icon: MetricsCardsFrame1 },
    { title: "Revenue", value: "$22000", icon: MetricsCardsFrame2 },
    { title: "Cancellation", value: "2.76%", icon: MetricsCardsFrame3 },
  ];

  return (
    <div
      className="
        max-sm:flex max-sm:flex-row max-sm:overflow-x-auto max-sm:gap-2
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-2
        w-full md:max-w-5xl mx-auto
      "
    >
      {data.map((item, index) => (
        <Card
          key={index}
          className="
            rounded-2xl shadow-sm border bg-white
             max-sm:py-1 

          "
        >
          <CardContent className="flex items-center gap-4 p-2">
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
              <p className="text-gray-600 text-sm font-medium">{item.title}</p>
              <p className="text-[20px] font-bold text-gray-800 mt-1">
                {item.value}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
