import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui";
import { ProfilePicture } from "./common/ProfileIcon";
import { TiIconStarFilled } from "./icons";

type reviewsProps = {
  userReviews: any;
  drawerHandler: any;
};

const ReviewCard = ({ userReviews, drawerHandler }: reviewsProps) => {
  return (
    <>
      {userReviews?.length > 0 ? (
        userReviews?.map((review: any, index: number) => {
          return (
            <div key={index} className="col-span-1 ">
              <Card>
                <CardHeader>
                  <CardTitle className="w-full flex items-center justify-between">
                    <div className="  flex items-center  gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <ProfilePicture
                          url={review.userImage}
                          name={review.userName}
                        />
                      </div>
                      <div className=" flex flex-col gap-0">
                        <span className="text-sm font-semibold">
                          {review.userName}
                        </span>
                        <span className="text-xs font-semibold text-gray-600">
                          {new Date(review.createdAt).toDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      {Array(review.rating)
                        .fill(0)
                        .map((_, index) => {
                          return (
                            <TiIconStarFilled
                              key={index}
                              size="14"
                              color="gold"
                            />
                          );
                        })}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className=" line-clamp-3">
                  {review.description}
                </CardContent>
                <CardFooter className="w-full items-center justify-end">
                  <Button
                    onClick={() => drawerHandler(review.id)}
                    className="text-yellow-500"
                    variant="link"
                  >
                    View More
                  </Button>
                </CardFooter>
              </Card>
            </div>
          );
        })
      ) : (
        <div>No User Review Found..</div>
      )}
    </>
  );
};

export default ReviewCard;
