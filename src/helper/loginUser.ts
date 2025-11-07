import { axiosInstance } from "./api";

export const loginUser = async (userData: any) => {
  const response = await axiosInstance.post("/signin", userData);
  return response.data;
};

export const signUpUser = async (userData: any) => {
  const response = await axiosInstance.post("/signup", userData);
  console.log("response", response);
  return userData.username;
};

export const otpSignUpUser = async (userData: any) => {
  const response = await axiosInstance.post("/confirm", userData);
  console.log("response", response);
  return userData.username;
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
