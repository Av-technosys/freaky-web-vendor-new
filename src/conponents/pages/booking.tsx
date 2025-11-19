import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const data = [
  {
    id: "1",
    name: "Shang Chain",
    service: "System Architect",
    amount: 699,
    status: "Complete",
    location: "Tokyo",
    date: "22/5/2009 10:30AM",
  },
  {
    id: "2",
    name: "Kevin Lincoln",
    service: "Integration Specialist",
    amount: 242,
    status: "Pending",
    location: "New York",
    date: "22/5/2009 10:30AM",
  },
  {
    id: "3",
    name: "Milton Rose",
    service: "Accountant",
    amount: 655,
    status: "Complete",
    location: "San Francisco",
    date: "22/5/2009 10:30AM",
  },
  {
    id: "4",
    name: "Silas Ryan",
    service: "Technical Author",
    amount: 874,
    status: "Complete",
    location: "Edinburgh",
    date: "22/5/2009 10:30AM",
  },
  {
    id: "5",
    name: "Ben Tenison",
    service: "Software Engineer",
    amount: 541,
    status: "Cancel",
    location: "Delhi",
    date: "22/5/2009 10:30AM",
  },
  {
    id: "6",
    name: "Ben Tenison",
    service: "Software Engineer",
    amount: 541,
    status: "Cancel",
    location: "Delhi",
    date: "22/5/2009 10:30AM",
  },
  {
    id: "7",
    name: "Ben Tenison",
    service: "Software Engineer",
    amount: 541,
    status: "Pending",
    location: "Delhi",
    date: "22/5/2009 10:30AM",
  },
  {
    id: "8",
    name: "Ben Tenison",
    service: "Software Engineer",
    amount: 541,
    status: "Cancel",
    location: "Delhi",
    date: "22/5/2009 10:30AM",
  },
  {
    id: "9",
    name: "Silas Ryan",
    service: "Technical Author",
    amount: 874,
    status: "Pending",
    location: "Edinburgh",
    date: "22/5/2009 10:30AM",
  },
  {
    id: "10",
    name: "Silas Ryan",
    service: "Technical Author",
    amount: 874,
    status: "Complete",
    location: "Edinburgh",
    date: "22/5/2009 10:30AM",
  },
  {
    id: "11 ",
    name: "Silas Ryan",
    service: "Technical Author",
    amount: 874,
    status: "Cancel",
    location: "Edinburgh",
    date: "22/5/2009 10:30AM",
  },
];

const Booking = () => {
  return (
    <div className="my-2 space-y-3">
      <div className="max-w-[400px] overflow-x-scroll lg:overflow-hidden md:max-w-full p-3 shadow-lg rounded-lg border">
        <Table>
          <TableHeader className="text-[#89868D]  ">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date & Time</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id} className=" ">
                <TableCell className="font-medium flex items-center  gap-3 text-[#89868D]">
                  <Avatar>
                    <AvatarFallback className="text-xs   p-2   rounded-full bg-slate-200">
                      {item.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {item.name}
                </TableCell>
                <TableCell className="text-[#89868D]">{item.service}</TableCell>
                <TableCell className="text-[#89868D]">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(item.amount)}
                </TableCell>
                <TableCell className="text-[#89868D]">
                  {item.location}
                </TableCell>
                <TableCell
                  className={
                    item.status == "Pending"
                      ? "text-yellow-400 font-bold"
                      : item.status == "Cancel"
                      ? "text-red-500 font-bold"
                      : "text-green-400 font-bold"
                  }
                >
                  {item.status}
                </TableCell>
                <TableCell className="text-[#89868D]">{item.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Booking;
