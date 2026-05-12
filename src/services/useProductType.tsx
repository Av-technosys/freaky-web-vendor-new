import { getProductType } from "@/helper/vendorService";
import { useQuery } from "@tanstack/react-query";

export const useGetProductType = () => {
    return useQuery({
        queryFn: getProductType,
        queryKey: ["product-types"]
    });
};
