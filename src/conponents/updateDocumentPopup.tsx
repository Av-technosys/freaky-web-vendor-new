import { useState } from "react";
import { Button } from "../components/ui";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import DropdownSelector from "./dropdownSelector";
import { TiIconPlayerPlay } from "./icons";
import { useGetImageUrl, useUploadImage } from "../services/useUploadImage";
import { useUpdateVendorDocument } from "../services/useCreateOrUpdateCompanyDetails";

const UpdateDocumentPopup = ({
  openPopup,
  closePopup,
  details,
  dropdownValues,
}: any) => {
  const [documentType, setDocumentType] = useState();
  const [documentURL, setDocumentURL] = useState("");

  const getImageUrlMutation = useGetImageUrl();
  const uploadImageMutation = useUploadImage();

  const updateDocumentMutation = useUpdateVendorDocument();

  function handleDocumentChange(value: any) {
    setDocumentType(value.value);
  }

  const handleDocumentUpload = async (e: any) => {
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

    setDocumentURL(uploadRes?.data?.filePath);

    if (uploadRes?.data?.uploadUrl) {
      await uploadImageMutation.mutateAsync({
        url: uploadRes.data.uploadUrl,
        file,
      });
    }
  };

  const submitHandler = () => {
    const documentData = {
      id: details.id,
      documentType: documentType,
      documentURL: documentURL,
    };
    updateDocumentMutation.mutate(documentData);
    closePopup(false);
  };

  return (
    <>
      <AlertDialog open={openPopup} onOpenChange={closePopup}>
        <AlertDialogTrigger asChild>
          <Button
            variant={"outline"}
            className="absolute top-14 right-14 cursor-pointer  h-7 w-7 hidden group-hover:flex"
          >
            <TiIconPlayerPlay size="12" color="#D30000" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="md:max-w-xl  ">
          <AlertDialogHeader>
            <AlertDialogDescription>
              <Alert className=" text-destructive border-none">
                <AlertDescription>
                  <div className="w-full grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                      <DropdownSelector
                        values={dropdownValues}
                        selectedValue={documentType ?? details?.documentType}
                        onChange={(value: any) => handleDocumentChange(value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="file"
                        accept="*/*"
                        className="w-full bg-[#E1E2E9] rounded-md p-3 text-[11px] cursor-pointer text-gray-600 block"
                        onChange={(e) => handleDocumentUpload(e)}
                      />
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={submitHandler} className=" px-6" type="submit">
              Save
            </Button>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UpdateDocumentPopup;
