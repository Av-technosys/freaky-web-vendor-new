import { Button } from "@/components/ui";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { TiIconPlayerPlay, TiIconTrash } from "./icons";
import { useDeleteAdditionalImage } from "@/services/useCreateOrUpdateVendorService";
import { useQueryClient } from "@tanstack/react-query";

const VideoPlayerDialog = ({ mediaUrl, setMediaImages, videoId }: any) => {
  const queryClient = useQueryClient();

  const deleteImageMutation = useDeleteAdditionalImage();

  const imageDeleteHandler = (videoId: number) => {
    deleteImageMutation.mutate(videoId, {
      onSuccess: () => {
        setMediaImages((prev: any) =>
          prev.filter((item: any) => item.productId !== videoId)
        );

        queryClient.invalidateQueries({
          queryKey: ["vendor-services-by-id"],
        });
      },
    });
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className=" flex gap-2 items-center justify-center cursor-pointer  rounded-md py-2 text-center font-bold text-[10px] text-orange-600">
            <Button variant={"outline"}>
              <TiIconPlayerPlay
                className="w-full text-center "
                size="12"
                color="#D30000"
              />
            </Button>
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                imageDeleteHandler(videoId);
              }}
            >
              <TiIconTrash
                className="w-full text-center "
                size="12"
                color="#D30000"
              />
            </Button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="md:max-w-4xl  ">
          <AlertDialogHeader>
            <AlertDialogDescription>
              <Alert className=" text-destructive border-none">
                <AlertDescription>
                  <div className="w-full ">
                    <video
                      className="w-full h-96"
                      src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${mediaUrl}`}
                      controls
                    ></video>
                  </div>
                </AlertDescription>
              </Alert>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default VideoPlayerDialog;
