import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getSearchedItems,
  getVendorDetails,
  getVendorDocuments,
  getVendorEmployees,
  getVendorNotifications,
  getVendorOwners,
} from "../helper/vendorDetails";

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

export const useGetVendorEmployees = () => {
  return useQuery({
    queryKey: ["vendor-employees"],
    queryFn: () => getVendorEmployees(),
  });
};

export const useGetVendorNotifications = (enabled:any) => {
  return useInfiniteQuery({
    queryKey: ["vendor-notifications"],
    queryFn: ({ pageParam }) => getVendorNotifications({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextPage : undefined;
    },
    enabled,
  });
};

export const useGetSearchItems = ({ service, debouncedSearch }: any) => {
  return useQuery({
    queryKey: ["search-items", debouncedSearch],
    queryFn: () => getSearchedItems({ service, debouncedSearch }),
    enabled: !!debouncedSearch?.trim(),
  });
};
