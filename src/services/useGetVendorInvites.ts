import { useQuery } from "@tanstack/react-query";
import { getVendorInvites } from "@/helper/vendorInvites";
import { getAllVendors } from "@/helper/vendorDetails";

export const useGetVendorInvites = () => {
  return useQuery({
    queryKey: ["vendor-invites"],
    queryFn: () => getVendorInvites(),
  });
};

export const useGetVendors = (search: string) => {
  return useQuery({
    queryKey: ["list_vendors", search],
    queryFn: () => getAllVendors(search),
    enabled: !!search,
  });
};
