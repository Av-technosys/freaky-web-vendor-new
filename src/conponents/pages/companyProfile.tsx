/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type {
  Owner,
  CompanyData,
  Document,
  DocumentFile,
} from "../../types/company";

import CompanyInformation from "../common/CompanyInformationProps";
import ContactDetails from "../common/ContactDetails";
import BusinessAddress from "../common/BusinessAddress";
import OwnershipInformation from "../common/OwnershipInformation";
import BankAccountInformation from "../common/BankAccountInformation";
import CompanyLogo from "../common/CompanyLogo";
import DocumentUpload from "../common/DocumentUpload";
import { Button } from "../../components/ui";

// ------------------------ INITIAL VALUES ------------------------

const initialOwner: Owner = {
  firstName: "",
  lastName: "",
  ssn: "",
  address1: "",
  address2: "",
  country: "",
  state: "",
  city: "",
  zipCode: "",
  percentage: "",
};

const defaultDocuments: Document[] = [
  { id: "1", type: "business_license", files: [], maxFiles: 5 },
  { id: "2", type: "tax_certificate", files: [], maxFiles: 5 },
  { id: "3", type: "ownership_proof", files: [], maxFiles: 5 },
  { id: "4", type: "bank_statement", files: [], maxFiles: 5 },
];

// -------------------------- MAIN COMPONENT ------------------------

const CompanyProfile = () => {
  const [open, setOpen] = useState(false);

  // ----------------------- STATE -----------------------
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
          : doc
      );

      return { ...prev, documents: updatedDocuments };
    });
  };

  const removeDocumentFile = (documentId: string, fileId: string) => {
    setCompanyData((prev) => {
      const updatedDocuments = prev.documents.map((doc) =>
        doc.id === documentId
          ? { ...doc, files: doc.files.filter((f) => f.id !== fileId) }
          : doc
      );
      return { ...prev, documents: updatedDocuments };
    });
  };

  // Convert companyData to Map
  const getCompanyDataMap = () => new Map(Object.entries(companyData));

  // -------------------------- HANDLERS --------------------------

const handleSave = () => {
  const map = getCompanyDataMap();
  console.log("Company Data (Map):", map);
  console.log("Company Data (Object):", companyData);

  const dataObject = Object.fromEntries(map);
  console.log("Converted to Object:", dataObject);
};

  const handlePrevious = () => console.log("Previous step");

  // --------------------------- JSX ---------------------------

  return (
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

        <DocumentUpload
          documents={companyData.documents}
          onUploadDocument={uploadDocument}
          onRemoveDocumentFile={removeDocumentFile}
        />
              {/* 🚀 FINAL SUBMIT BUTTON */}
      <div className=" pb-6 flex justify-end mt-6">
        <Button           onClick={handleSave}
>
          Submit
        </Button>
        {/* <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit All Data
        </button> */}
      </div>
      </div>

      <CompanyLogo />

    </div>
  );
};

export default CompanyProfile;
