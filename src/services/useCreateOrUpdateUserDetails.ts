import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserDetails } from "../helper/userDetails";

export const useUpdateUserDetails = () => {
  return useMutation({
    mutationFn: updateUserDetails,
    onSuccess: () => {
      toast.success("User details updated successfully.");
    },
    onError: () => {
      toast.error("Unable to updated user details.");
    },
  });
};
