import { useQuery } from "@tanstack/react-query";
import { getVendorDetails, getVendorDocuments, getVendorOwners } from "../helper/vendorDetails";

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

export const useGetVendorOwnershipDetails = () => {
  return useQuery({
    queryKey: ["vendor-owners"],
    queryFn: () => getVendorOwners(),
  });
};
