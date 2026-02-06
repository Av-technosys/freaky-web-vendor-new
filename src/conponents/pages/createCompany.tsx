/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type {
  Owner,
  CompanyData,
  Document,
  DocumentFile,
} from "../../types/company";

import CompanyInformation from "../common/CompanyInformationProps";
import {
  Avatar,
  AvatarFallback,
  Button,
  Card,
  CardContent,
  Separator,
} from "../../components/ui";
import ContactDetails from "../common/ContactDetails";
import BusinessAddress from "../common/BusinessAddress";
import OwnershipInformation from "../common/OwnershipInformation";
import BankAccountInformation from "../common/BankAccountInformation";
import DocumentUpload from "../common/DocumentUpload";
import {
  useCreateCompanyInformation,
  useUpdateBankAccountInformation,
  useUpdateBusinessAddressInformation,
  useUpdateContactInformation,
} from "@/services/useCreateOrUpdateCompanyDetails";

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

const CreateCompany = () => {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const CompanyInformationMutation = useCreateCompanyInformation();
  const ContactInformationMutation = useUpdateContactInformation();
  const BusinessAddressMutation = useUpdateBusinessAddressInformation();
  const BankAccountMutation = useUpdateBankAccountInformation();

  const nextHandler = () => {
    if (count == 0) {
      const companyInformationData = {
        businessName: companyData.businessName,
        websiteURL: companyData.website,
        DBAname: companyData.dbaName,
        legalEntityName: companyData.legalEntityName,
        einNumber: companyData.einNumber,
        businessType: companyData.businessType,
        incorporationDate: companyData.incorporationDate,
      };
      CompanyInformationMutation.mutate(companyInformationData);
    } else if (count == 1) {
      const companyContactDetails = {
        primaryContactName: companyData.contactName,
        primaryEmail: companyData.primaryEmail,
        primaryPhoneNumber: companyData.primaryPhoneNumber,
        instagramURL: companyData.instagramLink,
        youtubeURL: companyData.youtubeLink,
        facebookURL: companyData.facebookLink,
      };
      ContactInformationMutation.mutate(companyContactDetails);
    } else if (count == 2) {
      const companyBusinessAddress = {
        streetAddressLine1: companyData.address1,
        streetAddressLine2: companyData.address2,
        city: companyData.city,
        state: companyData.state,
        country: companyData.country,
        zipcode: companyData.zipCode,
      };
      BusinessAddressMutation.mutate(companyBusinessAddress);
    } else if (count == 4) {
      const companyBankAccountInformation = {
        bankAccountNumber: companyData.accountNumber,
        bankName: companyData.bankName,
        payeeName: companyData.payeeName,
        routingNumber: companyData.routingNumber,
        bankType: companyData.bankType,
      };
      BankAccountMutation.mutate(companyBankAccountInformation);
    }
    setCount((prev) => prev + 1);
  };

  const previousHandler = () => {
    setCount((prev) => prev - 1);
  };

  const formComponents = [
    {
      name: "Company Information",
      description: "Add company details",
    },
    {
      name: "Contact Details",
      description: "Add contact details",
    },
    {
      name: "Business Address",
      description: "Add business details",
    },
    {
      name: "Ownership Information",
      description: "Add owner's details",
    },
    {
      name: "Bank Account Information",
      description: "Add bank account details",
    },
  ];

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

    owners: [initialOwner],
    authorizedSignatory: 0,

    accountNumber: "",
    bankName: "",
    payeeName: "",
    routingNumber: "",
    bankType: "",

    documents: defaultDocuments,
  });

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
    if (companyData.owners.length >= 4) return;

    setCompanyData((prev) => ({
      ...prev,
      owners: [...prev.owners, { ...initialOwner }],
    }));
  };

  const removeOwner = (index: number) => {
    if (companyData.owners.length <= 1) return;

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

  const uploadDocument = (documentId: string, file: File) => {
    setCompanyData((prev) => {
      const updatedDocuments = prev.documents.map((doc) =>
        doc.id === documentId && doc.files.length < doc.maxFiles
          ? {
              ...doc,
              files: [
                ...doc.files,
                {
                  id: Date.now().toString(),
                  fileName: file.name,
                  fileUrl: URL.createObjectURL(file),
                  uploadedAt: new Date(),
                  status: "uploaded",
                } as DocumentFile,
              ],
            }
          : doc,
      );

      return { ...prev, documents: updatedDocuments };
    });
  };

  const removeDocumentFile = (documentId: string, fileId: string) => {
    setCompanyData((prev) => {
      const updatedDocuments = prev.documents.map((doc) =>
        doc.id === documentId
          ? { ...doc, files: doc.files.filter((f) => f.id !== fileId) }
          : doc,
      );
      return { ...prev, documents: updatedDocuments };
    });
  };

  // Convert companyData to Map
  const getCompanyDataMap = () => new Map(Object.entries(companyData));

  const handleSave = () => {
    const map = getCompanyDataMap();
    const dataObject = Object.fromEntries(map);
    console.log("Converted to Object:", dataObject);
  };

  const handlePrevious = () => console.log("Previous step");

  return (
    <>
      <Card className="max-w-6xl mx-auto p-4 ">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-4 gap-3">
          <div className="col-span-1">
            <Card>
              <CardContent>
                <div className="flex flex-col gap-2">
                  {" "}
                  {formComponents.map((comp, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="w-full flex items-center gap-2 p-2  rounded-md "
                        >
                          <div className="w-10 h-10 border border-black flex justify-center items-center rounded-full">
                            <Avatar className="size-12">
                              <AvatarFallback
                                className={`bg-white border border-gray-300 text-black ${
                                  count == index && "bg-black text-white"
                                } ${
                                  count > index && "bg-green-500 text-white"
                                }`}
                              >
                                {comp.name?.charAt(0)?.toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div>
                            <p className="text-gray-500 text-[15px] font-bold">
                              {comp.name}
                            </p>
                            <p className="text-gray-600 text-[10px]">
                              {comp.description}
                            </p>
                          </div>
                        </div>
                        <Separator />
                      </>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3">
            <div className="w-full flex items-center justify-center mb-2">
              {count == 0 ? (
                <div>
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
                    readOnly={false}
                    open={open}
                    setOpen={setOpen}
                  />
                </div>
              ) : count == 1 ? (
                <div className="w-full">
                  <ContactDetails
                    data={{
                      contactName: companyData.contactName,
                      primaryEmail: companyData.primaryEmail,
                      primaryPhoneNumber: companyData.primaryPhoneNumber,
                      instagramLink: companyData.instagramLink,
                      youtubeLink: companyData.youtubeLink,
                      facebookLink: companyData.facebookLink,
                      linkedinLink: companyData.linkedinLink,
                    }}
                    onUpdate={updateCompanyData}
                  />
                </div>
              ) : count == 2 ? (
                <div className="w-full">
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
                </div>
              ) : count == 3 ? (
                <div className="w-full">
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
                </div>
              ) : count == 4 ? (
                <div className="w-full">
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
                </div>
              ) : (
                <DocumentUpload
                  documents={companyData.documents}
                  onUploadDocument={uploadDocument}
                  onRemoveDocumentFile={removeDocumentFile}
                />
              )}
            </div>
            <div className=" w-full flex items-center justify-end gap-2">
              <Button
                onClick={previousHandler}
                className={`${count == 0 ? "hidden" : "cursor-pointer"}`}
                variant={"outline"}
              >
                Previous
              </Button>
              <Button
                onClick={nextHandler}
                className={`${count == 4 ? "hidden" : "cursor-pointer"}`}
                variant={"outline"}
              >
                Next
              </Button>
              <Button
                className={`${count == 4 ? "Block" : "hidden"}`}
                variant={"outline"}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CreateCompany;
