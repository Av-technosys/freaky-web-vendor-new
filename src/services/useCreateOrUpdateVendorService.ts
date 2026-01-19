import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createVendorService,
  deleteBannerImageHandler,
  deleteImageHandler,
  deleteVendorServiceById,
  updateVendorService,
} from "../helper/vendorService";

export const useCreateVendorService = () => {
  return useMutation({
    mutationFn: createVendorService,
    onSuccess: () => {
      toast.success("Service created Successfully.");
    },
    onError: () => {
      toast.error("Unable to create service.");
    },
  });
};

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

export const useDeleteBannerImage = () => {
  return useMutation({
    mutationFn: deleteBannerImageHandler,
    onSuccess: () => {
      toast.success("Image Deleted Successfully.");
    },
    onError: () => {
      toast.error("Unable to delete image.");
    },
  });
};

export const useDeleteVendorServiceById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVendorServiceById,
    onSuccess: () => {
      toast.success("Service Deleted Successfully.");
      queryClient.invalidateQueries({
        queryKey: ["vendor-services"],
      });
    },
    onError: () => {
      toast.error("Unable to delete service.");
    },
  });
};
