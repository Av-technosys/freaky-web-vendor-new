import { Card } from "@/components/ui";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { TiIconX } from "./icons";
import EventProfile from "../assets/testingProfilePicture.jpg";
import { useRef } from "react";
import { useGetVendorNotifications } from "@/services/useGetVendorCompanyDetails";

const NotificationDrawer = ({ open, setOpen }: any) => {
  const {
    data: notifications,
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
            <DrawerHeader className=" sticky top-0 bg-white">
              <DrawerTitle>
                <div className=" flex items-center justify-between  ">
                  Upcoming Events
                  <DrawerTrigger onClick={setOpen} asChild>
                    <TiIconX className="text-gray-600" />
                  </DrawerTrigger>
                </div>
              </DrawerTitle>
            </DrawerHeader>
            <div className=" w-full flex flex-col  items-start ">
              <ul className="w-full grid gap-3 px-3">
                {notifications?.pages?.map((page: any) => {
                  return page?.data?.map((notification: any, index: number) => {
                    return (
                      <Card
                        key={index}
                        className="w-full h-[56px] bg-slate-50 border border-[#6366F11A] rounded-[10px]  flex flex-row items-center  gap-[10px]  p-[8px_10px] shadow-none "
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src={notification.image || EventProfile}
                            alt={notification.title || "profile"}
                            className="object-cover w-full h-full"
                          />
                        </div>

                        <div className="flex flex-col gap-1 leading-none">
                          <p className="text-[13px] font-medium text-gray-800">
                            Event : {notification?.title}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            Date :{" "}
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
                      </Card>
                    );
                  });
                })}
              </ul>
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
