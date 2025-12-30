/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui";
import { TiIconPencilPlus } from "./icons";
import { Badge } from "@/components/ui/badge";
import { Trash, Trash2 } from "lucide-react";
// import DeleteServiceDialog from "./deleteServiceDialog";

export function ServicesTable({ tableData }: any) {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("page_size")) || 2;
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow className=" *:font-bold *:text-gray-700 *:text-base">

          {/* <TableHead className=" w-24 px-4 md:px-1">
            Idx
          </TableHead> */}
          <TableHead className="">
            Title
          </TableHead>
          <TableHead className=" w-28">
            Available
          </TableHead>
          <TableHead className=" w-24">
            Type
          </TableHead>
          <TableHead className=" w-24">
            Price Type
          </TableHead>
          <TableHead className=" w-24">
            Action
          </TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData?.ListData?.map((service: any, index: number) => {
          // const rowNumber = (currentPage - 1) * limit + (index + 1);

          return (
            <TableRow className="text-center md:text-start" key={index}>
              {/* <TableCell>{rowNumber}</TableCell> */}
              <TableCell>{service?.productName}</TableCell>
              <TableCell className="capitalize">{service?.isProductAvailable ? <GreenBadge> yes</GreenBadge> : <RedBadge> no</RedBadge>}</TableCell>
              <TableCell className="capitalize">{service?.productType}</TableCell>
              <TableCell className="capitalize">{service?.priceType}</TableCell>

              <TableCell>
                <div className="w-full flex gap-1">
                  <Button
                    onClick={() =>
                      navigate(`/services/manage-service/${service.productId}`)
                    }
                    size={"sm"}
                    variant="ghost"
                  >
                    <TiIconPencilPlus color="#D30000" />
                  </Button>
                  {/* <DeleteServiceDialog /> */}
                  <Button
                    onClick={() =>
                      navigate(`/services/manage-service/${service.productId}`)
                    }
                    size={"sm"}
                    variant="ghost"
                  >
                    <Trash2 color="#D30000" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}


function RedBadge({ children }: any) {
  return (
    <Badge variant={"destructive"} className=" text-xs capitalize font-semibold bg-red-500">{children}</Badge>
  )
}

function GreenBadge({ children }: any) {
  return (
    <Badge variant={"default"} className=" text-xs capitalize font-semibold bg-green-500">{children}</Badge>
  )
}