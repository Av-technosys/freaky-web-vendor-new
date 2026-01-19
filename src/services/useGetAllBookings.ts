import { getAllBookings, getBookingItemDetails } from "@/helper/booking";
import { useQuery } from "@tanstack/react-query";

export const useGetAllBookings = ({ text, page, page_size }: any) => {
  return useQuery({
    queryKey: ["bookings", text, page, page_size],
    queryFn: () => getAllBookings({ text, page, page_size }),
  });
};

export const useGetBookingDetailsById = (bookingId: any) => {
  return useQuery({
    queryKey: ["bookingItem-details", bookingId],
    queryFn: () => getBookingItemDetails(bookingId),
  });
};
