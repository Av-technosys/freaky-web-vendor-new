import profileImage from "../../assets/testingProfilePicture.jpg";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
} from "../../components/ui";
import DropdownSelector from "../dropdownSelector";
import { TiIconCameraFilled } from "../icons";

const dropdownValues = {
  Title: "Gender",
  Options: ["Male", "Female", "Other"],
};

const Profile = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4  gap-3">
      <Card className="col-span-1 order-2  lg:col-span-3  py-4 bg-white shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-base text-[#111827s] font-bold">
            Personal Information
          </CardTitle>
        </CardHeader>
        <div className="flex flex-col gap-6">
          <CardContent className="w-full flex flex-col gap-3">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="firstName">First Name</Label>
                <Input name="firstName" id="firstName" type="text" required />
              </div>
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="lastName">Last Name</Label>
                <Input name="lastName" id="lastName" type="text" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" type="text" required />
              </div>
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="phone">Phone</Label>
                <Input name="phone" id="phone" type="text" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <DropdownSelector values={dropdownValues} />
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="address">Address</Label>
                <Input name="address" id="address" type="text" required />
              </div>
            </div>
            <div className="flex flex-col items-start justify-center gap-3">
              <Label htmlFor="message-2">Bio</Label>
              <Textarea className="min-h-[150px]" id="message-2" />
            </div>
          </CardContent>
          <CardFooter className="w-full flex items-center justify-end ">
            <Button className=" px-6" type="submit">
              Save
            </Button>
          </CardFooter>
        </div>
      </Card>
      <Card className="col-span-1 lg:order-2 lg:sticky lg:top-20 h-72  bg-white shadow-lg rounded-xl flex flex-col items-center text-center justify-center gap-4">
        <CardHeader className=" w-full">
          <CardTitle className=" text-xl">Profile Picture</CardTitle>
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
          <Button type="submit" className="w-full">
            <TiIconCameraFilled />
            Change Photo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
