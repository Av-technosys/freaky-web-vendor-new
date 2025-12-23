import axiosInstance from "./api";
import { apiConstant } from "./apiConstant";

export const getVendorInvites = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getVendorInvites}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const createVendorEmployeeRequest = async (vendorId: any) => {
  try {
    const response = await axiosInstance.post(
      `${apiConstant.vendor.createVendorEmployeeRequest}`,
      {
        vendorId: vendorId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};
