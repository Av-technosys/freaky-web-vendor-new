import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCompanyInformation,
  createVendorDocuments,
  deleteCompanyLogoHandler,
  deleteVendorDocument,
  deleteVendorEmployee,
  sendInvitationToEmployee,
  updateBankAccountInformation,
  updateBusinessAddressInformation,
  updateCompanyInformation,
  updateCompanyLogo,
  updateContactInformation,
  updateEmployeePermission,
  updateOwnershipInformation,
  updateVendorDocument,
} from "../helper/createCompanyDetails";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

export const useUpdateCompanyInformation = () => {
  return useMutation({
    mutationFn: updateCompanyInformation,
    onSuccess: () => {
      toast.success("Company Information updated successfully");
    },
    onError: () => {
      toast.error("Unable to updated company information");
    },
  });
};

export const useUpdateContactInformation = () => {
  return useMutation({
    mutationFn: updateContactInformation,
    onSuccess: () => {
      toast.success("Contact Information updated successfully");
    },
    onError: () => {
      toast.error("Unable to updated contact information");
    },
  });
};

export const useUpdateBusinessAddressInformation = () => {
  return useMutation({
    mutationFn: updateBusinessAddressInformation,
    onSuccess: () => {
      toast.success("Business Information updated successfully");
    },
    onError: () => {
      toast.error("Unable to updated Business information");
    },
  });
};

export const useUpdateBankAccountInformation = () => {
  const location = useLocation();
  return useMutation({
    mutationFn: updateBankAccountInformation,
    onSuccess: () => {
      if (location.pathname.includes("company-profile")) {
        toast.success("Bank account information updated successfully.");
      } else {
        toast.success(
          "Bank account information updated successfully. Your request has been sent for admin approval. Your vendor account will be activated soon.",
        );
      }
    },
    onError: () => {
      toast.error("Unable to updated Bank account information");
    },
  });
};

export const useUpdateOwnershipInformation = () => {
  return useMutation({
    mutationFn: updateOwnershipInformation,
    onSuccess: () => {
      toast.success("Ownership Information updated successfully.");
    },
    onError: () => {
      toast.error("Unable to updated ownership information.");
    },
  });
};

export const useCreateCompanyInformation = () => {
  return useMutation({
    mutationFn: createCompanyInformation,
    onSuccess: () => {
      toast.success("Company Information created successfully");
    },
    onError: () => {
      toast.error("Unable to created company information");
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

export const useDeleteCompanyLogo = () => {
  return useMutation({
    mutationFn: deleteCompanyLogoHandler,
    onSuccess: () => {
      toast.success("Image Deleted Successfully.");
    },
    onError: () => {
      toast.error("Unable to delete image.");
    },
  });
};

export const useUpdateCompanyLogo = () => {
  return useMutation({
    mutationFn: updateCompanyLogo,

    onError: () => {
      toast.error("Unable to upload company logo.");
    },
  });
};
