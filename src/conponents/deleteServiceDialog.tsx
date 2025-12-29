import { TriangleAlertIcon } from "lucide-react";
import { Button } from "../components/ui";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const DeleteWarningDialog = ({ isOpen, setOpen, priceBook }: any) => {
  function onCancel() {
    setOpen(false)
  }
  function onSuccess() {
    setOpen(false)
  }
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`Delete ${priceBook?.name} `}</DialogTitle>
          </DialogHeader>
          <Alert variant={"destructive"} className=" border-none p-0">
            <TriangleAlertIcon />
            <AlertTitle>{"Warning"}</AlertTitle>
            <AlertDescription className="text-destructive/80">
              {"Deleting this price book will permanent delete all the price enteries associated withe this price boook."}
            </AlertDescription>
          </Alert>
          <DialogFooter>
            <Button variant={"outline"} onClick={onCancel}>Cancel</Button>
            <Button variant="destructive" onClick={onSuccess}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteWarningDialog;

{/*   <AlertDialog open={isOpen} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title || "Are you sure?"}</AlertDialogTitle>
            <AlertDialogContent>
              <Alert variant={"destructive"} className=" border-none p-0">
                <TriangleAlertIcon />
                <AlertTitle>{subTitle || "Warning"}</AlertTitle>
                <AlertDescription className="text-destructive/80">
                  {description || "Deleting from this will permanent delete it from services"}
                </AlertDescription>
              </Alert>
            </AlertDialogContent>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant={"outline"} onClick={onCancel}>Cancel</Button>
            <Button variant="destructive" onClick={onSuccess}>Delete</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}