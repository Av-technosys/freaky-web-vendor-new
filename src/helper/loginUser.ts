import { axiosInstance } from "./api";

export const loginUser = async (userData: any) => {
  const response = await axiosInstance.post("v1/auth/signin", userData);
  return response.data;
};

export const signUpUser = async (userData: any) => {
  const response = await axiosInstance.post("v1/auth/signup", userData);
  console.log("response", response);
  return userData.username;
};

export const otpSignUpUser = async (userData: any) => {
  const response = await axiosInstance.post("v1/auth/confirm", userData);
  return response.data;
};

export const forgetPasswordUsingEmail = async (userData: any) => {
  const response = await axiosInstance.post("/forgot-password", userData);
  console.log("response", response);
  return userData.username;
};

export const forgetPasswordUsingOTP = async (userData: any) => {
  const response = await axiosInstance.post(
    "/confirm-forgot-password",
    userData
  );
  console.log("response", response);
  return userData.username;
};
