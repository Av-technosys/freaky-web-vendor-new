// useupdatepricebook 
import { updatePriceBook } from "@/helper/vendorPriceBook";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdatePriceBook = () => {
    return useMutation({
        mutationFn: updatePriceBook,
        onSuccess: () => {
            toast.success("Pricebook details updated successfully.");
        },
        onError: () => {
            toast.error("Unable to update Pricebook details.");
        },
    });
};
