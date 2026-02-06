import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { TiIconCameraFilled, TiIconTrash } from "../icons";
import ImageViewerDialog from "../imageViewerDialog";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteCompanyLogo } from "@/services/useCreateOrUpdateCompanyDetails";
import uploadImage from "../../assets/uploadImage.png";

const CompanyLogo = ({ vendorId, companyLogo, handleCompanyLogo }: any) => {
  const queryClient = useQueryClient();

  const deleteCompanyLogoMutation = useDeleteCompanyLogo();

  const imageDeleteHandler = (id: number | any) => {
    deleteCompanyLogoMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["vendor-details"],
        });
      },
    });
  };

  return (
    <Card className="lg:sticky order-2 lg:order-2 col-span-1 lg:top-24 h-fit">
      <CardHeader className="w-full">
        <CardTitle className="text-md">Company Logo</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {companyLogo ? (
          <div className="relative w-fit  mx-auto group">
            {/* Buttons */}
            <div className="absolute inset-4 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition">
              <ImageViewerDialog mediaUrl={companyLogo} />

              <Button
                variant="outline"
                className="h-7 w-7"
                onClick={() => imageDeleteHandler(vendorId)}
              >
                <TiIconTrash size="12" color="#D30000" />
              </Button>
            </div>

            {/* Image */}
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${companyLogo}`}
                alt="uploaded-image"
              />
            </div>
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full flex items-center  border border-gray-200 justify-center overflow-hidden">
            <img className="object-cover" src={uploadImage} alt="Banner" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button type="submit">
          <TiIconCameraFilled />
          <input
            className="w-30 bg-none rounded-md p-1 text-[9px] cursor-pointer"
            placeholder="Upload Image"
            type="file"
            onChange={(e) => handleCompanyLogo(e)}
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompanyLogo;
