"use client";

import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
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

const data = [
  {
    id: "06c1774-713d-46ad...90a8",
    status: "Succeeded",
    amount: 19623,
    method: "•••• 4242",
    date: "Mar 23, 2022, 13:00 PM",
  },
  {
    id: "06c1774-713d-46ad...90a8",
    status: "Pending",
    amount: 6623,
    method: "•••• 2332",
    date: "Mar 23, 2022, 13:00 PM",
  },
  {
    id: "06c1774-713d-46ad...90a8",
    status: "Declined",
    amount: 1623.53,
    method: "NuPay",
    date: "Mar 23, 2022, 13:00 PM",
  },
  {
    id: "06c1774-713d-46ad...90a8",
    status: "Succeeded",
    amount: 56623,
    method: "Mercado Pago",
    date: "Mar 23, 2022, 13:00 PM",
  },
  {
    id: "06c1774-713d-46ad...90a8",
    status: "Create",
    amount: 130,
    method: "Bank transfer",
    date: "Mar 23, 2022, 13:00 PM",
  },
  {
    id: "06c1774-713d-46ad...90a8",
    status: "Succeeded",
    amount: 19623,
    method: "•••• 4242",
    date: "Mar 23, 2022, 13:00 PM",
  },
  {
    id: "06c1774-713d-46ad...90a8",
    status: "Pending",
    amount: 6623,
    method: "•••• 2332",
    date: "Mar 23, 2022, 13:00 PM",
  },
  {
    id: "06c1774-713d-46ad...90a8",
    status: "Declined",
    amount: 1623.53,
    method: "NuPay",
    date: "Mar 23, 2022, 13:00 PM",
  },
  {
    id: "06c1774-713d-46ad...90a8",
    status: "Succeeded",
    amount: 56623,
    method: "Mercado Pago",
    date: "Mar 23, 2022, 13:00 PM",
  },
  {
    id: "06c1774-713d-46ad...90a8",
    status: "Create",
    amount: 130,
    method: "Bank transfer",
    date: "Mar 23, 2022, 13:00 PM",
  },
];

export default function Payment() {
  return (
    <div className="my-2 space-y-3">
      <div className="  max-w-[400px] overflow-x-scroll lg:overflow-hidden md:max-w-full p-3 shadow-lg rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="text-[#374151]">
              <TableHead>PAYMENT ID</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>AMOUNT</TableHead>
              <TableHead>P. METHOD</TableHead>
              <TableHead>CREATION DATE</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-[#4B5563] ">{item.id}</TableCell>

                <TableCell>
                  <div
                    className={`
      inline-flex items-center gap-1 rounded-xl px-2 py-1
      ${
        item.status === "Pending"
          ? "font-bold text-[#B5850B] bg-[#FFF6E9]"
          : item.status === "Declined"
          ? "font-bold text-[#B83131] bg-[#FFEAEA]"
          : item.status === "Create"
          ? "font-bold text-[#3D42AD] bg-[#EAECFF]"
          : "text-[#165E3D] bg-[#EDFFEA] "
      }
    `}
                  >
                    {item.status === "Pending" && <TiIconClockHour2 />}
                    {item.status === "Declined" && <TiIconCircleMinus />}
                    {item.status === "Create" && <TiIconFlag3 />}
                    {item.status === "Succeeded" && <TiIconCircleCheck />}

                    {item.status}
                  </div>
                </TableCell>

                {/* Amount */}
                <TableCell className="font-semibold text-[#4B5563]">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(item.amount)}
                  {""} <span className="text-[#959BA4] text-xs">USD</span>
                </TableCell>

                {/* Payment Method */}
                <TableCell className="text-[#4B5563] flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback className="text-xs   p-2   rounded-full bg-slate-200">
                      A
                    </AvatarFallback>
                  </Avatar>
                  {item.method}
                </TableCell>

                {/* Date */}
                <TableCell className="text-[#4B5563]">{item.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
