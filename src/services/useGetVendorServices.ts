import { useQuery } from "@tanstack/react-query";
import {
  getVendorServiceById,
  getVendorServices,
} from "../helper/vendorService";

export const useGetVendorServices = (
  page: number,
  page_size: number
) => {
  return useQuery({
    queryKey: ["vendor-services", page],
    queryFn: () => getVendorServices( page, page_size),
  });
};

export const useGetVendorServiceByServiceId = ( productId: any) => {
  return useQuery({
    queryKey: ["vendor-services-by-id"],
    queryFn: () => getVendorServiceById( productId),
  });
};
