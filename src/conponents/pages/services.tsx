import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Card, CardContent, CardHeader } from "../../components/ui";
import { TiIconBriefcase } from "../icons";
import { ServicesTable } from "../serviceTable";
import { useGetVendorServices } from "../../services/useGetVendorServices";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

const Services = () => {
  const navigate = useNavigate();
  const pageSize = 2;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isPending } = useGetVendorServices(page, pageSize);

  const services = data?.data;

  const totalPages = data?.pagination?.total_pages;

  const tableData = {
    Headings: ["ID", "Services", "Categories", "Status", "Action"],
    ListData: services,
  };

  return (
    <div className="my-2 space-y-3">
      <div className="w-full! flex gap-3 items-center justify-start">
        <Button
          onClick={() => navigate("/services/manage-service")}
          className=" px-6 cursor-pointer"
        >
          Add New
        </Button>
        <Button
          onClick={() => navigate("/services/manage-payment-book")}
          className=" px-6 cursor-pointer"
        >
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
        <ServicesTable tableData={tableData} isPending={isPending} />
        <div className="mt-5">
          <Pagination>
            <PaginationContent>
              <PaginationItem className="border border-gray-200 rounded-md">
                <PaginationPrevious
                  className={`cursor-pointer ${
                    page == 1 && "pointer-events-none opacity-50"
                  }`}
                  onClick={() =>
                    navigate(`?page=${page - 1}&page_size=${pageSize}`)
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, index: any) => {
                return (
                  <PaginationItem
                    onClick={() =>
                      navigate(`?page=${index + 1}&page_size=${pageSize}`)
                    }
                    className={`border border-gray-200 rounded-md ${
                      page == index + 1 && "text-orange-500"
                    }`}
                  >
                    <PaginationLink href="#">{index + 1}</PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem className="border border-gray-200 rounded-md">
                <PaginationNext
                  className={`cursor-pointer  ${
                    page == totalPages && "pointer-events-none opacity-50"
                  }`}
                  onClick={() =>
                    navigate(`?page=${page + 1}&page_size=${pageSize}`)
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
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
