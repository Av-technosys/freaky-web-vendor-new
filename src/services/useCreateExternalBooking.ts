import { createExternalBooking } from "@/helper/booking";
import { useMutation } from "@tanstack/react-query";

export const useCreateExternalBooking = () => {
    return useMutation({
        mutationFn: createExternalBooking,
        onSuccess: () => {
        },
        onError: () => {
        },
    });
};
