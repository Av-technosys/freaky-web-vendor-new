import { useQueryClient } from "@tanstack/react-query";
import { Button, Card } from "../components/ui";
import { useDeleteAdditionalImage } from "../services/useCreateOrUpdateVendorService";
import { TiIconTrash } from "./icons";
import ImageViewerDialog from "./imageViewerDialog";
import VideoPlayerDialog from "./videoPlayerDialog";
import { useGetImageUrl, useUploadImage } from "../services/useUploadImage";
import { useParams } from "react-router-dom";
import uploadImage from "../assets/uploadImage.png";
import {
  MAX_HEIGHT,
  MAX_SIZE,
  MAX_VIDEO_SIZE,
  MAX_WIDTH,
} from "@/components/calendar/constants";
import { toast } from "sonner";

const ServiceAdditionalPhotos = ({
  mediaImages,
  setVideoUrl,
  setMediaImages,
  setAdditionalImagesUrl,
}: any) => {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const deleteImageMutation = useDeleteAdditionalImage();
  const getImageUrlMutation = useGetImageUrl();
  const uploadImageMutation = useUploadImage();

  const productMediaImages =
    mediaImages.filter((item: any) => item.mediaType === "image") ?? [];

  const productVideos =
    mediaImages.filter((item: any) => item.mediaType === "video") ?? [];

  const handleAdditionalImages = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_SIZE) {
      toast.error("Image size is too large to upload", {
        style: {
          color: "#dc2626",
          border: "1px solid #dc2626",
        },
      });
      e.target.value = "";
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = async () => {
      if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
        toast.error(
          `Image dimensions too large. Max allowed ${MAX_WIDTH}x${MAX_HEIGHT}px`,
          {
            style: {
              color: "#dc2626",
              border: "1px solid #dc2626",
            },
          }
        );
        e.target.value = "";
        URL.revokeObjectURL(objectUrl);
        return;
      }

      URL.revokeObjectURL(objectUrl);

      const imageData = {
        fileName: file.name,
        fileType: file.type,
        path: "productMedia",
      };

      const uploadRes = await getImageUrlMutation.mutateAsync({
        data: imageData,
      });

      if (uploadRes?.data?.uploadUrl) {
        await uploadImageMutation.mutateAsync({
          url: uploadRes.data.uploadUrl,
          file,
        });

        setMediaImages((prev: any) => [
          ...prev,
          {
            mediaType: "image",
            mediaUrl: uploadRes.data.filePath,
          },
        ]);

        setAdditionalImagesUrl((prev: any) => [
          ...prev,
          uploadRes.data.filePath,
        ]);
      }
    };

    img.onerror = () => {
      alert("Invalid image file");
      e.target.value = "";
      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  };

  const handleVideo = async (e: any) => {
    const file = e.target.files?.[0];

    if (file.size > MAX_VIDEO_SIZE) {
      toast.error("Video size is too large to upload", {
        style: {
          color: "#dc2626",
          border: "1px solid #dc2626",
        },
      });
      e.target.value = "";
      return;
    }

    const videoData = {
      fileName: file.name,
      fileType: file.type,
      path: "productMedia",
    };

    if (file.name) {
      const UploadUrl = await getImageUrlMutation.mutateAsync({
        data: videoData,
      });
      setVideoUrl(UploadUrl?.data.filePath);
      if (UploadUrl?.data.uploadUrl) {
        const url = UploadUrl?.data.uploadUrl;
        uploadImageMutation.mutate({ url, file });
      }
    }
  };

  const imageDeleteHandler = (id: number) => {
    deleteImageMutation.mutate(id, {
      onSuccess: () => {
        setMediaImages((prev: any) =>
          prev.filter((item: any) => item.id !== id)
        );

        queryClient.invalidateQueries({
          queryKey: ["vendor-services-by-id"],
        });
      },
    });
  };

  return (
    <>
      <div>
        <span className="text-[#5E6366]">Additional Photos</span>
        <div className="grid grid-cols-2 gap-3">
          {productId ? (
            <>
              {Array.from({ length: 5 }).map((_, index) => {
                const mediaUrl = productMediaImages[index];

                if (mediaUrl) {
                  return (
                    <Card
                      key={`media-${index}`}
                      className="group relative flex items-center justify-center 
                     h-[140px] rounded-lg bg-[#F4F5FA]"
                    >
                      <Button
                        onClick={() => imageDeleteHandler(mediaUrl.id)}
                        variant="outline"
                        className="absolute top-14 right-5 cursor-pointer hidden group-hover:flex 
                       h-7 w-7 p-0 items-center justify-center"
                      >
                        <TiIconTrash color="#D30000" />
                      </Button>

                      <ImageViewerDialog mediaUrl={mediaUrl?.mediaUrl} />

                      <div className="w-20 h-20 rounded-full overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${
                            mediaUrl.mediaUrl
                          }`}
                          alt="uploaded"
                        />
                      </div>
                    </Card>
                  );
                } else {
                  return (
                    <Card
                      key={`image-${index}`}
                      className="flex flex-col items-center justify-center 
                 h-[140px] gap-2 rounded-lg bg-[#F4F5FA]"
                    >
                      <div className="w-10 h-10 rounded-md overflow-hidden">
                        <img
                          className="w-full h-full object-contain"
                          src={uploadImage}
                          alt="upload image"
                        />
                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        className="w-[90px] text-[10px]
                   bg-[#E1E2E9] rounded-md p-1 cursor-pointer"
                        onChange={handleAdditionalImages}
                      />
                    </Card>
                  );
                }
              })}

              {Array.from({ length: 1 }).map((_, index) => {
                const mediaUrl = productVideos[index];

                if (mediaUrl) {
                  return (
                    <Card
                      className="flex flex-col items-center justify-center 
                     h-[140px] gap-4 rounded-lg bg-[#F4F5FA]"
                    >
                      <VideoPlayerDialog mediaUrl={mediaUrl?.mediaUrl} />

                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleVideo(e)}
                        className="w-[90px] text-[10px]
                       bg-[#E1E2E9] rounded-md p-1 cursor-pointer"
                      />
                    </Card>
                  );
                } else {
                  return (
                    <Card
                      className="flex flex-col items-center justify-center 
                     h-[140px] gap-2 rounded-lg bg-[#F4F5FA]"
                    >
                      <p className="w-full text-center font-bold text-[10px]">
                        Upload Video
                      </p>

                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleVideo(e)}
                        className="w-[90px] text-[10px]
                       bg-[#E1E2E9] rounded-md p-1 cursor-pointer"
                      />
                    </Card>
                  );
                }
              })}
            </>
          ) : (
            <>
              {Array.from({ length: 5 }).map((_, index) => {
                const mediaUrl = productMediaImages[index]?.mediaUrl;
                if (mediaUrl) {
                  return (
                    <img
                      src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${mediaUrl}`}
                    />
                  );
                } else {
                  return (
                    <Card
                      key={`image-${index}`}
                      className="flex flex-col items-center justify-center 
                 h-[140px] gap-2 rounded-lg bg-[#F4F5FA]"
                    >
                      <div className="w-10 h-10 rounded-md overflow-hidden">
                        <img
                          className="w-full h-full object-contain"
                          src={uploadImage}
                          alt="upload image"
                        />
                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        className="w-[90px] text-[10px]
                   bg-[#E1E2E9] rounded-md p-1 cursor-pointer"
                        onChange={handleAdditionalImages}
                      />
                    </Card>
                  );
                }
              })}

              <Card
                className="flex flex-col items-center justify-center 
                     h-[140px] gap-2 rounded-lg bg-[#F4F5FA]"
              >
                <p className="w-full text-center font-bold text-[10px]">
                  Upload Video
                </p>

                <input
                  type="file"
                  accept="video/*"
                  className="w-[90px] text-[10px]
                       bg-[#E1E2E9] rounded-md p-1 cursor-pointer"
                />
              </Card>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ServiceAdditionalPhotos;
