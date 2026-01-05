import { TriangleAlertIcon } from "lucide-react";
import { Button } from "../components/ui";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { TiIconTrash } from "./icons";
import { useDeleteVendorServiceById } from "@/services/useCreateOrUpdateVendorService";
import { useQueryClient } from "@tanstack/react-query";

const DeleteServiceDialog = ({ serviceId }: any) => {
  const deleteServiceMutation = useDeleteVendorServiceById();
  const queryClient = useQueryClient();

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"outline"}>
            <TiIconTrash color="#D30000" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <Alert className="bg-destructive/10 text-destructive border-none">
                <TriangleAlertIcon />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription className="text-destructive/80">
                  Deleting from this will permanent delete it from services
                </AlertDescription>
              </Alert>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteServiceMutation.mutate(serviceId, {
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      queryKey: ["vendor-services"],
                    });
                  },
                });
              }}
            >
              {" "}
              {deleteServiceMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteServiceDialog;
