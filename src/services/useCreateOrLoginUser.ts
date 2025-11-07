import { useMutation } from "@tanstack/react-query";
import { loginUser, otpSignUpUser, signUpUser } from "../helper/loginUser";

export const useUserLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      alert("Login successful!");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      alert("Something went wrong!");
    },
  });
};

export const useUserSignUpMutation = () => {
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      // alert(`User Create successful!`);
    },
    onError: (error) => {
      console.error("signUp failed:", error);
      alert("Something went wrong!");
    },
  });
};

export const useUserOtpSignUpMutation = () => {
  return useMutation({
    mutationFn: otpSignUpUser,
    onSuccess: () => {
      alert(`User Create successful!`);
    },
    onError: (error) => {
      console.error("signUp failed:", error);
      alert("Something went wrong!");
    },
  });
};
