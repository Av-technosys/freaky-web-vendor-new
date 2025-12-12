import { axiosInstance } from "./api";
import { apiConstant } from "./apiConstant";

export const getVendorServices = async (
  page: number,
  page_size: number
) => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getAllServices}?page=${page}&page_size=${page_size}`,
    );

    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const getVendorServiceById = async ( productId: any) => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getServiceById}=${productId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};


export const updateVendorService = async ({productId,serviceData}:any)=>{
  try {
    const response = await axiosInstance.put(
      `${apiConstant.vendor.updateServiceById}/${productId}`,
      serviceData
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
}
