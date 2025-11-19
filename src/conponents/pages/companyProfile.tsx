import { useState } from "react";
import { Card } from "../../components/ui/card";
import { useCompanyData } from "../../hooks/useCompanyData";
import CompanyInformation from "../common/CompanyInformationProps";
import ContactDetails from "../common/ContactDetails";
import BusinessAddress from "../common/BusinessAddress";
import OwnershipInformation from "../common/OwnershipInformation";
import BankAccountInformation from "../common/BankAccountInformation";
import CompanyLogo from "../common/CompanyLogo";
import DocumentUpload from "../common/DocumentUpload";

const CompanyProfile = () => {
  const [open, setOpen] = useState(false);
  //  const [time, setTime] = useState(dropdownValues.options[0].label);
  const {
    companyData,
    updateCompanyData,
    updateOwner,
    addOwner,
    removeOwner,
    getCompanyDataMap,
    uploadDocument,
    removeDocumentFile,
  } = useCompanyData();

  const handleSave = () => {
    const companyDataMap = getCompanyDataMap();
    console.log("Company Data as HashMap:", companyDataMap);
    console.log("Company Data as Object:", companyData);

    // You can now use the hashmap for API calls or further processing
    // Example: convert to regular object if needed
    const dataObject = Object.fromEntries(companyDataMap);
    console.log("Converted to Object:", dataObject);
  };

  const handlePrevious = () => {
    // Handle previous step logic
    console.log("Previous step");
  };

  // function handleTimeChange(value: any) {
  //   setTime(value.label);
  // }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
      <Card className="order-1 lg:order-1 col-span-1 lg:col-span-3">
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
          onRemoveOwner={removeOwner} // Add this line
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
      </Card>

      <CompanyLogo />
    </div>
  );
};

export default CompanyProfile;
