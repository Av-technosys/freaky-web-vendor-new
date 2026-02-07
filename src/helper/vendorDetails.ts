import axiosInstance from "./api";
import { apiConstant } from "./apiConstant";

export const getVendorDetails = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getVendorDetails}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const getVendorDocuments = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getVendorDocuments}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const getVendorOwners = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getVendorOwners}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const getVendorEmployees = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getVendorEmployees}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const getEmployeePermissionsByType = async (employeeId: any) => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getEmployeePermissions}/${employeeId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const getAllVendors = async (search: string) => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getAllVendorsForInvitation}?text=${search}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

// export const getVendorNotifications = async () => {
//   try {
//     const response = await axiosInstance.get(
//       `${apiConstant.vendor.getVendorNotifications}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error while sending request:", error);
//     throw error;
//   }
// };

type NotificationResponse = {
  data: any[];
  hasNextPage: boolean;
  nextPage: number;
  totalCount: any
};

export const getVendorNotifications = async ({
  pageParam = 1,
}: {
  pageParam: number;
}): Promise<NotificationResponse> => {
  const res = await axiosInstance.get(
    apiConstant.vendor.getVendorNotifications,
    {
      params: {
        page: pageParam,
        limit: 20,
      },
    }
  );

  return res.data;
};

export const getSearchedItems = async ({ service, debouncedSearch }: any) => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getAllSearchItems}?search_type=${service}&search_text=${debouncedSearch}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};
