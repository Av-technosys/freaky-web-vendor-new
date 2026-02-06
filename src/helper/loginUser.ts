import { axiosInstance } from "./api";
import { apiConstant } from "./apiConstant";

export const loginUser = async (userData: any) => {
  try {
    const response = await axiosInstance.post(
      apiConstant.authentication.login,
      userData,
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const signUpUser = async (userData: any) => {
  try {
    await axiosInstance.post(apiConstant.authentication.signUp, userData);
    return userData.username;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const otpSignUpUser = async (userData: any) => {
  try {
    const response = await axiosInstance.post(
      apiConstant.authentication.otpSignUp,
      userData,
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
  }
};

export const forgetPasswordUsingEmail = async (userData: any) => {
  try {
    await axiosInstance.post(
      apiConstant.authentication.forgetPasswordUsingEmail,
      userData,
    );
    return userData.username;
  } catch (error) {
    console.error("Error while sending request:", error);
  }
};

export const forgetPasswordUsingOTP = async (userData: any) => {
  try {
    const response = await axiosInstance.post(
      apiConstant.authentication.forgetPasswordUsingOTP,
      userData,
    );
    return response.data;
  } catch (error: any) {
    console.error("Error while sending request:", error);
    throw error.response?.data || error;
  }
};
