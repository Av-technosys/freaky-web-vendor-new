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
import { Button } from "@/components/ui/button";

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
import { BOOKING_TABLE_PAGE_SIZE, BOOKING_TABLE_HEADER } from "@/const";
import { cn } from "@/lib/utils";
import withAuthorization from "@/lib/withAuthorization";
import { SkeletonTable } from "@/components/skletob/table";

const Booking = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [bookingId, setBookingId] = useState();

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  // const [searchText, setSearchText] = useState("");
  // const [page, setPage] = useState(1);

  const { data, isPending } = useGetAllBookings({
    // text: searchText,
    page,
    page_size: BOOKING_TABLE_PAGE_SIZE,
  });

  const totalPages = data?.pagination?.total_pages;

  const bookings = data?.data || [];

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
      <div className="mb-2 space-y-3">
        {/* <div className="flex justify-between items-center gap-2 px-1">
          <Input
            placeholder="Search..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              navigate(`?page=1&page_size=${pageSize}`); // Reset to first page on search
            }}
            className="max-w-[300px] bg-white"
          />
        </div> */}

        <div className="max-w-[400px] bg-white overflow-x-scroll lg:overflow-hidden md:max-w-full p-3 shadow-lg rounded-lg border">

          <Table>
            <TableHeader className="  ">
              <TableRow>{
                BOOKING_TABLE_HEADER.map((heading: string, index: number) => {
                  return (
                    <TableHead key={index} className={cn(" text-gray-800 font-semibold  px-4 md:px-1", heading === "Action" && "text-end w-32")}>
                      {heading}
                    </TableHead>
                  );
                })
              }

              </TableRow>
            </TableHeader>

            <TableBody>

              {isPending && (
                <TableCell
                  colSpan={12}
                  className={`text-center  ${isPending && "py-10"}`}
                >

                  <SkeletonTable />

                </TableCell>
              )}


              {bookings.length === 0 && !isPending ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    No bookings found.
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((item: any) => (
                  <TableRow key={item.id} className=" ">
                    <TableCell className="font-medium text-gray-700">{item.contactName}</TableCell>
                    <TableCell className="text-gray-700">{item.productName}</TableCell>
                    <TableCell className="text-gray-700">
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
                            ? "text-red-500 font-semibold"
                            : "text-green-500 font-semibold"
                      }
                    >
                      {item.bookingStatus}
                    </TableCell>

                    <TableCell className=" flex justify-end text-gray-700">
                      <Button
                        onClick={() => drawerHandler(item.id)}
                        variant={"ghost"}
                        className=" cursor-pointer rounded-full w-10 h-10 text-blue-500"
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
                            className={`cursor-pointer ${page == 1 && "pointer-events-none opacity-50"
                              }`}
                            onClick={() =>
                              navigate(
                                `?page=${page - 1}&page_size=${BOOKING_TABLE_PAGE_SIZE}`,
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
                                    `?page=${index + 1}&page_size=${BOOKING_TABLE_PAGE_SIZE}`,
                                  )
                                }
                                className={`border border-gray-200 rounded-md ${page == index + 1 && "text-orange-500"
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
                            className={`cursor-pointer  ${page == totalPages &&
                              "pointer-events-none opacity-50"
                              }`}
                            onClick={() =>
                              navigate(
                                `?page=${page + 1}&page_size=${BOOKING_TABLE_PAGE_SIZE}`,
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

        </div>
      </div>
    </>
  );
};

export default withAuthorization("booking")(Booking);
