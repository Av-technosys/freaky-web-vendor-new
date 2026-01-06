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

export function ServicesTable({ tableData }: any) {
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
              <TableHead key={index} className="px-4 md:px-1">
                {heading}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData?.ListData?.map((service: any, index: number) => {
          const rowNumber = (currentPage - 1) * limit + (index + 1);

          return (
            <TableRow className="text-center md:text-start" key={index}>
              <TableCell>{rowNumber}</TableCell>
              <TableCell>{service?.title}</TableCell>
              <TableCell>{service?.type}</TableCell>
              <TableCell
                className={service.status ? "text-green-500" : "text-red-500"}
              >
                {service.status ? "True" : "False"}
              </TableCell>

              <TableCell>
                <div className="w-full flex gap-1">
                  <Button
                    onClick={() =>
                      navigate(`/services/manage-service/${service.productId}`)
                    }
                    variant="outline"
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
