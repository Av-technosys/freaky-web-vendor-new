import { jwtDecode } from "jwt-decode";

export function getLogedinVendorRoles() {
    const token = localStorage.getItem("id_token") || "";
    if (!token) return null;

    const decodedToken: any = jwtDecode(token);
    const vendorRoles = JSON.stringify(decodedToken?.["custom:permissions"]);
    return JSON.parse(vendorRoles);
}