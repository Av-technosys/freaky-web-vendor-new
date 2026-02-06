import { IS_DEV_ADMIN } from "@/const/admin";
import { getLogedinVendorRoles } from "@/helper/getLogedinVendorRoles";

const withAuthorization = (allowedRoles: string = "") => {
  return (WrappedComponent: any) => {
    return (...props: any) => {
      const currentVendorRoles: string[] | null = getLogedinVendorRoles()

      const isAllowed = currentVendorRoles?.includes(allowedRoles);

      if (!isAllowed && !IS_DEV_ADMIN) return (
        <p>User not authorized</p>
      )

      return <WrappedComponent {...props} />;
    };
  }
};

export default withAuthorization;
