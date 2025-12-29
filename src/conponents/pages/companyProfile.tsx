/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { Owner, CompanyData, Document } from "../../types/company";

import CompanyInformation from "../common/CompanyInformationProps";
import ContactDetails from "../common/ContactDetails";
import BusinessAddress from "../common/BusinessAddress";
import OwnershipInformation from "../common/OwnershipInformation";
import BankAccountInformation from "../common/BankAccountInformation";
import CompanyLogo from "../common/CompanyLogo";
import { Button, Card, CardContent, CardTitle } from "../../components/ui";
import DropdownSelector from "../dropdownSelector";
import { useGetImageUrl, useUploadImage } from "../../services/useUploadImage";
import {
  useCreateVendorDocument,
  useDeleteVendorDocument,
  useUpdateBankAccountInformation,
  useUpdateBusinessAddressInformation,
  useUpdateCompanyInformation,
  useUpdateContactInformation,
  useUpdateOwnershipInformation,
} from "../../services/useCreateOrUpdateCompanyDetails";
import { toast } from "sonner";
import {
  useGetVendorDetails,
  useGetVendorDocuments,
  useGetVendorOwnershipDetails,
} from "../../services/useGetVendorCompanyDetails";
import { useQueryClient } from "@tanstack/react-query";
import UpdateDocumentPopup from "../updateDocumentPopup";

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

const defaultDocuments: Document[] = [
  { id: "1", type: "business_license", files: [], maxFiles: 5 },
  { id: "2", type: "tax_certificate", files: [], maxFiles: 5 },
  { id: "3", type: "ownership_proof", files: [], maxFiles: 5 },
  { id: "4", type: "bank_statement", files: [], maxFiles: 5 },
];

const documentDropdownValues = {
  options: [
    {
      label: "Business License",
      value: "business_license",
    },
    {
      label: "Tax Certificate",
      value: "tax_certificate",
    },
    {
      label: "Proof of ownership",
      value: "proof_of_ownership",
    },
    {
      label: "Bank Statement",
      value: "bank_statement",
    },
  ],
};

// -------------------------- MAIN COMPONENT ------------------------

const CompanyProfile = () => {
  const [open, setOpen] = useState(false);
  const [vendorDocuments, setVendorDocuments] = useState<any>([]);
  const [openUpdateDocumentPopup, setOpenUpdateDocumentPopup] = useState(false);
  const [updatedDocumentDetails, setUpdatedDocumentDetails] = useState();

  const [documentInputs, setDocumentInputs] = useState<any[]>([
    { documentType: "business_license", documentUrl: "choose file" },
  ]);


  const getImageUrlMutation = useGetImageUrl();
  const uploadImageMutation = useUploadImage();

  const { data: vendorData } = useGetVendorDetails();
  const { data: vendorOwnership } = useGetVendorOwnershipDetails();
  const { data: allVendorDocuments } = useGetVendorDocuments();

  const queryClient = useQueryClient();

  const CompanyInformationMutation = useUpdateCompanyInformation();
  const ContactInformationMutation = useUpdateContactInformation();
  const BusinessAddressMutation = useUpdateBusinessAddressInformation();
  const BankAccountMutation = useUpdateBankAccountInformation();
  const OwnershipInformationMutation = useUpdateOwnershipInformation();
  const vendorDocumentMutation = useCreateVendorDocument();
  const documentDeleteMutation = useDeleteVendorDocument();

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

    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",

    owners: [initialOwner],
    authorizedSignatory: 0,

    accountNumber: "",
    bankName: "",
    payeeName: "",
    routingNumber: "",
    bankType: "",

    documents: defaultDocuments,
  });

  const [companyLogo, setCompanyLogo] = useState<any>("");

  useEffect(() => {
    const companyOwners = vendorOwnership?.data;
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
        primaryEmail: companyInfo?.businessName ?? "",
        primaryPhoneNumber: companyInfo?.primaryPhoneNumber ?? "",
        instagramLink: companyInfo?.instagramURL ?? "",
        youtubeLink: companyInfo?.youtubeURL ?? "",
        facebookLink: companyInfo?.facebookURL ?? "",

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
      setDocumentInputs(allVendorDocuments?.data);
    }
  }, [vendorData, allVendorDocuments]);

  // --------------------- UPDATE FUNCTIONS ---------------------

  const updateCompanyData = (key: keyof CompanyData, value: any) => {
    setCompanyData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateOwner = (index: number, field: keyof Owner, value: string) => {
    setCompanyData((prev) => {
      const updatedOwners = [...prev.owners];
      updatedOwners[index] = { ...updatedOwners[index], [field]: value };
      return { ...prev, owners: updatedOwners };
    });
  };

  const addOwner = () => {
    if (companyData?.owners?.length >= 4) return;

    setCompanyData((prev) => ({
      ...prev,
      owners: [...prev.owners, { ...initialOwner }],
    }));
  };

  const removeOwner = (index: number) => {
    if (companyData?.owners?.length <= 1) return;

    setCompanyData((prev) => {
      const updatedOwners = prev.owners.filter((_, i) => i !== index);

      let newAuthorized = prev.authorizedSignatory;
      if (index === prev.authorizedSignatory) newAuthorized = 0;
      else if (index < prev.authorizedSignatory)
        newAuthorized = prev.authorizedSignatory - 1;

      return {
        ...prev,
        owners: updatedOwners,
        authorizedSignatory: newAuthorized,
      };
    });
  };

  const handleSave = () => {
    const companyInformationData = {
      businessName: companyData.businessName || "",
      websiteURL: companyData.website || "",
      DBAname: companyData.dbaName || "",
      legalEntityName: companyData.legalEntityName || "",
      einNumber: companyData.einNumber || "",
      businessType: companyData.businessType || "",
      incorporationDate: companyData.incorporationDate || Date.now(),
      companyLogo: companyLogo || "",
    };

    const companyContactDetails = {
      primaryContactName: companyData.contactName || "",
      primaryEmail: companyData.primaryEmail || "",
      primaryPhoneNumber: companyData.primaryPhoneNumber || "",
      instagramURL: companyData.instagramLink || "",
      youtubeURL: companyData.youtubeLink || "",
      facebookURL: companyData.facebookLink || "",
    };

    const companyBusinessAddress = {
      streetAddressLine1: companyData.address1,
      streetAddressLine2: companyData.address2,
      city: companyData.city,
      state: companyData.state,
      country: companyData.country,
      zipcode: companyData.zipCode,
    };

    const companyBankAccountInformation = {
      bankAccountNumber: companyData.accountNumber,
      bankName: companyData.bankName,
      payeeName: companyData.payeeName,
      routingNumber: companyData.routingNumber,
      bankType: companyData.bankType,
    };

    const companyOwnershipInformation = companyData.owners;

    CompanyInformationMutation.mutate(companyInformationData);
    ContactInformationMutation.mutate(companyContactDetails);
    BusinessAddressMutation.mutate(companyBusinessAddress);
    BankAccountMutation.mutate(companyBankAccountInformation);
    OwnershipInformationMutation.mutate(companyOwnershipInformation);

    if (vendorDocuments?.length > 0) {
      vendorDocumentMutation.mutate(vendorDocuments);
    }
    setVendorDocuments([]);
    queryClient.invalidateQueries({
      queryKey: ["vendor-details"],
    });
    queryClient.invalidateQueries({
      queryKey: ["vendor-owners"],
    });
  };

  const handlePrevious = () => console.log("Previous step");

  const handleDocumentChange = (index: number, value: any) => {
    setDocumentInputs((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, documentType: value.value } : item
      )
    );
  };

  const handleDocumentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading("Uploading document...");

    try {
      const currentDoc = documentInputs[index];

      if (!currentDoc?.documentType) {
        toast.error("Please select document type first", { id: toastId });
        return;
      }
      const imageData = {
        fileName: file.name,
        fileType: file.type,
        path: "vendorDocument",
      };

      const uploadRes = await getImageUrlMutation.mutateAsync({
        data: imageData,
      });

      const filePath = uploadRes?.data?.filePath;
      const uploadUrl = uploadRes?.data?.uploadUrl;

      if (!filePath || !uploadUrl) {
        throw new Error("Upload URL not received");
      }
      await uploadImageMutation.mutateAsync({
        url: uploadUrl,
        file,
      });
      setDocumentInputs((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, documentUrl: filePath } : item
        )
      );

      setVendorDocuments((prev: any[]) => [
        ...prev,
        {
          filePath,
          documentType: currentDoc.documentType,
        },
      ]);

      toast.success("Document uploaded successfully", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Document upload failed", { id: toastId });
    } finally {
      e.target.value = "";
    }
  };

  const handleAddMore = () => {
    setDocumentInputs((prev: any) => [
      ...prev,
      { documentType: "business_license", documentUrl: "choose file" },
    ]);
  };

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
      setCompanyLogo(uploadRes.data.filePath);
    }
  };

  const documentDeleteHandler = (id: any) => {
    documentDeleteMutation.mutate(id);
  };

  const documentUpdateHandler = (doc: any) => {
    setOpenUpdateDocumentPopup(true);
    setUpdatedDocumentDetails(doc);
  };

  return (
    <>
      {
        <UpdateDocumentPopup
          openPopup={openUpdateDocumentPopup}
          closePopup={setOpenUpdateDocumentPopup}
          details={updatedDocumentDetails}
          dropdownValues={documentDropdownValues}
        />
      }
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mt-2">
        <div className="order-1 lg:order-1 col-span-1 lg:col-span-3 flex flex-col gap-3">
          <CompanyInformation
            data={{
              businessName: companyData.businessName,
              website: companyData.website,
              dbaName: companyData.dbaName,
              legalEntityName: companyData.legalEntityName,
              einNumber: companyData.einNumber,
              businessType: companyData.businessType,
              incorporationDate: companyData.incorporationDate,
            }}
            onUpdate={updateCompanyData}
            readOnly={true}
            open={open}
            setOpen={setOpen}
          />

          <ContactDetails
            data={{
              contactName: companyData.contactName,
              primaryEmail: companyData.primaryEmail,
              primaryPhoneNumber: companyData.primaryPhoneNumber,
              instagramLink: companyData.instagramLink,
              youtubeLink: companyData.youtubeLink,
              facebookLink: companyData.facebookLink,
            }}
            onUpdate={updateCompanyData}
          />

          <BusinessAddress
            data={{
              address1: companyData.address1,
              address2: companyData.address2,
              country: companyData.country,
              state: companyData.state,
              city: companyData.city,
              zipCode: companyData.zipCode,
            }}
            onUpdate={updateCompanyData}
          />

          <OwnershipInformation
            data={{
              owners: companyData.owners,
              authorizedSignatory: companyData.authorizedSignatory,
              businessType: companyData.businessType,
            }}
            onUpdateOwner={updateOwner}
            onUpdateAuthorizedSignatory={(index) =>
              updateCompanyData("authorizedSignatory", index)
            }
            onAddOwner={addOwner}
            onRemoveOwner={removeOwner}
          />

          <BankAccountInformation
            data={{
              accountNumber: companyData.accountNumber,
              bankName: companyData.bankName,
              payeeName: companyData.payeeName,
              routingNumber: companyData.routingNumber,
              bankType: companyData.bankType,
            }}
            onUpdate={updateCompanyData}
            onPrevious={handlePrevious}
            onSave={handleSave}
          />

          <Card>
            <CardContent>
              <CardTitle>Document Upload</CardTitle>
              <Button
                className="mb-2 mt-3 cursor-pointer text-orange-600 border border-orange-600"
                variant={"outline"}
                type="button"
                onClick={handleAddMore}
              >
                Add more
              </Button>
              <div className="grid grid-cols-3 gap-3">
                {documentInputs?.map((doc, index) => (
                  <div key={index} className="contents">
                    <div className="col-span-1">
                      <DropdownSelector
                        values={documentDropdownValues}
                        selectedValue={doc.documentType}
                        onChange={(value: any) =>
                          handleDocumentChange(index, value)
                        }
                      />
                    </div>

                    <div className="col-span-2 flex gap-3 items-start">
                      <div className="w-1/2">
                        <input
                          type="file"
                          accept="*/*"
                          className="hidden"
                          id={`file-upload-${index}`}
                          onChange={(e) => handleDocumentUpload(e, index)}
                        />
                        <label
                          htmlFor={`file-upload-${index}`}
                          className="w-full bg-[#E1E2E9] rounded-md p-2 text-[11px] cursor-pointer text-gray-600 block"
                        >
                          {doc.documentUrl !== "choose file"
                            ? doc.documentUrl.split("/").pop()
                            : "Choose file"}
                        </label>
                      </div>

                      {doc.documentUrl !== "choose file" && (
                        <div className="w-1/2 flex gap-2">
                          <Button onClick={() => documentUpdateHandler(doc)}>
                            Edit
                          </Button>
                          <Button
                            onClick={() => documentDeleteHandler(doc?.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className=" pb-6 flex justify-end mt-6">
            <Button onClick={handleSave}>Submit</Button>
          </div>
        </div>

        <CompanyLogo
          companyLogo={companyLogo}
          handleCompanyLogo={handleCompanyLogo}
        />
      </div>
    </>
  );
};

export default CompanyProfile;
