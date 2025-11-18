/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui";

export function TableDemo(tableData: any) {
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
        {tableData?.tableData?.ListData?.map((invoice: any, index: number) => (
          <TableRow className="text-center md:text-start" key={index}>
            <TableCell>{invoice?.id}</TableCell>
            <TableCell>{invoice?.service}</TableCell>
            <TableCell>{invoice?.category}</TableCell>
            <TableCell>{invoice?.price}</TableCell>
            <TableCell>{invoice?.discount}</TableCell>
            <TableCell>{invoice?.status}</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
