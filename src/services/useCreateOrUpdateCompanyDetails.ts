import { useMutation } from "@tanstack/react-query";
import {
  createBankAccountInformation,
  createBusinessAddressInformation,
  createCompanyInformation,
  createContactInformation,
} from "../helper/createCompanyDetails";
import { toast } from "sonner";

export const useCreateCompanyInformation = () => {
  return useMutation({
    mutationFn: createCompanyInformation,
    onSuccess: () => {
      toast.success("Company Information created successfully");
    },
    onError: () => {
      toast.error("Unable to create company information");
    },
  });
};

export const useCreateContactInformation = () => {
  return useMutation({
    mutationFn: createContactInformation,
    onSuccess: () => {
      toast.success("Contact Information created successfully");
    },
    onError: () => {
      toast.error("Unable to create contact information");
    },
  });
};

export const useCreateBusinessAddressInformation = () => {
  return useMutation({
    mutationFn: createBusinessAddressInformation,
    onSuccess: () => {
      toast.success("Business Information created successfully");
    },
    onError: () => {
      toast.error("Unable to create Business information");
    },
  });
};

export const useCreateBankAccountInformation = () => {
  return useMutation({
    mutationFn: createBankAccountInformation,
    onSuccess: () => {
      toast.success("Bank Account Information created successfully");
    },
    onError: () => {
      toast.error("Unable to create Bank account information");
    },
  });
};
