import { acceptVendorInvite } from "@/helper/vendorInvites";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAcceptVendorInvite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: acceptVendorInvite,
        onSuccess: () => {
            toast.success("Invite accepted successfully.");
            queryClient.invalidateQueries({ queryKey: ["vendor-invites"] });
        },
        onError: (data) => {
            toast.error(
                data?.message || "Something went wrong while accepting the invite."
            );
        },
    });
};
