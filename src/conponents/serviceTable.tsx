/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router-dom";
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

export function ServicesTable(tableData: any) {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableData?.tableData?.Headings?.map(
            (heading: string, index: number) => {
              return (
                <TableHead key={index} className="px-4 md:px-1">
                  {heading}
                </TableHead>
              );
            }
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData?.tableData?.ListData?.map((service: any, index: number) => (
          <TableRow className="text-center md:text-start" key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{service?.title}</TableCell>
            <TableCell>{service?.type}</TableCell>
            <TableCell
              className={`${
                service.status == true ? "text-green-500" : "text-red-500"
              }`}
            >
              {service?.status == true ? "True" : "False"}
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
                <DeleteServiceDialog />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
