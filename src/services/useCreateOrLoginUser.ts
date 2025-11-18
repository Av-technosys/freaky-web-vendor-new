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
    onError: () => {
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
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};

export const useUserOtpSignUpMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: otpSignUpUser,
    onSuccess: (data) => {
      toast.success(`User Create successful`);
      const Token = JSON.stringify(data.idToken);
      localStorage.setItem("access_token", Token);
      navigate("/");
    },
    onError: () => {
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
    onError: () => {
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
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
};
