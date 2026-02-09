import DropdownSelector from "../dropdownSelector";
import { ReviewsDrawer } from "../reviewsDrawer";
import { useEffect, useState } from "react";
import ReviewCard from "../reviewCard";
import { getVendorReviews } from "../../services/userGetVendorReview";
import { useQueryClient } from "@tanstack/react-query";

import withAuthorization from "@/lib/withAuthorization";
import { SkeletonCard } from "@/components/skleton/card";

const dropdownValuesTime = {
  title: "Time",
  options: [
    {
      label: "All Time",
      value: "all_time",
    },
    {
      label: "Recent",
      value: "recent",
    },
    {
      label: "Last Week",
      value: "last_week",
    },
    {
      label: "Last Month",
      value: "last_month",
    },
  ],
};
const dropdownValuesLocation = {
  title: "Location",
  options: [
    {
      label: "Jaipur",
      value: "jaipur",
    },
    {
      label: "Bikaner",
      value: "bikaner",
    },
    {
      label: "Jodhpur",
      value: "jodhpur",
    },
  ],
};
const dropdownValuesServices = {
  title: "Services",
  options: [
    {
      label: "Service1",
      value: "service1",
    },
    {
      label: "Service2",
      value: "service2",
    },
    {
      label: "Service3",
      value: "service3",
    },
  ],
};

const Reviews = () => {
  const queryClient = useQueryClient();

  // const {data, isPending} = getVendorReviews({
  //   page: 1,
  //   page_size: 10,
  //   vendorId: 27,
  //   time: "all_time"
  // });
  const [time, setTime] = useState(dropdownValuesTime.options[0].value);
  const { data, isPending } = getVendorReviews(1, 10, time);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    setReviews(data?.data);
  }, [data]);

  const [location, setLocation] = useState(
    dropdownValuesLocation.options[0].value
  );
  const [service, setService] = useState(
    dropdownValuesServices.options[0].value
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeDrawerReviewId, setActiveDrawerReviewId] = useState<number>();

  function handleTimeChange(value: any) {
    queryClient.invalidateQueries({
      queryKey: ["vendor-reviews"],
    });
    setTime(value.value);
  }

  function handleLocationChange(value: any) {
    setLocation(value.value);
  }

  function handleServiceChange(value: any) {
    setService(value.value);
  }

  const drawerHandler = (reviewId: number) => {
    setActiveDrawerReviewId(reviewId);
    setOpenDrawer(true);
  };

  return (
    <>
      {openDrawer && (
        <ReviewsDrawer
          open={openDrawer}
          setOpen={setOpenDrawer}
          reviewId={activeDrawerReviewId}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-1 gap-3">
        <div className="col-span-1">
          <DropdownSelector
            values={dropdownValuesTime}
            selectedValue={time}
            onChange={handleTimeChange}
          />{" "}
        </div>
        <div className="col-span-1">
          <DropdownSelector
            values={dropdownValuesLocation}
            selectedValue={location}
            onChange={handleLocationChange}
          />{" "}
        </div>
        <div className="col-span-1">
          <DropdownSelector
            values={dropdownValuesServices}
            selectedValue={service}
            onChange={handleServiceChange}
          />{" "}
        </div>
      </div>
      {/* <div>
        <ServicesReviews />
      </div> */}

      {isPending ? <ReviewSkeleton /> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4"> <ReviewCard drawerHandler={drawerHandler} userReviews={reviews} /></div>}

    </>
  );
};

export default withAuthorization("reviews")(Reviews);
function ReviewSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}