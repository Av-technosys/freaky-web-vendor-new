import { getAllBookings } from "@/helper/booking";
import { useQuery } from "@tanstack/react-query";

export const useGetAllBookings = ({ text, page, page_size }: any) => {
    return useQuery({
        queryKey: ["bookings", text, page, page_size],
        queryFn: () => getAllBookings({ text, page, page_size }),
    });
};
