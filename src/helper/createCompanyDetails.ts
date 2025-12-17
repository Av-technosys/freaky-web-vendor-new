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
      {
        Documents: vendorDocuments,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
  }
};

export const deleteVendorDocument = async (documentURL: any) => {
  try {
    const response = await axiosInstance.delete(
      `${apiConstant.vendor.deleteVendorDocument}?url=${documentURL}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
  }
};
