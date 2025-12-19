import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { TiIconCameraFilled } from "../icons";

const CompanyLogo = ({ companyLogo, handleCompanyLogo }: any) => {
  return (
    <Card className="lg:sticky order-2 lg:order-2 col-span-1 lg:top-24 h-fit">
      <CardHeader className="w-full">
        <CardTitle className="text-xl">Company Logo</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-32 h-32  rounded-full overflow-hidden">
          <img
            className="object-cover"
            src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${companyLogo}`}
            alt="uploaded-image"
          />
        </div>
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
