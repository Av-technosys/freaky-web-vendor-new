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
import { InputGroupAddon } from "@/components/ui/input-group";
import { LoaderCircle } from "lucide-react";
import { TiIconEye } from "../icons";
import BookingDrawer from "../bookingDrawer";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate, useSearchParams } from "react-router-dom";

const Booking = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [bookingId, setBookingId] = useState();

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [searchText, setSearchText] = useState("");
  // const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data, isPending } = useGetAllBookings({
    text: searchText,
    page,
    page_size: pageSize,
  });

  const totalPages = data?.pagination?.total_pages;

  const bookings = data?.data || [];
  // Assuming backend might implement pagination metadata structure. If array is returned directly as per prompt description "which is an array show that to table also", we might not have total count for pagination from this endpoint unless it wraps response.
  // The prompt says "it returns data of all the booking items ... data return format ... which is an array show that to table also".
  // If it's just an array, simple next/prev based on array length might be ambiguous if backend doesn't return total.
  // Assuming standard pagination, if we get less than page_size items, we are at the end.

  const drawerHandler = (id: any) => {
    setBookingId(id);
    setOpenDrawer(true);
  };

  return (
    <>
      {openDrawer && (
        <BookingDrawer
          open={openDrawer}
          setOpen={setOpenDrawer}
          bookingId={bookingId}
        />
      )}
      <div className="my-2 space-y-3">
        <div className="flex justify-between items-center gap-2 px-1">
          <Input
            placeholder="Search..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              navigate(`?page=1&page_size=${pageSize}`); // Reset to first page on search
            }}
            className="max-w-[300px] bg-white"
          />
        </div>

        <div className="max-w-[400px] bg-white overflow-x-scroll lg:overflow-hidden md:max-w-full p-3 shadow-lg rounded-lg border">
          {isPending ? (
            <InputGroupAddon align="inline-end">
              <LoaderCircle className="animate-spin" />
            </InputGroupAddon>
          ) : (
            <Table>
              <TableHeader className="text-[#89868D]  ">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Service Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
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
                      <TableCell className="font-medium text-[#89868D]">
                        <div className="w-full h-full flex items-center justify-start  gap-3">
                          <Avatar>
                            <AvatarFallback className="text-xs  p-3  rounded-full bg-slate-200">
                              {item.contactName?.charAt(0) || "?"}
                            </AvatarFallback>
                          </Avatar>
                          {item.contactName}
                        </div>
                      </TableCell>
                      <TableCell className="text-[#89868D]">
                        {item.productName}
                      </TableCell>
                      <TableCell className="text-[#89868D]">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(
                          (item.productPrice || 0) * (item.quantity || 1),
                        )}
                      </TableCell>

                      <TableCell
                        className={
                          item.bookingStatus == "PENDING"
                            ? "text-yellow-400 font-bold"
                            : item.bookingStatus == "CANCELLED" ||
                                item.bookingStatus == "REJECTED"
                              ? "text-red-500 font-bold"
                              : "text-green-400 font-bold"
                        }
                      >
                        {item.bookingStatus}
                      </TableCell>

                      <TableCell className="text-[#89868D]">
                        <Button
                          onClick={() => drawerHandler(item.id)}
                          variant={"outline"}
                          className="border-none cursor-pointer shadow-none rounded-full w-10 h-10 text-blue-500"
                        >
                          <TiIconEye />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}

                <TableRow>
                  <TableCell colSpan={5}>
                    <div className="w-full flex items-center justify-center  mt-5 ">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem className="border border-gray-200 rounded-md">
                            <PaginationPrevious
                              className={`cursor-pointer ${
                                page == 1 && "pointer-events-none opacity-50"
                              }`}
                              onClick={() =>
                                navigate(
                                  `?page=${page - 1}&page_size=${pageSize}`,
                                )
                              }
                            />
                          </PaginationItem>
                          {Array.from({ length: totalPages }).map(
                            (_, index: any) => {
                              return (
                                <PaginationItem
                                  onClick={() =>
                                    navigate(
                                      `?page=${index + 1}&page_size=${pageSize}`,
                                    )
                                  }
                                  className={`border border-gray-200 rounded-md ${
                                    page == index + 1 && "text-orange-500"
                                  }`}
                                >
                                  <PaginationLink href="#">
                                    {index + 1}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            },
                          )}
                          <PaginationItem className="border border-gray-200 rounded-md">
                            <PaginationNext
                              className={`cursor-pointer  ${
                                page == totalPages &&
                                "pointer-events-none opacity-50"
                              }`}
                              onClick={() =>
                                navigate(
                                  `?page=${page + 1}&page_size=${pageSize}`,
                                )
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
};

export default Booking;
