import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateVendorService } from "../helper/vendorService";

export const useUpdateVendorService = () => {
  return useMutation({
    mutationFn: updateVendorService,
    onSuccess: () => {
      toast.success("Service Updated Successfully.");
    },
    onError: () => {
      toast.error("Unable to update service.");
    },
  });
};