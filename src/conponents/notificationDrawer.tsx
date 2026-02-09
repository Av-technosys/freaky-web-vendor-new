import { Card } from "@/components/ui";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { TiIconX } from "./icons";
import { useRef } from "react";
import { useGetVendorNotifications } from "@/services/useGetVendorCompanyDetails";
import { SkeletonAvatarCard } from "@/components/skleton/avtarCard";
import { cn } from "@/lib/utils";

const NotificationDrawer = ({ open, setOpen }: any) => {
  const {
    data: notifications,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetVendorNotifications(open);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    if (
      scrollTop + clientHeight >= scrollHeight - 10 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  return (
    <>
      <Drawer open={open} direction="right">
        <DrawerContent>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className=" w-full h-full overflow-y-auto"
          >
            <DrawerHeader className=" bg-white">
              <DrawerTitle>
                <div className=" flex items-center justify-between  ">
                  Upcoming Events
                  <DrawerTrigger onClick={setOpen} asChild>
                    <TiIconX className="text-gray-600" />
                  </DrawerTrigger>
                </div>
              </DrawerTitle>
            </DrawerHeader>
            <div className=" w-full flex flex-col  px-3 items-start ">
              {isPending ?
                <>
                  <SkeletonAvatarCard />
                  <SkeletonAvatarCard />
                  <SkeletonAvatarCard />
                </>
                : <ul className="w-full grid gap-3">
                  {notifications?.pages?.map((page: any) => {
                    return page?.data?.map((notification: any, index: number) => {
                      return (
                        <Card
                          key={index}
                          className={cn(" shadow-none flex flex-row items-center p-3", notification.status ? "bg-gray-50" : "")}
                        >
                          {/* <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                              src={notification.image || EventProfile}
                              alt={notification.title || "profile"}
                              className="object-cover w-full h-full"
                            />
                          </div> */}

                          <div className="flex w-full flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <p className=" text-base font-medium text-gray-800">
                                {notification?.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {notification?.created_at &&
                                  new Date(
                                    notification.created_at
                                  ).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })}
                              </p>
                            </div>
                            <p style={{
                              wordSpacing: "2px"
                            }} className=" text-sm font-medium line-clamp-2 text-gray-600">
                              {notification?.message}
                            </p>

                          </div>
                        </Card>
                      );
                    });
                  })}
                </ul>}
              {notifications?.pages[0]?.totalCount == 0 && (
                <p className="px-4">No notification found.</p>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NotificationDrawer;
