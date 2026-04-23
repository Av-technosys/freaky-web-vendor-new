import { Link, useParams } from "react-router-dom";
import CompanyInformation from "../common/CompanyInformationProps";
import ContactDetails from "../common/ContactDetails";
import BusinessAddress from "../common/BusinessAddress";
import BankAccountInformation from "../common/BankAccountInformation";
import DocumentUpload from "../common/DocumentUpload";
import OwnershipInformation from "../common/OwnershipInformation";

export default function CompanyProfileEdit() {
    const { slug } = useParams();

    if (typeof slug === "string") {
        const handler = companyUpdate[slug];
        if (handler) {
            return handler;
        }
    }
    return (
        <div>
            <h1>Wrong slug <Link className=" text-blue-500 underline" to="/company-profile"> Go back</Link></h1>
        </div>
    );
};

const companyUpdate: { [key: string]: React.ReactNode } = {
    "company-information": <CompanyInformation />,
    "contact-details": <ContactDetails />,
    "business-address": <BusinessAddress />,
    "bank-account-information": <BankAccountInformation />,
    "document-upload": <DocumentUpload />,
    "ownership-information": <OwnershipInformation />,
}