import { deletePriceBook } from "@/helper/vendorPriceBook";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeletePriceBook = () => {
    return useMutation({
        mutationFn: deletePriceBook,
        onSuccess: () => {
            toast.success("Pricebook deleted successfully.");
        },
        onError: () => {
            toast.error("Unable to delete Pricebook.");
        },
    });
};
