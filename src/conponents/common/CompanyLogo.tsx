import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { TiIconCameraFilled } from "../icons";
import profileImage from "../../assets/testingProfilePicture.jpg";

const CompanyLogo = () => {
    return (
        <Card className="lg:sticky order-2 lg:order-2 col-span-1 lg:top-24 h-fit">
            <CardHeader className="w-full">
                <CardTitle className="text-xl">Company Logo</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="w-32 h-32 rounded-full overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src={profileImage}
                        alt="profile-picture"
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button type="submit">
                    <TiIconCameraFilled />
                    Upload Logo
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CompanyLogo;