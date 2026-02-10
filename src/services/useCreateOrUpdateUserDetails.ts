import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteProfileImageHandler,
  updateProfileImage,
  updateUserDetails,
} from "../helper/userDetails";

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

export const useUpdateProfileImage = () => {
  return useMutation({
    mutationFn: updateProfileImage,

    onError: () => {
      toast.error("Unable to update user image.");
    },
  });
};

export const useDeleteProfileImage = () => {
  return useMutation({
    mutationFn: deleteProfileImageHandler,
    onSuccess: () => {
      toast.success("Image Deleted Successfully.");
    },
    onError: () => {
      toast.error("Unable to delete image.");
    },
  });
};
