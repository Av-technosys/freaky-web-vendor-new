import { Button } from "@/components/ui";
import { TiIconPlayerPlay, TiIconTrash } from "./icons";
import { useDeleteAdditionalImage } from "@/services/useCreateOrUpdateVendorService";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";

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
      <Dialog>
        <DialogTrigger asChild>
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
        </DialogTrigger>
        <DialogContent className="md:max-w-4xl  ">
          <DialogHeader>
            <DialogDescription>
              <div className="w-full ">
                <video
                  className="w-full h-96"
                  src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${mediaUrl}`}
                  controls
                ></video>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline"><DialogClose>Cancel</DialogClose></Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoPlayerDialog;
