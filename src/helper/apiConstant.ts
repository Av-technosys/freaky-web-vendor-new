export const apiConstant = {
  authentication: {
    login: "v1/auth/signin",
    signUp: "v1/auth/signup",
    otpSignUp: "v1/auth/confirm",
    forgetPasswordUsingEmail: "v1/auth/forgot-password",
    forgetPasswordUsingOTP: "v1/auth/confirm-forgot-password",
  },
  vendor: {
    createCompanyInformation: "v1/vendor/cerate",
    createContactInformation: "v1/vendor/update_contact_details",
    createBusinessInformation: "v1/vendor/update_address",
    createBankAccountInformation: "v1/vendor/update_bank_details",
    getAllServices: "/v1/vendor/products",
    getServiceById: "/v1/product/info?productId",
    updateServiceById:"/v1/product/update"
  },
  uploadImage:{
    getS3Url:"/v1/upload/get_S3_url"
  }
};
