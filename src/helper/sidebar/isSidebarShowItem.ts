import { IS_DEV_ADMIN } from "@/const/admin";
import { getLogedinVendorRoles } from "../getLogedinVendorRoles";
import { ACCESS_TO_ALL } from "@/const/navigation";

export function isShowSidebarItem(url: string) {
    const currentVendorRoles: string[] | null = getLogedinVendorRoles()

    if (IS_DEV_ADMIN) return true;
    return currentVendorRoles?.concat(ACCESS_TO_ALL).includes(url)
}