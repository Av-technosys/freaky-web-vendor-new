import { getEmployeePermissionsByType } from "@/helper/vendorDetails";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployeePermissions = (
    employeeId: string,
    openDialog: boolean
) => {
    return useQuery({
        queryKey: ["employee-permissions", employeeId],
        queryFn: () => getEmployeePermissionsByType(employeeId),
        enabled: !!employeeId && openDialog,
    });
};
