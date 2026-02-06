/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Owner {
  firstName: string;
  lastName: string;
  ssnNumber: string;
  streetAddressLine1: string;
  streetAddressLine2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  ownershipPercentage: string;
}

export interface DocumentFile {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: Date | null;
  status: "uploaded" | "verified";
}

export interface Document {
  id: string;
  type: string;
  files: DocumentFile[];
  maxFiles: number;
}

export interface CompanyData {
  businessName: string;
  website: string;
  dbaName: string;
  legalEntityName: string;
  einNumber: string;
  businessType: string;
  incorporationDate: Date | undefined;
  contactName: string;
  primaryEmail: string;
  primaryPhoneNumber: string;
  instagramLink: string;
  youtubeLink: string;
  facebookLink: string;
  linkedinLink: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  owners: Owner[];
  authorizedSignatory: number;
  accountNumber: string;
  bankName: string;
  payeeName: string;
  routingNumber: string;
  bankType: string;
  documents: Document[];
}

export type CompanyDataMap = Map<keyof CompanyData, any>;
