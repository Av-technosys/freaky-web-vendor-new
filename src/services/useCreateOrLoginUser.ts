import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import {
  forgetPasswordUsingEmail,
  forgetPasswordUsingOTP,
  loginUser,
  otpSignUpUser,
  signUpUser,
} from "../helper/loginUser";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const decodeIdToken = (token: string): any => {
  const decoded = jwtDecode(token) as any;

  return {
    username: decoded["cognito:username"] ?? decoded.sub,
  };
};

export const useUserLoginMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Login successful");
      const Token = data.idToken;
      const refreshToken = data.refreshToken;

      const user = decodeIdToken(data.idToken);

      localStorage.setItem("id_token", Token);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("username", user.username);

      try {
        const decodedToken: any = jwtDecode(data.idToken);
        const vendorRaw = decodedToken["custom:vendor_ids"];

        let vendorId = null;

        if (vendorRaw) {
          const vendorObj = JSON.parse(vendorRaw);
          vendorId = vendorObj.vendorId;
        }

        if (vendorId) {
          navigate("/");
        } else {
          navigate("/map-vnedor");
        }
      } catch (error) {
        console.error("Invalid token", error);
        navigate("/map-vnedor");
      }
    },

    onError: (error: any) => {
      console.log("error", error);
      toast.error(error.response?.data?.error || "Something went wrong");
    },
  });
};

export const useUserSignUpMutation = () => {
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      toast.success(`User Create successful`);
    },
    onError: (error: any) => {
      toast.error(error?.error || "user already exist");
    },
  });
};

export const useUserOtpSignUpMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: otpSignUpUser,
    onSuccess: (data) => {
      toast.success(`User Create successful`);
      const Token = data.idToken;
      const refreshToken = data.refreshToken;

      const user = decodeIdToken(data.idToken);

      localStorage.setItem("id_token", Token);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("username", user.username);

      navigate("/map-vnedor");
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
  const navigate = useNavigate();
  return useMutation({
    mutationFn: forgetPasswordUsingOTP,
    onSuccess: (data: any) => {
      toast.success(data.message || "Password reset successful 🎉");
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Invalid OTP, please try again!");
    },
  });
};
