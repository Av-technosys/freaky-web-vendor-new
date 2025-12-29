import { axiosInstance } from "./api";
import { apiConstant } from "./apiConstant";

export const getAllPriceBook = async () => {
    try {
        const response = await axiosInstance.get(
            `${apiConstant.vendor.getAllPriceBook}`
        );

        return response.data;
    } catch (error) {
        console.error("Error while sending request:", error);
        throw error;
    }
};


export const getServicesByPriceBookId = async (pricebookId: number) => {
    try {
        const response = await axiosInstance.get(
            `${apiConstant.vendor.getServicesByPriceBookId}/${pricebookId}`
        );

        return response.data;
    } catch (error) {
        console.error("Error while sending request:", error);
        throw error;
    }
};

// export const getVendorServiceById = async (productId: any) => {
//     try {
//         const response = await axiosInstance.get(
//             `${apiConstant.vendor.getServiceById}=${productId}`
//         );
//         return response.data;
//     } catch (error) {
//         console.error("Error while sending request:", error);
//         throw error;
//     }
// };

// export const updateVendorService = async ({ productId, serviceData }: any) => {
//     try {
//         const response = await axiosInstance.put(
//             `${apiConstant.vendor.updateServiceById}/${productId}`,
//             serviceData
//         );
//         return response.data;
//     } catch (error) {
//         console.error("Error while sending request:", error);
//         throw error;
//     }
// };

// export const deleteImageHandler = async (id: any) => {
//     try {
//         const response = await axiosInstance.delete(
//             `${apiConstant.vendor.deleteImageById}/${id}`
//         );
//         return response.data;
//     } catch (error) {
//         console.error("Error while sending request:", error);
//         throw error;
//     }
// };
