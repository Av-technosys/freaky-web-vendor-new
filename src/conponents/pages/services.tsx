import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardHeader } from "../../components/ui";
import { TiIconBriefcase } from "../icons";
import { TableDemo } from "../table";

const Services = () => {
  const navigate=useNavigate();
  const tableData = {
    Headings: [
      "ID",
      "Services",
      "Categories",
      "Price",
      "Discount",
      "Status",
      "Action",
    ],
    ListData: [
      {
        id: 1,
        service: "service-1",
        category: "general",
        price: "₹199",
        discount: "10%",
        status: "Published",
      },
      {
        id: 2,
        service: "service-2",
        category: "cleaning",
        price: "₹299",
        discount: "15%",
        status: "Draft",
      },
      {
        id: 3,
        service: "service-3",
        category: "maintenance",
        price: "₹499",
        discount: "20%",
        status: "Published",
      },
      {
        id: 4,
        service: "service-4",
        category: "plumbing",
        price: "₹249",
        discount: "5%",
        status: "Published",
      },
      {
        id: 5,
        service: "service-5",
        category: "general",
        price: "₹350",
        discount: "25%",
        status: "Unpublished",
      },
      {
        id: 6,
        service: "service-6",
        category: "electric",
        price: "₹600",
        discount: "10%",
        status: "Published",
      },
      {
        id: 7,
        service: "service-7",
        category: "repair",
        price: "₹450",
        discount: "12%",
        status: "Draft",
      },
      {
        id: 8,
        service: "service-8",
        category: "general",
        price: "₹150",
        discount: "8%",
        status: "Published",
      },
      {
        id: 9,
        service: "service-9",
        category: "cleaning",
        price: "₹220",
        discount: "10%",
        status: "Published",
      },
      {
        id: 10,
        service: "service-10",
        category: "maintenance",
        price: "₹550",
        discount: "15%",
        status: "Published",
      },
      {
        id: 11,
        service: "service-11",
        category: "electric",
        price: "₹700",
        discount: "18%",
        status: "Unpublished",
      },
      {
        id: 12,
        service: "service-12",
        category: "plumbing",
        price: "₹144",
        discount: "10%",
        status: "Published",
      },
      {
        id: 13,
        service: "service-13",
        category: "general",
        price: "₹320",
        discount: "12%",
        status: "Draft",
      },
      {
        id: 14,
        service: "service-14",
        category: "repair",
        price: "₹270",
        discount: "20%",
        status: "Published",
      },
      {
        id: 15,
        service: "service-15",
        category: "cleaning",
        price: "₹190",
        discount: "10%",
        status: "Published",
      },
      {
        id: 16,
        service: "service-16",
        category: "general",
        price: "₹250",
        discount: "15%",
        status: "Unpublished",
      },
      {
        id: 17,
        service: "service-17",
        category: "electric",
        price: "₹520",
        discount: "10%",
        status: "Published",
      },
      {
        id: 18,
        service: "service-18",
        category: "repair",
        price: "₹470",
        discount: "5%",
        status: "Published",
      },
      {
        id: 19,
        service: "service-19",
        category: "maintenance",
        price: "₹390",
        discount: "25%",
        status: "Draft",
      },
      {
        id: 20,
        service: "service-20",
        category: "general",
        price: "₹310",
        discount: "10%",
        status: "Published",
      },
    ],
  };
  return (
    <div className="my-2 space-y-3">
      <div className="w-full! flex gap-3 items-center justify-start">
        <Button onClick={()=> navigate("/services/create-service")}  className=" px-6">
          Add New
        </Button>
        <Button onClick={()=> navigate("/services/manage-payment-book")}  className=" px-6">
          Manage Payment Book
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="col-span-1 flex flex-col  gap-5">
          <CardHeader>
            <div className="w-full flex items-center justify-between">
              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-[#ffe491]">
                <TiIconBriefcase />
              </div>
              <p className="text-[#8B8D97] ">All Time</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full flex items-center justify-between">
              <StatusCardItem title={"All Services"} value={125} />
              <StatusCardItem title={"Unpublished"} value={52} />
              <StatusCardItem title={"Published"} value={103} />
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 flex flex-col  gap-5 p-3 rounded-lg shadow-lg">
          <CardHeader>
            <div className="w-full flex items-center justify-between">
              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-[#ffe491]">
                <TiIconBriefcase />
              </div>
              <p className="text-[#8B8D97] ">All Time</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full flex items-center justify-between">
              <StatusCardItem title={"Category"} value={23} />
              <StatusCardItem title={"Avg Pricing"} value={430} />
              <StatusCardItem title={"Done"} value={23} />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="max-w-[400px] bg-white overflow-x-scroll lg:overflow-hidden md:max-w-full p-3 shadow-lg rounded-lg">
        <TableDemo tableData={tableData} />
      </div>
    </div>
  );
};

export default Services;

function StatusCardItem({ title, value }: { title: string; value: number }) {
  return (
    <div>
      <p className="text-[#8B8D97] text-[13px]">{title}</p>
      <p>{value}</p>
    </div>
  );
}
