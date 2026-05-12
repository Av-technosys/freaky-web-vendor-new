/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import DropdownSelector from "../dropdownSelector";
import { DOCUMENT_DROPDOWN_VALUES } from '@/const';
import type { DocumentInput, DocumentUploadProps } from '@/types';
import { useCreateVendorDocument, useDeleteVendorDocument, useGetImageUrl, useGetVendorDetails, useGetVendorDocuments, useUpdateVendorDocument, useUploadImage } from '@/services';
import { Button, Card, CardContent, CardTitle } from '@/components/ui';
import { toast } from 'sonner';

const DocumentUpload = ({ onUpload }: DocumentUploadProps) => {

  const { data: vendorData } = useGetVendorDetails();
  const { data: vendorDocumentsData, isLoading: isDocsLoading } = useGetVendorDocuments();

  const createDocumentMutation = useCreateVendorDocument();
  const updateDocumentMutation = useUpdateVendorDocument();
  const deleteDocumentMutation = useDeleteVendorDocument();

  const getImageUrlMutation = useGetImageUrl();
  const uploadImageMutation = useUploadImage();

  const [documentInputs, setDocumentInputs] = useState<DocumentInput[]>([]);

  useEffect(() => {
    if (vendorDocumentsData?.data) {
      const mappedDocs = vendorDocumentsData.data;
      setDocumentInputs(mappedDocs);
    }
  }, [vendorDocumentsData, isDocsLoading]);





  const handleDocumentUpload = async (id: string, e: any, documentType: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageData = {
      fileName: file.name,
      fileType: file.type,
      path: "vendorDocument",
    };

    const uploadRes = await getImageUrlMutation.mutateAsync({
      data: imageData,
    });


    if (uploadRes?.data?.uploadUrl) {
      await uploadImageMutation.mutateAsync({
        url: uploadRes.data.uploadUrl,
        file,
      });
    }
  };

  const updateDocument = (id: string, documentType: string, file: File) => {
    const formData = new FormData();
    formData.append("documentType", documentType);
    formData.append("file", file);
    updateDocumentMutation.mutate({
      documentId: id,
      formData
    });
  }

  const handleAddMore = () => {
    createDocumentMutation.mutate([{ documentType: "", documentUrl: "choose file", isNew: true }]);
  };

  const handleDocumentTypeChange = (index: number, value: string) => {
    const updatedInputs = [...documentInputs];
    updatedInputs[index].documentType = value;
    setDocumentInputs(updatedInputs);
  };

  const documentDeleteHandler = (id: string) => {
    if (id) {
      deleteDocumentMutation.mutate(id);
    } else {
      toast.error("Document not found, please try again.");
    }
  };

  if (isDocsLoading) return <div>Loading...</div>;

  return (
    <Card>
      <CardContent>
        <div className='flex justify-between items-center mb-5'>
          <CardTitle>Document Upload</CardTitle>
          <Button
            className="mb-2 ml-auto mt-3 cursor-pointer text-orange-600 border border-orange-600"
            variant={"outline"}
            type="button"
            onClick={handleAddMore}
          >
            Add more
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {documentInputs?.map((doc, index) => {
            return (
              <div key={index} className="grid grid-cols-3 gap-3 border-b pb-4 last:border-0 last:pb-0 items-end">
                <div className="col-span-1">
                  <DropdownSelector
                    values={DOCUMENT_DROPDOWN_VALUES}
                    selectedValue={doc.documentType}
                    onChange={(item: any) =>
                      handleDocumentTypeChange(index, item.value)
                    }
                  />
                </div>

                <div className="col-span-2 flex gap-3 items-center">
                  <div className="w-1/2">
                    <input
                      type="file"
                      className="hidden"
                      id={`file-upload-${index}`}
                      onChange={(e) => handleDocumentUpload(doc.id as string, e, doc.documentType)}
                    />
                    <label
                      htmlFor={`file-upload-${index}`}
                      className="w-full bg-gray-200 h-10 items-center flex justify-center rounded-md p-2 text-xs cursor-pointer text-gray-600 text-center truncate"
                    >
                      {doc.documentUrl ? (
                        doc.isNew && doc.file ? doc.file.name :
                          <span title={doc.documentUrl}>{doc.documentUrl?.split("/").pop()}</span>
                      ) : (
                        "Choose file"
                      )}
                    </label>
                  </div>

                  <div className="flex items-center gap-2">

                    {doc.documentUrl && <a
                      href={`${doc.documentUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-xs hover:underline"
                    >
                      View
                    </a>}

                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => documentDeleteHandler(doc.id as string)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </CardContent>
    </Card>

  );
};

export default DocumentUpload;
