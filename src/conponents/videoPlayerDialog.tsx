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
import { TiIconPlayerPlay } from "./icons";

const VideoPlayerDialog = ({ mediaUrl }: any) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="w-[80px] cursor-pointer border border-orange-600 rounded-md py-2 text-center font-bold text-[10px] text-orange-600">
            Preview Video
            <TiIconPlayerPlay
              className="w-full text-center"
              size="12"
              color="#D30000"
            />
          </button>
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
