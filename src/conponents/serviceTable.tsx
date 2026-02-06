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
import DeleteServiceDialog from "./deleteServiceDialog";

import { cn } from "@/lib/utils";
import { SkeletonTable } from "@/components/skletob/table";

export function ServicesTable({ tableData, isPending }: any) {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("page_size")) || 2;
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableData?.Headings?.map((heading: string, index: number) => {
            return (
              <TableHead key={index} className={cn(" text-gray-800 font-semibold  px-4 md:px-1", heading === "Action" && "text-end")}>
                {heading}
              </TableHead>
            );
          })}
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

        {tableData?.ListData?.map((service: any, index: number) => {
          const rowNumber = (currentPage - 1) * limit + (index + 1);

          return (
            <TableRow className="text-center md:text-start" key={index}>
              <TableCell className="text-gray-700 font-medium">{rowNumber}</TableCell>
              <TableCell className="text-gray-700 font-medium">{service?.title}</TableCell>
              <TableCell className="text-gray-700 font-medium">{service?.productType}</TableCell>
              <TableCell className="text-gray-700 font-medium">
                <div className="w-full justify-end flex gap-1">
                  <Button
                    onClick={() =>
                      navigate(`/services/manage-service/${service.productId}`)
                    }
                    variant="ghost"
                  >
                    <TiIconPencilPlus color="#D30000" />
                  </Button>
                  <DeleteServiceDialog serviceId={service.productId} />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
