import { axiosInstance } from "./api";
import { apiConstant } from "./apiConstant";

export const getVendorServices = async (
  token: string,
  page: number,
  page_size: number
) => {
  try {
    const cleanedToken = token.replace(/"/g, "");
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getAllServices}?page=${page}&page_size=${page_size}`,
      {
        headers: {
          Authorization: `Bearer ${cleanedToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const getVendorServiceById = async (token: string, productId: any) => {
  try {
    const cleanedToken = token.replace(/"/g, "");
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getServiceById}=${productId}`,
      {
        headers: {
          Authorization: `Bearer ${cleanedToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};
