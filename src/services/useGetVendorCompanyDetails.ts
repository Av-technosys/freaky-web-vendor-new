import { useQuery } from "@tanstack/react-query";
import { getVendorDetails, getVendorDocuments } from "../helper/vendorDetails";

export const useGetVendorDetails = () => {
  return useQuery({
    queryKey: ["vendor-details"],
    queryFn: () => getVendorDetails(),
  });
};

export const useGetVendorDocuments = () => {
  return useQuery({
    queryKey: ["vendor-documents"],
    queryFn: () => getVendorDocuments(),
  });
};
