import { Button } from "../../components/ui";
import { TiIconBriefcase } from "../icons";
import { TableDemo } from "../table";

const Services = () => {
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
    <>
      <div className="!w-full mb-5 flex gap-3 items-center justify-start">
        <Button className="bg-[#FF6020] px-6" type="submit">
          Add New
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="col-span-1 flex flex-col  gap-5 p-3 rounded-lg shadow-lg">
          <div className="w-full flex items-center justify-between">
            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-[#ffe491]">
              <TiIconBriefcase />
            </div>
            <p className="text-[#8B8D97] ">All Time</p>
          </div>
          <div className="w-full flex items-center justify-between">
            <div>
              <p className="text-[#8B8D97] text-[13px]">All Services</p>
              <p>125</p>
            </div>
            <div>
              <p className="text-[#8B8D97] text-[13px]">Unpublished</p>
              <p>52</p>
            </div>
            <div>
              <p className="text-[#8B8D97] text-[13px]">Published</p>
              <p>103</p>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col  gap-5 p-3 rounded-lg shadow-lg">
          <div className="w-full flex items-center justify-between">
            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-[#ffe491]">
              <TiIconBriefcase />
            </div>
            <p className="text-[#8B8D97] ">All Time</p>
          </div>
          <div className="w-full flex items-center justify-between">
            <div>
              <p className="text-[#8B8D97] text-[13px]">Category</p>
              <p>03</p>
            </div>
            <div>
              <p className="text-[#8B8D97] text-[13px]">Avg Pricing</p>
              <p>430$</p>
            </div>
            <div>
              <p className="text-[#8B8D97] text-[13px]">Done</p>
              <p>Done</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-sm overflow-x-scroll lg:overflow-hidden md:max-w-7xl p-3 shadow-lg  my-5 rounded-lg">
        <TableDemo tableData={tableData} />
      </div>
    </>
  );
};

export default Services;
