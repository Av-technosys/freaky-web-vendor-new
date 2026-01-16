import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useGetAllBookings } from "@/services/useGetAllBookings";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Booking = () => {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const { data, isPending } = useGetAllBookings({ text: searchText, page, page_size: pageSize });
  const bookings = data?.data || [];
  // Assuming backend might implement pagination metadata structure. If array is returned directly as per prompt description "which is an array show that to table also", we might not have total count for pagination from this endpoint unless it wraps response.
  // The prompt says "it returns data of all the booking items ... data return format ... which is an array show that to table also".
  // If it's just an array, simple next/prev based on array length might be ambiguous if backend doesn't return total.
  // Assuming standard pagination, if we get less than page_size items, we are at the end.

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="my-2 space-y-3">
      <div className="flex justify-between items-center px-1">
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setPage(1); // Reset to first page on search
          }}
          className="max-w-[300px]"
        />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={page === 1}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={handleNextPage} disabled={bookings.length < pageSize}>
            Next
          </Button>
        </div>
      </div>

      <div className="max-w-[400px] bg-white overflow-x-scroll lg:overflow-hidden md:max-w-full p-3 shadow-lg rounded-lg border">
        {isPending ? (
          <div className="p-4 text-center">Loading bookings...</div>
        ) : (
          <Table>
            <TableHeader className="text-[#89868D]  ">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date & Time</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    No bookings found.
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((item: any) => (
                  <TableRow key={item.id} className=" ">
                    <TableCell className="font-medium flex items-center  gap-3 text-[#89868D]">
                      <Avatar>
                        <AvatarFallback className="text-xs   p-2   rounded-full bg-slate-200">
                          {item.contactName?.charAt(0) || "?"}
                        </AvatarFallback>
                      </Avatar>
                      {item.contactName}
                    </TableCell>
                    <TableCell className="text-[#89868D]">{item.productName}</TableCell>
                    <TableCell className="text-[#89868D]">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format((item.productPrice || 0) * (item.quantity || 1))}
                    </TableCell>
                    <TableCell className="text-[#89868D]">
                      {item.location || (item.latitude && item.longitude ? `${item.latitude}, ${item.longitude}` : "N/A")}
                    </TableCell>
                    <TableCell
                      className={
                        item.bookingStatus == "PENDING"
                          ? "text-yellow-400 font-bold"
                          : item.bookingStatus == "CANCELLED" || item.bookingStatus == "REJECTED"
                            ? "text-red-500 font-bold"
                            : "text-green-400 font-bold"
                      }
                    >
                      {item.bookingStatus}
                    </TableCell>
                    <TableCell className="text-[#89868D]">
                      {item.startTime ? new Date(item.startTime).toLocaleString() : "N/A"}
                    </TableCell>
                  </TableRow>
                )))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Booking;
