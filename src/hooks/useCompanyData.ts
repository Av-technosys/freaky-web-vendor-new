/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { Owner, CompanyData, CompanyDataMap, Document, DocumentFile } from '../types/company';

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
  percentage: ""
};

const defaultDocuments: Document[] = [
  {
    id: '1',
    type: 'business_license',
    files: [],
    maxFiles: 5
  },
  {
    id: '2',
    type: 'tax_certificate', 
    files: [],
    maxFiles: 5
  },
  {
    id: '3',
    type: 'ownership_proof',
    files: [],
    maxFiles: 5
  },
  {
    id: '4',
    type: 'bank_statement',
    files: [],
    maxFiles: 5
  }
];

export const useCompanyData = () => {
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
    documents: defaultDocuments
  });

  const updateCompanyData = (key: keyof CompanyData, value: any) => {
    setCompanyData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateOwner = (index: number, field: keyof Owner, value: string) => {
    setCompanyData(prev => {
      const updatedOwners = [...prev.owners];
      updatedOwners[index] = {
        ...updatedOwners[index],
        [field]: value
      };
      return { ...prev, owners: updatedOwners };
    });
  };

  const addOwner = () => {
    if (companyData.owners.length >= 4) return;
    setCompanyData(prev => ({
      ...prev,
      owners: [...prev.owners, { ...initialOwner }]
    }));
  };

  const removeOwner = (index: number) => {
    if (companyData.owners.length <= 1) return;
    
    setCompanyData(prev => {
      const updatedOwners = prev.owners.filter((_, i) => i !== index);
      
      let newAuthorizedSignatory = prev.authorizedSignatory;
      if (index === prev.authorizedSignatory) {
        newAuthorizedSignatory = 0;
      } else if (index < prev.authorizedSignatory) {
        newAuthorizedSignatory = prev.authorizedSignatory - 1;
      }
      
      return {
        ...prev,
        owners: updatedOwners,
        authorizedSignatory: newAuthorizedSignatory
      };
    });
  };

  // Upload file to a specific document
  const uploadDocument = (documentId: string, file: File) => {
    setCompanyData(prev => {
      const updatedDocuments = prev.documents.map(doc => {
        if (doc.id === documentId && doc.files.length < doc.maxFiles) {
          const newFile: DocumentFile = {
            id: Date.now().toString(),
            fileName: file.name,
            fileUrl: URL.createObjectURL(file),
            uploadedAt: new Date(),
            status: 'uploaded'
          };
          return {
            ...doc,
            files: [...doc.files, newFile]
          };
        }
        return doc;
      });
      return { ...prev, documents: updatedDocuments };
    });
  };

  // Remove a specific file from a document
  const removeDocumentFile = (documentId: string, fileId: string) => {
    setCompanyData(prev => {
      const updatedDocuments = prev.documents.map(doc => 
        doc.id === documentId 
          ? {
              ...doc,
              files: doc.files.filter(file => file.id !== fileId)
            }
          : doc
      );
      return { ...prev, documents: updatedDocuments };
    });
  };

  // Convert to HashMap
  const getCompanyDataMap = (): CompanyDataMap => {
    const map = new Map();
    Object.entries(companyData).forEach(([key, value]) => {
      map.set(key as keyof CompanyData, value);
    });
    return map;
  };

  return {
    companyData,
    updateCompanyData,
    updateOwner,
    addOwner,
    removeOwner,
    uploadDocument,
    removeDocumentFile,
    getCompanyDataMap
  };
};