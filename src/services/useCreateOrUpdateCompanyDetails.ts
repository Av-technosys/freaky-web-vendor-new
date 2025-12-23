import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBankAccountInformation,
  createBusinessAddressInformation,
  createCompanyInformation,
  createContactInformation,
  createOwnershipInformation,
  createVendorDocuments,
  deleteVendorDocument,
  deleteVendorEmployee,
  sendInvitationToEmployee,
  updateEmployeePermission,
  updateVendorDocument,
} from "../helper/createCompanyDetails";
import { toast } from "sonner";

export const useCreateCompanyInformation = () => {
  return useMutation({
    mutationFn: createCompanyInformation,
    onSuccess: () => {
      toast.success("Company Information updated successfully");
    },
    onError: () => {
      toast.error("Unable to updated company information");
    },
  });
};

export const useCreateContactInformation = () => {
  return useMutation({
    mutationFn: createContactInformation,
    onSuccess: () => {
      toast.success("Contact Information updated successfully");
    },
    onError: () => {
      toast.error("Unable to updated contact information");
    },
  });
};

export const useCreateBusinessAddressInformation = () => {
  return useMutation({
    mutationFn: createBusinessAddressInformation,
    onSuccess: () => {
      toast.success("Business Information updated successfully");
    },
    onError: () => {
      toast.error("Unable to updated Business information");
    },
  });
};

export const useCreateBankAccountInformation = () => {
  return useMutation({
    mutationFn: createBankAccountInformation,
    onSuccess: () => {
      toast.success("Bank Account Information updated successfully");
    },
    onError: () => {
      toast.error("Unable to updated Bank account information");
    },
  });
};

export const useCreateOwnershipInformation = () => {
  return useMutation({
    mutationFn: createOwnershipInformation,
    onSuccess: () => {
      toast.success("Ownership Information updated successfully.");
    },
    onError: () => {
      toast.error("Unable to updated ownership information.");
    },
  });
};

export const useCreateVendorDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVendorDocuments,
    onSuccess: () => {
      toast.success("Document uploaded successfully.");
      queryClient.invalidateQueries({
        queryKey: ["vendor-documents"],
      });
    },
    onError: () => {
      toast.error("Unable to upload vendor document.");
    },
  });
};

export const useUpdateVendorDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateVendorDocument,
    onSuccess: () => {
      toast.success("Document updated successfully.");
      queryClient.invalidateQueries({
        queryKey: ["vendor-documents"],
      });
    },
    onError: () => {
      toast.error("Unable to update vendor document.");
    },
  });
};

export const useDeleteVendorDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVendorDocument,
    onSuccess: () => {
      toast.success("Document deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: ["vendor-documents"],
      });
    },
    onError: () => {
      toast.error("Unable to delete vendor document.");
    },
  });
};

export const useDeleteVendorEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVendorEmployee,
    onSuccess: () => {
      toast.success("Employee deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: ["vendor-employees"],
      });
    },
    onError: () => {
      toast.error("Unable to delete employee.");
    },
  });
};

export const useInviteVendorEmployee = () => {
  return useMutation({
    mutationFn: sendInvitationToEmployee,
    onSuccess: () => {
      toast.success("Invitation sent successfully.");
    },
    onError: () => {
      toast.error("Unable to send invitation.");
    },
  });
};

export const useUpdateEmployeePermissions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEmployeePermission,
    onSuccess: () => {
      toast.success("Permission updated successfully.");
      queryClient.invalidateQueries({
        queryKey: ["vendor-employees"],
      });
    },
    onError: () => {
      toast.error("Unable to update vendor document.");
    },
  });
};
