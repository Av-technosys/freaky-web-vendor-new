import { TriangleAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./ui/alert-dialog";
import { useDeletePriceBook } from "@/services/useDeletePriceBook";
import { useQueryClient } from "@tanstack/react-query";

interface DeletePricebookDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    priceBookId: string;
}

export default function DeletePricebookDialog({
    isOpen,
    onOpenChange,
    priceBookId
}: DeletePricebookDialogProps) {
    const { mutate: deletePriceBook, isPending } = useDeletePriceBook();
    const queryClient = useQueryClient();

    const handleDelete = () => {
        deletePriceBook(priceBookId, {
            onSuccess: () => {
                onOpenChange(false);
                queryClient.invalidateQueries({ queryKey: ["vendor-pricebooks"] });
            }
        });
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        <Alert className="bg-destructive/10 text-destructive border-none">
                            <TriangleAlertIcon className="h-4 w-4" />
                            <AlertTitle>Warning</AlertTitle>
                            <AlertDescription className="text-destructive/80">
                                The prices associated with this pricebook will be deleted permanently.
                            </AlertDescription>
                        </Alert>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={(e) => {
                        e.preventDefault();
                        handleDelete();
                    }}
                        disabled={isPending}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
