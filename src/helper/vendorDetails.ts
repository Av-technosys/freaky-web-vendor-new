import axiosInstance from "./api";
import { apiConstant } from "./apiConstant";

export const getVendorDetails = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getVendorDetails}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const getVendorDocuments = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getVendorDocuments}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const getVendorOwners = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getVendorOwners}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};
