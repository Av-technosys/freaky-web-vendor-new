import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui";
import DropdownSelector from "../dropdownSelector";
import profileImage from "../../assets/testingProfilePicture.jpg";
import { TiIconStarFilled } from "../icons";
import CarouselReviews from "../carouselReviews";
import { ReviewsDrawer } from "../reviewsDrawer";

const dropdownValues = {
  Options: ["8:00 am - 10:00 pm", "10:00 am - 12:00 pm", "12:00 pm - 02:00 am"],
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
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-2">
        <div className="col-span-1">
          <DropdownSelector values={dropdownValues} />{" "}
        </div>
        <div className="col-span-1">
          <DropdownSelector values={dropdownValues} />{" "}
        </div>
        <div className="col-span-1">
          <DropdownSelector values={dropdownValues} />{" "}
        </div>
      </div>
      <div>
        <CarouselReviews />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-2">
        {userReviews?.map((review, index) => {
          return (
            <div key={index} className="col-span-1 ">
              <Card>
                <CardHeader>
                  <CardTitle className="w-full flex items-center justify-between">
                    <div className="w-2/3  flex items-center  gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={review.image}
                          alt="profile-picture"
                        />
                      </div>
                      <span className="text-[13px]">{review.name}</span>
                      <span className="text-[12px]">{review.date}</span>
                    </div>
                    <div className="w-1/3  flex items-center justify-center gap-1">
                      <TiIconStarFilled size="14" color="gold" />
                      <TiIconStarFilled size="14" color="gold" />
                      <TiIconStarFilled size="14" color="gold" />
                      <TiIconStarFilled size="14" color="gold" />
                      <TiIconStarFilled size="14" color="gold" />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>{review.review}</CardContent>
                <CardFooter className="w-full items-center justify-end">
                  <ReviewsDrawer />
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Reviews;
