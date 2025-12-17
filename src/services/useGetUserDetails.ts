import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../helper/userDetails";

export const useGetUserDetails = () => {
  return useQuery({
    queryKey: ["user-details"],
    queryFn: () => getUserDetails(),
  });
};
