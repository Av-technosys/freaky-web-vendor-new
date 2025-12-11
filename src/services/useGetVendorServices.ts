import { useQuery } from "@tanstack/react-query";
import {
  getPriceBookListById,
  getVendorServiceById,
  getVendorServices,
} from "../helper/vendorService";

export const useGetVendorServices = (
  token: any,
  page: number,
  page_size: number
) => {
  return useQuery({
    queryKey: ["vendor-services", page],
    queryFn: () => getVendorServices(token, page, page_size),
  });
};

export const useGetVendorServiceByServiceId = (token: any, productId: any) => {
  return useQuery({
    queryKey: ["vendor-services-by-id", productId],
    queryFn: () => getVendorServiceById(token, productId),
  });
};

export const useGetPriceBookListByServiceId = (token: any, productId: any) => {
  return useQuery({
    queryKey: ["price-book-list-by-id", productId],
    queryFn: () => getPriceBookListById(token, productId),
  });
};
