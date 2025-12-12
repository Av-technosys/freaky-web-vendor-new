import { useMutation } from "@tanstack/react-query";
import { getImageUrlHandler, UploadImageHandler } from "../helper/uploadImage";
import { toast } from "sonner";

export const useGetImageUrl = () => {
  return useMutation({
    mutationFn: ({ data}: any) => getImageUrlHandler(data),
    onSuccess: () => {},
    onError: () => {},
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: ({ url, file }: any) => UploadImageHandler(url, file),
    onSuccess: () => {
      toast.success("Image Upload Successfully.");
    },
    onError: () => {
      toast.error("Unable to upload image.");
    },
  });
};
