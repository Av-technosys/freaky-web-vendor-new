import axios from "axios";
import { VITE_BACKEND_URL } from "@/const/env";

export const tokenStorage = {
  getIdToken: () => localStorage.getItem("id_token"),
  getRefreshToken: () => localStorage.getItem("refresh_token"),
  getUsername: () => localStorage.getItem("username"),

  setIdToken: (token: string) => localStorage.setItem("id_token", token),

  clear: () => {
    localStorage.removeItem("id_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
  },
};

export const rotateIdToken = async () => {
  const refreshToken = tokenStorage.getRefreshToken();

  const username = tokenStorage.getUsername();

  if (!refreshToken || !username) {
    throw new Error("Missing refresh credentials");
  }

  const { data } = await axios.post(
    `${VITE_BACKEND_URL}/v1/auth/refresh_token`,
    { refreshToken, username },
    { headers: { "Content-Type": "application/json" } },
  );

  const newIdToken = data?.response?.AuthenticationResult?.IdToken;

  if (!newIdToken) {
    throw new Error("Invalid refresh response");
  }

  localStorage.setItem("id_token", newIdToken);
  return newIdToken;
};
