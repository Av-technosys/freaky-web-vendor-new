import axiosInstance from "./api";
import { apiConstant } from "./apiConstant";

export const getUserDetails = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.user.getUserDetails}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const updateUserDetails = async (userInfo: any) => {
  try {
    const response = await axiosInstance.put(
      `${apiConstant.user.updateUserDetails}`,
      userInfo
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};
