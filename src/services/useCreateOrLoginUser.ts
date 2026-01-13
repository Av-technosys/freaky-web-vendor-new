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

export const useUserLoginMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Login successful");
      const Token = JSON.stringify(data.idToken);
      localStorage.setItem("access_token", Token);

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
