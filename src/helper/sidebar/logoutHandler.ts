import { tokenStorage } from "../refreshToken";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const logoutHandler = () => {
    const navigate = useNavigate();

    tokenStorage.clear()
    toast.success("Logout successfully...");
    navigate("/login");
};