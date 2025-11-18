import { useMutation } from "@tanstack/react-query";
import {
  forgetPasswordUsingEmail,
  forgetPasswordUsingOTP,
  loginUser,
  otpSignUpUser,
  signUpUser,
} from "../helper/loginUser";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useUserLoginMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Login successful");
      const Token = JSON.stringify(data.idToken);
      localStorage.setItem("access_token", Token);
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error("Something went wrong");
    },
  });
};

export const useUserSignUpMutation = () => {
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      toast.success(`User Create successful`);
    },
    onError: (error) => {
      console.error("signUp failed:", error);
      toast.error("Something went wrong");
    },
  });
};

export const useUserOtpSignUpMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: otpSignUpUser,
    onSuccess: (data) => {
      console.log("dataaaa", data);
      toast.success(`User Create successful`);
      const Token = JSON.stringify(data.idToken);
      localStorage.setItem("access_token", Token);
      navigate("/");
    },
    onError: (error) => {
      console.error("signUp failed:", error);
      toast.error("Something went wrong!");
    },
  });
};

export const useUserForgetPasswordMutation = () => {
  return useMutation({
    mutationFn: forgetPasswordUsingEmail,
    onSuccess: () => {
      toast.success(`OTP send to your email`);
    },
    onError: (error) => {
      console.error("failed:", error);
      toast.error("Something went wrong!");
    },
  });
};

export const useUserForgetPasswordUsingOTPMutation = () => {
  return useMutation({
    mutationFn: forgetPasswordUsingOTP,
    onSuccess: () => {
      toast.success(`Password Forgot Successfully...`);
    },
    onError: (error) => {
      console.error("failed:", error);
      toast.error("Something went wrong!");
    },
  });
};
