import { cn } from "@/lib/utils";
import { Button } from "../components/ui";

import { TiIconPlayerPlay } from "./icons";
import { Dialog, DialogClose, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";


const ImageViewerDialog = ({ mediaUrl, className = "" }: any) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn("h-7 w-7", className)}>
          <TiIconPlayerPlay size="12" color="#D30000" />
        </Button>
      </DialogTrigger>

      <DialogContent className=" p-2">

        <div className="w-ful ">
          <img
            className="w-full h-full object-contain"
            src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${mediaUrl}`}
            alt="uploaded"
          />
        </div>
        <DialogFooter>
          <Button variant={"outline"}>
            <DialogClose>Cancel</DialogClose>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewerDialog;
