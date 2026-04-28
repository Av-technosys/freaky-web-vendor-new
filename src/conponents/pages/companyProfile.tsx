/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

// import CompanyInformation from "../common/CompanyInformationProps";
// import ContactDetails from "../common/ContactDetails";
// import BusinessAddress from "../common/BusinessAddress";
// import OwnershipInformation from "../common/OwnershipInformation";
// import BankAccountInformation from "../common/BankAccountInformation";
import CompanyLogo from "../common/CompanyLogo";
// import DropdownSelector from "../dropdownSelector";
import { CompanyDetailsPreviewCard, CompanyOwnersPreviewCard } from "../common/CompanyinformationPreview";
import { SkeletonForm } from "@/components/skleton/form";
import withAuthorization from "@/lib/withAuthorization";
import {
  // useCreateVendorDocument,
  // useDeleteVendorDocument,
  // useUpdateBankAccountInformation,
  // useUpdateBusinessAddressInformation,
  // useUpdateCompanyInformation,
  useUpdateCompanyLogo,
  // useUpdateContactInformation,
  // useUpdateOwnershipInformation,
} from "../../services/useCreateOrUpdateCompanyDetails";
import {
  useGetVendorDetails,
  useGetVendorDocuments,
  useGetVendorOwnershipDetails,
} from "../../services/useGetVendorCompanyDetails";
import { useGetImageUrl, useUploadImage } from "../../services/useUploadImage";
import type { CompanyData, CompanyDataPreviewItem, Owner } from "@/types";

// ------------------------ INITIAL VALUES ------------------------

const initialOwner: Owner = {
  firstName: "",
  lastName: "",
  ssnNumber: "",
  streetAddressLine1: "",
  streetAddressLine2: "",
  country: "",
  state: "",
  city: "",
  zipcode: "",
  ownershipPercentage: "",
};




// -------------------------- MAIN COMPONENT ------------------------

const CompanyProfile = () => {

  const getImageUrlMutation = useGetImageUrl();
  const uploadImageMutation = useUploadImage();
  const createOrUpdateCompanyLogo = useUpdateCompanyLogo();

  const { data: vendorData, isPending: isVendorPending } =
    useGetVendorDetails();

  const { data: vendorOwnership, isPending: isVendorOwnershipPending } =
    useGetVendorOwnershipDetails();
  const { data: allVendorDocuments, isPending: isVendorDocumentsPending } =
    useGetVendorDocuments();

    const documents = (allVendorDocuments?.data ?? []).map((item: any) => ({
  label: item.documentType,
  value: item.documentUrl,
  type: "link",
}));
  const [companyData, setCompanyData] = useState<CompanyData>({
    businessName: "",
    website: "",
    dbaName: "",
    legalEntityName: "",
    einNumber: "",
    businessType: "",
    incorporationDate: undefined,

    contactName: "",
    primaryEmail: "",
    primaryPhoneNumber: "",
    instagramLink: "",
    youtubeLink: "",
    facebookLink: "",
    linkedinLink: "",

    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    latitude: "",
    longitude: "",

    owners: [initialOwner],
    authorizedSignatory: 0,

    accountNumber: "",
    bankName: "",
    payeeName: "",
    routingNumber: "",
    bankType: "",

    documents: [],
  });

  const [companyLogo, setCompanyLogo] = useState<any>("");
  const vendorId = vendorData?.data?.vendorId; // Fix vendorData undefined by moving hook up

  const handleCompanyLogo = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageData = {
      fileName: file.name,
      fileType: file.type,
      path: "companyLogo",
    };

    const uploadRes = await getImageUrlMutation.mutateAsync({
      data: imageData,
    });

    if (uploadRes?.data?.uploadUrl) {
      await uploadImageMutation.mutateAsync({
        url: uploadRes.data.uploadUrl,
        file,
      });
      const filePath = uploadRes.data.filePath;
      setCompanyLogo(uploadRes.data.filePath);

      createOrUpdateCompanyLogo.mutate({
        companyLogo: filePath,
      });
    }
  };


  useEffect(() => {
    const companyOwners = vendorOwnership?.data ?? [];
    if (vendorData) {
      const companyInfo = vendorData?.data;
      setCompanyData((prev) => ({
        ...prev,
        accountNumber: companyInfo?.bankAccountNumber ?? "",
        bankName: companyInfo?.bankName ?? "",
        payeeName: companyInfo?.payeeName ?? "",
        routingNumber: companyInfo?.routingNumber ?? "",
        bankType: companyInfo?.bankType ?? "",
        contactName: companyInfo?.primaryContactName ?? "",
        primaryEmail: companyInfo?.primaryEmail || companyInfo?.businessName || "",
        primaryPhoneNumber: companyInfo?.primaryPhoneNumber ?? "",
        instagramLink: companyInfo?.instagramURL ?? "",
        youtubeLink: companyInfo?.youtubeURL ?? "",
        facebookLink: companyInfo?.facebookURL ?? "",
        linkedinLink: companyInfo?.linkedinURL ?? "",

        address1: companyInfo?.streetAddressLine1 ?? "",
        address2: companyInfo?.streetAddressLine2 ?? "",
        country: companyInfo?.country ?? "",
        state: companyInfo?.state ?? "",
        city: companyInfo?.city ?? "",
        zipCode: companyInfo?.zipcode ?? "",

        owners: companyOwners,

        businessName: companyInfo?.businessName ?? "",
        website: companyInfo?.websiteURL ?? "",
        dbaName: companyInfo?.DBAname ?? "",
        legalEntityName: companyInfo?.legalEntityName ?? "",
        einNumber: companyInfo?.einNumber ?? "",
        businessType: companyInfo?.businessType ?? "",
        incorporationDate: companyInfo?.incorporationDate
          ? new Date(companyInfo?.incorporationDate)
          : undefined,
      }));

      setCompanyLogo(companyInfo?.logoUrl);
    }
  }, [vendorData, vendorOwnership]);


  if (isVendorPending || isVendorOwnershipPending || isVendorDocumentsPending) {
    return (
      <div className=" flex flex-col gap-32 pl-4 pt-4">
        <SkeletonForm />
        <SkeletonForm />
      </div>
    );
  }

  const companyInformationData: CompanyDataPreviewItem[] = [
    {
      label: "Business Name",
      value: companyData.businessName,
    },
    {
      label: "Website",
      value: companyData.website,
    },
    {
      label: "DBA Name",
      value: companyData.dbaName,
    },
    {
      label: "Legal Entity Name",
      value: companyData.legalEntityName,
    },
    {
      label: "EIN Number",
      value: companyData.einNumber,
    },
    {
      label: "Business Type",
      value: companyData.businessType,
    },
    {
      label: "Incorporation Date",
      value: companyData.incorporationDate as Date,
      type: "date",
    },
  ];

  const contactDetailsData = [
    {
      label: "Contact Name",
      value: companyData.contactName,
    },
    {
      label: "Primary Email",
      value: companyData.primaryEmail,
    },
    {
      label: "Primary Phone Number",
      value: companyData.primaryPhoneNumber,
    },
    {
      label: "Instagram Link",
      value: companyData.instagramLink,
    },
    {
      label: "Youtube Link",
      value: companyData.youtubeLink,
    },
    {
      label: "Facebook Link",
      value: companyData.facebookLink,
    },
    {
      label: "Linkedin Link",
      value: companyData.linkedinLink,
    },
  ];

  const businessAddressData = [
    {
      label: "Address 1",
      value: companyData.address1,
    },
    {
      label: "Address 2",
      value: companyData.address2,
    },
    {
      label: "Country",
      value: companyData.country,
    },
    {
      label: "State",
      value: companyData.state,
    },
    {
      label: "City",
      value: companyData.city,
    },
    {
      label: "Zip Code",
      value: companyData.zipCode,
    },
  ];

  const bankAccountInformationData = [
    {
      label: "Account Number",
      value: companyData.accountNumber,
    },
    {
      label: "Bank Name",
      value: companyData.bankName,
    },
    {
      label: "Routing Number",
      value: companyData.routingNumber,
    },
    {
      label: "Account Type",
      value: companyData.bankType,
    },
    {
      label: "Payee Name",
      value: companyData.payeeName,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mt-2">
        <div className="order-1 lg:order-1 col-span-1 lg:col-span-3 flex flex-col gap-3">

          <CompanyDetailsPreviewCard
            title="Company Information"
            data={companyInformationData}
            editLink="company-information"
          />

          <CompanyDetailsPreviewCard
            title="Contact Details"
            data={contactDetailsData}
            editLink="contact-details"
          />

          <CompanyDetailsPreviewCard
            title="Business Address"
            data={businessAddressData}
            editLink="business-address"
          />

          <CompanyDetailsPreviewCard
            title="Bank Account Information"
            data={bankAccountInformationData}
            editLink="bank-account-information"
          />

<CompanyDetailsPreviewCard
  title="Document Upload"
  data={documents}
  editLink="document-upload"
/>

          <CompanyOwnersPreviewCard
            title="Ownership Information"
            data={companyData.owners}
            editLink="ownership-information"
          />



          {/* <div className=" pb-6 flex justify-end mt-6">
              <Button onClick={handleSave}>Submit</Button>
            </div> */}
          <div className="h4"></div>
        </div>

        <CompanyLogo
          vendorId={vendorId}
          companyLogo={companyLogo}
          setCompanyLogo={setCompanyLogo}
          handleCompanyLogo={handleCompanyLogo}
        />
      </div>
    </>
  );
};

export default withAuthorization("company-profile")(CompanyProfile);
