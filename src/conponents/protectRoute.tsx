import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default ProtectRoute;
