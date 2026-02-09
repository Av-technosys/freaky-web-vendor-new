import { TiIconStarFilled } from "./icons";
import {
  Sheet,
  SheetContent,
  SidebarGroup,
  SidebarGroupLabel,
  Skeleton,
} from "../components/ui";
import { getVendorReviewById } from "../services/userGetVendorReview";
import { useEffect, useState } from "react";
import { ProfilePicture } from "./common/ProfileIcon";
import { SkeletonAvatarCard } from "@/components/skleton/avtarCard";

type reviewDrawerProps = {
  open: any;
  setOpen: any;
  reviewId: number | undefined;
};

export function ReviewsDrawer({ open, setOpen, reviewId }: reviewDrawerProps) {
  const { data, isPending } = getVendorReviewById(reviewId!);

  const [reviewData, setReviewData] = useState<any>();
  useEffect(() => {
    setReviewData(data?.data[0]);
  }, [data]);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className=" duration-200!">
        <div className=" w-full h-full">
          <SidebarGroup>
            <SidebarGroupLabel>Details</SidebarGroupLabel>
          </SidebarGroup>

          {isPending ? (
            <>
              <div className="px-4">
                <SkeletonAvatarCard />
              </div>
              <ReviewSkeleton />
            </>
          ) : (
            <div className=" px-4">
              <div className=" border my-4 rounded-xl shadow-xs p-2 w-full flex items-center gap-3 justify-between  ">
                <div className="">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <ProfilePicture
                      url={reviewData?.userImage}
                      name={reviewData?.userFirstName}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-0">
                  <p className="text-gray-800 text-lg ">
                    {reviewData?.userFirstName + " " + reviewData?.userLastName}
                  </p>
                  <p className="text-gray-600 text-sm font-medium">
                    Jaipur Rajasthan
                  </p>
                </div>
              </div>
              <div>
                <div className=" w-full py-3  flex flex-col gap-2  items-start ">
                  <div className="w-full flex flex-col ">
                    <div className=" flex w-full justify-between ">
                      <Heading>User Reviews</Heading>
                      <span className=" text-black">
                        {" "}
                        {new Date(reviewData?.createdAt).toDateString()}
                      </span>
                    </div>
                    <div className=" flex items-center gap-2">
                      <div className="flex gap-1">
                        {Array(reviewData?.rating)
                          .fill(0)
                          .map((_, index) => {
                            return (
                              <TiIconStarFilled
                                key={index}
                                size="20"
                                color="gold"
                              />
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  <div className=" mt-3">
                    <Heading>Service Name</Heading>
                    <Text>Lorem, ipsum dolor.</Text>
                  </div>
                  <div className=" mt-3">
                    <Heading>Comment</Heading>
                    <Text>{reviewData?.description}</Text>
                  </div>
                  {reviewData?.reviewMedia?.length > 0 && (
                    <div className="mt-3">
                      <Heading>Photos:</Heading>
                      <div className="w-full grid grid-cols-3 gap-1">
                        {reviewData?.reviewMedia?.map(
                          (item: any, index: number) => {
                            return (
                              <div
                                key={index}
                                className=" w-full flex justify-center items-center"
                              >
                                <img
                                  src={item.mediaUrl}
                                  alt={reviewData.userFirstName}
                                />
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

const Heading = ({ children }: { children: React.ReactNode }) => {
  return <p className=" text-black text-base font-semibold">{children}</p>;
};

const Text = ({ children }: { children: React.ReactNode }) => {
  return <p className=" text-black ">{children}</p>;
};

function ReviewSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 mt-4 px-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-full" />
      ))}
    </div>
  );
}
