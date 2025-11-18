import { Card, CardContent } from "../components/ui";
import { TiIconStarFilled } from "./icons";

const carouselItems = [
  {
    rating: 4.8,
    name: "Service-1",
    description: "Customer Reviews",
  },
  {
    rating: 4.8,
    name: "Service-2",
    description: "Customer Reviews",
  },
  {
    rating: 4.8,
    name: "Service-3",
    description: "Customer Reviews",
  },
  {
    rating: 4.8,
    name: "Service-4",
    description: "Customer Reviews",
  },
  {
    rating: 4.8,
    name: "Service-5",
    description: "Customer Reviews",
  },
];

const CarouselReviews = () => {
  return (
    <div className="grid grid-cols-2  lg:grid-cols-5 gap-2 mt-2">
      {carouselItems.map((item, index) => {
        return (
          <div key={index} className="col-span-1">
            <Card>
              <CardContent>
                <div className="w-full flex flex-col items-start p-2">
                  <div className="w-full flex items-center justify-between ">
                    <span className="text-2xl text-[#FEA500] font-bold">
                      {item.rating}
                    </span>
                    <div className="w-full flex items-center justify-end gap-1">
                      <TiIconStarFilled size="14" color="#FEA500" />
                      <TiIconStarFilled size="14" color="#FEA500" />
                      <TiIconStarFilled size="14" color="#FEA500" />
                      <TiIconStarFilled size="14" color="#FEA500" />
                      <TiIconStarFilled size="14" color="#FEA500" />
                    </div>
                  </div>
                  <span className="text-[#6A6A6A] font-bold text-[16px]">
                    {item.name}
                  </span>
                  <span className="text-[#4285F4] text-[13px]">
                    {item.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default CarouselReviews;
