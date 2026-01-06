import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteImageHandler,
  deleteVendorServiceById,
  updateVendorService,
} from "../helper/vendorService";

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

export const useDeleteAdditionalImage = () => {
  return useMutation({
    mutationFn: deleteImageHandler,
    onSuccess: () => {
      toast.success("Image Deleted Successfully.");
    },
    onError: () => {
      toast.error("Unable to delete image.");
    },
  });
};

export const useDeleteVendorServiceById = () => {
  return useMutation({
    mutationFn: deleteVendorServiceById,
    onSuccess: () => {
      toast.success("Service Deleted Successfully.");
    },
    onError: () => {
      toast.error("Unable to delete service.");
    },
  });
};
