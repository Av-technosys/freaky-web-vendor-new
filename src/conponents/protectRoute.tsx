import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const token = localStorage.getItem("id_token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken: any = jwtDecode(token);

    const vendorRaw = decodedToken?.["custom:vendor_ids"];
    const vendorId = vendorRaw ? Number(vendorRaw) : null;

    const isMapVendorPage = location.pathname === "/map-vendor";

    if (!vendorId && !isMapVendorPage) {
      return <Navigate to="/map-vendor" replace />;
    }

    if (vendorId && isMapVendorPage) {
      return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
  } catch (error) {
    console.error("Token decode failed:", error);

    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;