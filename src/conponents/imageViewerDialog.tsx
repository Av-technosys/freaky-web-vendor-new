import { Button } from "../components/ui";
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

const ImageViewerDialog = ({ mediaUrl }: any) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"outline"}
            className="absolute top-14 right-14 cursor-pointer  h-7 w-7 hidden group-hover:flex"
          >
            <TiIconPlayerPlay size="12" color="#D30000" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="md:max-w-4xl  ">
          <AlertDialogHeader>
            <AlertDialogDescription>
              <Alert className=" text-destructive border-none">
                <AlertDescription>
                  <div className="w-full h-96">
                    <img
                      className="w-full h-full object-cover"
                      src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${mediaUrl}`}
                      alt="uploaded"
                    />
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

export default ImageViewerDialog;
