import { axiosInstance } from "./api";
import { apiConstant } from "./apiConstant";

export const loginUser = async (userData: any) => {
  const response = await axiosInstance.post(
    apiConstant.authentication.login,
    userData
  );
  return response.data;
};

export const signUpUser = async (userData: any) => {
  const response = await axiosInstance.post(
    apiConstant.authentication.signUp,
    userData
  );
  console.log("response", response);
  return userData.username;
};

export const otpSignUpUser = async (userData: any) => {
  const response = await axiosInstance.post(
    apiConstant.authentication.otpSignUp,
    userData
  );
  return response.data;
};

export const forgetPasswordUsingEmail = async (userData: any) => {
  const response = await axiosInstance.post(
    apiConstant.authentication.forgetPasswordUsingEmail,
    userData
  );
  console.log("response", response);
  return userData.username;
};

export const forgetPasswordUsingOTP = async (userData: any) => {
  const response = await axiosInstance.post(
    apiConstant.authentication.forgetPasswordUsingOTP,
    userData
  );
  console.log("response", response);
  return userData.username;
};
