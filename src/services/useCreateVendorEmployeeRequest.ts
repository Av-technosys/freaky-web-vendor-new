import { createVendorEmployeeRequest } from "@/helper/vendorInvites";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateVendorEmployeeRequest = () => {
  return useMutation({
    mutationFn: createVendorEmployeeRequest,
    onSuccess: () => {
      toast.success("Request send successfully.");
    },
    onError: (data) => {
      toast.error(
        data?.message == "Request failed with status code 409"
          ? "Request already exists."
          : "Something went wrong"
      );
    },
  });
};
