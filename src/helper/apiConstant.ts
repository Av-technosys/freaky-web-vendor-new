export const apiConstant = {
  authentication: {
    login: "v1/auth/signin",
    signUp: "v1/auth/signup",
    otpSignUp: "v1/auth/confirm",
    forgetPasswordUsingEmail: "v1/auth/forgot-password",
    forgetPasswordUsingOTP: "v1/auth/confirm-forgot-password",
  },
  vendor: {
    getVendorDetails: "/v1/vendor/vendor_details",
    getVendorDocuments: "/v1/vendor/documents",
    getVendorOwners: "/v1/vendor/ownership_details",
    createCompanyInformation: "v1/vendor/company_details",
    createContactInformation: "v1/vendor/contact_details",
    createBusinessInformation: "v1/vendor/address",
    createBankAccountInformation: "v1/vendor/bank_details",
    createOwnershipInformation: "/v1/vendor/ownership_details",
    createVendorDocument: "/v1/vendor/create_document",
    deleteVendorDocument: "/v1/vendor/document",
    getAllServices: "/v1/vendor/products",
    getServiceById: "/v1/product/info?productId",
    updateServiceById: "/v1/product/update",
    deleteImageById: "/v1/product/image",
  },
  uploadImage: {
    getS3Url: "/v1/upload/get_S3_url",
  },
  user: {
    getUserDetails: "/v1/user/personal_details",
    updateUserDetails: "/v1/user/update_details",
  },
};
