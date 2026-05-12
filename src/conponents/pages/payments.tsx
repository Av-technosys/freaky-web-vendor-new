"use client";

import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import {
  TiIconCircleCheck,
  TiIconCircleMinus,
  TiIconClockHour2,
  TiIconFlag3,
} from "../icons";

import withAuthorization from "@/lib/withAuthorization";
import { getPayments } from "@/helper/payments";
import { Link } from "react-router-dom";

const Payment = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);

      const res = await getPayments();
      const list = res?.data || [];

      const mapped = list.map((p: any) => ({
        id: p.paymentId,
        status: p.paymentStatus,
        amount: p.amount || 0,
        serviceName: p.productName,
        date: new Date(p.createdAt).toDateString(),
        contactName: p.contactName,
        bookingId: p.bookingItemId,
      }));
      setPayments(mapped);
    } catch (err) {
      console.error("payment fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-2 space-y-3">
      <div className="bg-white max-w-[400px] overflow-x-scroll lg:overflow-hidden md:max-w-full p-3 shadow-lg rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="text-[#374151]">
              <TableHead>PAYMENT ID</TableHead>
              <TableHead>CUSTOMER</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>AMOUNT</TableHead>
              <TableHead>BOOKINGS</TableHead>
              <TableHead>CREATION DATE</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <PaymentRowSkeleton key={i} />
                ))}
              </>

            ) : payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>No payments found</TableCell>
              </TableRow>
            ) : (
              payments.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-[#4B5563]">
                    {item.id}
                  </TableCell>



                  <TableCell className="text-[#4B5563]">
                    {item.contactName || "Unknown"}
                  </TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center gap-1 rounded-xl px-2 py-1
                      ${item.status === "PENDING"
                          ? "font-bold text-[#B5850B] bg-[#FFF6E9]"
                          : item.status === "DECLINED"
                            ? "font-bold text-[#B83131] bg-[#FFEAEA]"
                            : item.status === "CREATE"
                              ? "font-bold text-[#3D42AD] bg-[#EAECFF]"
                              : "text-[#165E3D] bg-[#EDFFEA]"
                        }`}
                    >
                      {item.status === "Pending" && <TiIconClockHour2 />}
                      {item.status === "Declined" && <TiIconCircleMinus />}
                      {item.status === "Create" && <TiIconFlag3 />}
                      {item.status === "Succeeded" && <TiIconCircleCheck />}

                      {item.status}
                    </div>
                  </TableCell>

                  <TableCell className="font-semibold text-[#4B5563]">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "INR",
                    }).format(item.amount)}
                  </TableCell>

                  <TableCell className=" text-blue-500   flex items-center gap-2">

                    <Link className="hover:underline cursor-pointer" to={`/bookings?id=${item.bookingId}`}>{item.serviceName}</Link>
                  </TableCell>

                  <TableCell className="text-[#4B5563]">
                    {item.date}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default withAuthorization("payments")(Payment);




const PaymentRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
      </TableCell>

      <TableCell>
        <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
      </TableCell>

      <TableCell>
        <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-xl" />
      </TableCell>

      <TableCell>
        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gray-200 animate-pulse rounded-full" />
          <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
        </div>
      </TableCell>

      <TableCell>
        <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
      </TableCell>
    </TableRow>
  );
};