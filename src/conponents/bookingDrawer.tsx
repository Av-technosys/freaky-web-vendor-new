import { useEffect, useState } from "react";

import {
  Avatar,
  AvatarFallback,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  Separator,
} from "@/components/ui";
import { TiIconX } from "./icons";
import { useGetBookingDetailsById } from "@/services/useGetAllBookings";
import { InputGroupAddon } from "@/components/ui/input-group";
import { LoaderCircle } from "lucide-react";

const BookingDrawer = ({ open, setOpen, bookingId }: any) => {
  const [bookingDetails, setBookingDetails] = useState<any>({});

  const { data: bookingData, isPending } = useGetBookingDetailsById(bookingId);

  useEffect(() => {
    setBookingDetails(bookingData?.data[0]);
  }, [bookingData, bookingId]);

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent>
          {isPending ? (
            <InputGroupAddon align="inline-end">
              <LoaderCircle className="animate-spin" />
            </InputGroupAddon>
          ) : (
            <div className="w-full h-full bg-[#FFFBF2] overflow-y-scroll">
              <div className="px-4 py-3 flex items-center justify-between ">
                <h2 className="text-lg font-bold text-gray-700">
                  Booking Details
                </h2>
                <DrawerTrigger asChild>
                  <TiIconX className="text-gray-600" />
                </DrawerTrigger>
              </div>

              <div className="px-4">
                <div className="flex gap-4 items-center py-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-slate-200 text-2xl text-gray-600">
                      {bookingDetails?.contactName?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-xl font-bold text-[#3b0a0a]">
                      {bookingDetails?.contactName}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {bookingDetails?.contactNumber}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-4 py-5">
                  <img
                    className="w-28 h-28 rounded-xl object-cover shadow"
                    src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${bookingDetails?.productImage}`}
                    alt="product"
                  />

                  <div className="flex flex-col justify-center gap-2">
                    <p className="text-sm text-gray-500">Product Name</p>
                    <p className="font-semibold">
                      {bookingDetails?.productName}
                    </p>

                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-green-600 font-bold">
                      ${bookingDetails?.productPrice}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 py-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Start Time</span>
                    <span className="text-gray-600">
                      {new Date(bookingDetails?.startTime).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold">End Time</span>
                    <span className="text-gray-600">
                      {new Date(bookingDetails?.endTime).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold">Minimum Guests</span>
                    <span className="text-gray-600">
                      {bookingDetails?.minGuestCount}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold">Maximum Guests</span>
                    <span className="text-gray-600">
                      {bookingDetails?.maxGuestCount}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold">Booking Status</span>
                    <span className="text-gray-600">
                      {bookingDetails?.bookingStatus}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold">Payment Status</span>
                    <span className="text-gray-600">
                      {bookingDetails?.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BookingDrawer;
