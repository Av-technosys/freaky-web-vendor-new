import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    deleteImageHandler,
    updateVendorService,
} from "../helper/vendorService";
import { getAllPriceBook, getServicesByPriceBookId } from "@/helper/vendorPriceBook";

// export const useGetAllPriceBook = () => {
//     return useMutation({
//         mutationFn: getAllPriceBook,
//         onSuccess: () => {
//             toast.success("Pricebook fetched Successfully.");
//         },
//         onError: () => {
//             toast.error("Unable to update service.");
//         },
//     });
// };

export const useGetAllPriceBook = () => {
    return useQuery({
        queryKey: ["vendor-pricebooks"],
        queryFn: () => getAllPriceBook(),
    });
};
export const useServicesByPriceBookId = (pricebookId: number) => {
    return useQuery({
        queryKey: ["vendor-prcebook-by-id", pricebookId],
        queryFn: () => getServicesByPriceBookId(pricebookId),
    });
};


// export const useDeleteAdditionalImage = () => {
//     return useMutation({
//         mutationFn: deleteImageHandler,
//         onSuccess: () => {
//             toast.success("Image Deleted Successfully.");
//         },
//         onError: () => {
//             toast.error("Unable to delete image.");
//         },
//     });
// };
