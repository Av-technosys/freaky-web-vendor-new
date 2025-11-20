import { axiosInstance } from "./api";
import { apiConstant } from "./apiConstant";

export const createCompanyInformation = async (companyInformationData: any) => {
  try {
    const response = await axiosInstance.post(
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
    const response = await axiosInstance.post(
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
    const response = await axiosInstance.post(
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
    const response = await axiosInstance.post(
      apiConstant.vendor.createBankAccountInformation,
      BankAccountInformationData
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
  }
};
