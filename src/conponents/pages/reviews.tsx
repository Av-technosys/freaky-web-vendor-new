import DropdownSelector from "../dropdownSelector";
import profileImage from "../../assets/testingProfilePicture.jpg";
import { ReviewsDrawer } from "../reviewsDrawer";
import ServicesReviews from "../servicesReviews";
import { useState } from "react";
import ReviewCard from "../reviewCard";

const dropdownValuesTime = {
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

const userReviews = [
  {
    name: "Peter Parker",
    image: profileImage,
    date: "24 July",
    review:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam praesentium cumque, sapiente iusto, at, deserunt omnis quam culpa accusantium reiciendis nisi libero est eaque soluta quo repellat similique harum consequatur!",
  },
  {
    name: "Peter Parker",
    image: profileImage,
    date: "24 July",
    review:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam praesentium cumque, sapiente iusto, at, deserunt omnis quam culpa accusantium reiciendis nisi libero est eaque soluta quo repellat similique harum consequatur!",
  },
  {
    name: "Peter Parker",
    image: profileImage,
    date: "24 July",
    review:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam praesentium cumque, sapiente iusto, at, deserunt omnis quam culpa accusantium reiciendis nisi libero est eaque soluta quo repellat similique harum consequatur!",
  },
  {
    name: "Peter Parker",
    image: profileImage,
    date: "24 July",
    review:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam praesentium cumque, sapiente iusto, at, deserunt omnis quam culpa accusantium reiciendis nisi libero est eaque soluta quo repellat similique harum consequatur!",
  },
  {
    name: "Peter Parker",
    image: profileImage,
    date: "24 July",
    review:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam praesentium cumque, sapiente iusto, at, deserunt omnis quam culpa accusantium reiciendis nisi libero est eaque soluta quo repellat similique harum consequatur!",
  },
  {
    name: "Peter Parker",
    image: profileImage,
    date: "24 July",
    review:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam praesentium cumque, sapiente iusto, at, deserunt omnis quam culpa accusantium reiciendis nisi libero est eaque soluta quo repellat similique harum consequatur!",
  },
  {
    name: "Peter Parker",
    image: profileImage,
    date: "24 July",
    review:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam praesentium cumque, sapiente iusto, at, deserunt omnis quam culpa accusantium reiciendis nisi libero est eaque soluta quo repellat similique harum consequatur!",
  },
  {
    name: "Peter Parker",
    image: profileImage,
    date: "24 July",
    review:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam praesentium cumque, sapiente iusto, at, deserunt omnis quam culpa accusantium reiciendis nisi libero est eaque soluta quo repellat similique harum consequatur!",
  },
  {
    name: "Peter Parker",
    image: profileImage,
    date: "24 July",
    review:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam praesentium cumque, sapiente iusto, at, deserunt omnis quam culpa accusantium reiciendis nisi libero est eaque soluta quo repellat similique harum consequatur!",
  },
];

const Reviews = () => {
  const [time, setTime] = useState(dropdownValuesTime.options[0].label);
  const [location, setLocation] = useState(
    dropdownValuesLocation.options[0].label
  );
  const [service, setService] = useState(
    dropdownValuesServices.options[0].label
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const [reviewFulldata, setReviewFulldata] = useState();

  function handleTimeChange(value: any) {
    setTime(value.label);
  }

  function handleLocationChange(value: any) {
    setLocation(value.label);
  }

  function handleServiceChange(value: any) {
    setService(value.label);
  }

  const drawerHandler = (review: any) => {
    setReviewFulldata(review);
    setOpenDrawer(true);
  };

  return (
    <>
      {openDrawer && (
        <ReviewsDrawer
          open={openDrawer}
          setOpen={setOpenDrawer}
          reviewData={reviewFulldata}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-2">
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
      <div>
        <ServicesReviews />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-2">
        <ReviewCard drawerHandler={drawerHandler} userReviews={userReviews} />
      </div>
    </>
  );
};

export default Reviews;
