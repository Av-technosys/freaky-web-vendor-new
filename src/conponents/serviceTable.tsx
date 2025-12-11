/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router-dom";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui";
import { TiIconPencilPlus } from "./icons";
import DeleteServiceDialog from "./deleteServiceDialog";
import { useEffect, useState } from "react";

export function ServicesTable({ tableData }: any) {
  // const [status, setStatus] = useState(
  //   tableData?.ListData?.map((data: any, index: number) => {
  //     return data.status || [];
  //   })
  // );
  const [status, setStatus] = useState<any>([]);

  useEffect(() => {
    if (tableData?.ListData) {
      setStatus(tableData.ListData.map((data: any) => data.status));
    }
  }, [tableData]);

  console.log("tableData", tableData);
  const [checked, setChecked] = useState<any>("Active");
  console.log("status", status);
  const navigate = useNavigate();

  const statusChangeHandler = (value: any, index: number) => {
    setChecked(value);
    const updated = [...status];
    updated[index] = value === "Active" ? true : false;
    setStatus(updated);
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableData?.Headings?.map((heading: string, index: number) => {
            return (
              <TableHead
                key={index}
                className={`px-4 md:px-1 ${
                  heading === "Status" ? "md:pl-5" : ""
                }`}
              >
                {heading}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData?.ListData?.map((service: any, index: number) => (
          <TableRow className="text-center md:text-start" key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{service?.title}</TableCell>
            <TableCell>{service?.type}</TableCell>
            {/* <TableCell
              className={`${
                service.status == true ? "text-green-500" : "text-red-500"
              }`}
            >
              {service?.status == true ? "Active" : "Inactive"}
            </TableCell> */}
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {" "}
                    {status[index] == true ? "Active" : "Inactive"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuCheckboxItem
                    checked={status[index] === true}
                    onClick={() => statusChangeHandler("Active", index)}
                  >
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={status[index] === false}
                    onClick={() => statusChangeHandler("Inactive", index)}
                  >
                    Inactive
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
