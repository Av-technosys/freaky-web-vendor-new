import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const token = localStorage.getItem("id_token");
  const location = window.location.pathname;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const vendorRaw = decodedToken?.["custom:vendor_ids"];

    let vendorId: number | null = null;

    if (vendorRaw) {
      try {
        const vendorObj = JSON.parse(vendorRaw);
        vendorId = vendorObj?.vendorId ?? null;
      } catch {
        vendorId = null;
      }
    }

    if (!vendorId && location === "/map-vendor") {
      return <Outlet />;
    }

    if (vendorId) {
      return <Outlet />;
    }

    return <Navigate to="/map-vendor" replace />;
  } catch (error) {
    console.error("Token decode failed", error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
