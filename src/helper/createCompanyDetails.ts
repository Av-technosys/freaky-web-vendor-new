import { axiosInstance } from "./api";
import { apiConstant } from "./apiConstant";

export const createCompanyInformation = async (companyInformationData: any) => {
  try {
    const response = await axiosInstance.put(
      apiConstant.vendor.createCompanyInformation,
      companyInformationData
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
  }
};

export const createContactInformation = async (contactInformationData: any) => {
  try {
    const response = await axiosInstance.put(
      apiConstant.vendor.createContactInformation,
      contactInformationData
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
  }
};

export const createBusinessAddressInformation = async (
  BusinessInformationData: any
) => {
  try {
    const response = await axiosInstance.put(
      apiConstant.vendor.createBusinessInformation,
      BusinessInformationData
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
  }
};

export const createBankAccountInformation = async (
  BankAccountInformationData: any
) => {
  try {
    const response = await axiosInstance.put(
      apiConstant.vendor.createBankAccountInformation,
      BankAccountInformationData
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
  }
};

export const createOwnershipInformation = async (
  ownershipInformationData: any
) => {
  try {
    const response = await axiosInstance.put(
      apiConstant.vendor.createOwnershipInformation,
      ownershipInformationData
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
  }
};

export const createVendorDocuments = async (vendorDocuments: any) => {
  try {
    const response = await axiosInstance.post(
      apiConstant.vendor.createVendorDocument,
      vendorDocuments
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
  }
};

export const updateVendorDocument = async (vendorDocument: any) => {
  try {
    const response = await axiosInstance.put(
      apiConstant.vendor.updateVendorDocument,
      vendorDocument
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
  }
};

export const updateEmployeePermission = async ({
  allowedPermissions,
  employeeId,
}: any) => {
  try {
    const response = await axiosInstance.put(
      `${apiConstant.vendor.updateEmployeePermission}/${employeeId}`,
      allowedPermissions
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
  }
};

export const deleteVendorEmployee = async (employeeId: any) => {
  try {
    const response = await axiosInstance.delete(
      `${apiConstant.vendor.deleteVendorEmployee}/${employeeId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
  }
};

export const sendInvitationToEmployee = async (invite: any) => {
  try {
    const response = await axiosInstance.post(
      `${apiConstant.vendor.sendEmployeeInvitation}`,
      invite
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
  }
};

export const deleteVendorDocument = async (documentId: any) => {
  try {
    const response = await axiosInstance.delete(
      `${apiConstant.vendor.deleteVendorDocument}/${documentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
  }
};
