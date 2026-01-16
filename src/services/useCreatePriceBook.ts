import { createPriceBook } from "@/helper/vendorPriceBook";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePriceBook = () => {
    return useMutation({
        mutationFn: createPriceBook,
        onSuccess: () => {
            toast.success("Pricebook created successfully.");
        },
        onError: () => {
            toast.error("Unable to create Pricebook.");
        },
    });
};
