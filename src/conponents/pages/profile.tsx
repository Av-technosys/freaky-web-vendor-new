import profileImage from "../../assets/testingProfilePicture.jpg";
import { Button, Input, Label, Textarea } from "../../components/ui";
import DropdownSelector from "../dropdownSelector";
import { TiIconCameraFilled } from "../icons";

const dropdownValues = {
  Title: "Gender",
  Options: ["Male", "Female", "Other"],
};

const Profile = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4  gap-3">
      <div className="col-span-1 order-2  lg:col-span-3  p-4  bg-white shadow-lg rounded-xl">
        <h1 className="text-base text-[#111827s] font-bold">
          Personal Information
        </h1>
        <div className="flex mt-3 flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="col-span-1  flex flex-col items-start justify-center gap-3">
              <Label className="font-[400]" htmlFor="firstName">
                First Name
              </Label>
              <Input name="firstName" id="firstName" type="text" required />
            </div>
            <div className="col-span-1  flex flex-col items-start justify-center gap-3">
              <Label className="font-[400]" htmlFor="lastName">
                Last Name
              </Label>
              <Input name="lastName" id="lastName" type="text" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="col-span-1  flex flex-col items-start justify-center gap-3">
              <Label className="font-[400]" htmlFor="email">
                Email
              </Label>
              <Input name="email" id="email" type="text" required />
            </div>
            <div className="col-span-1  flex flex-col items-start justify-center gap-3">
              <Label className="font-[400]" htmlFor="phone">
                Phone
              </Label>
              <Input name="phone" id="phone" type="text" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <DropdownSelector values={dropdownValues} />
            <div className="col-span-1  flex flex-col items-start justify-center gap-3">
              <Label className="font-[400]" htmlFor="address">
                Address
              </Label>
              <Input name="address" id="address" type="text" required />
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-3">
            <Label className="font-[400]" htmlFor="message-2">
              Bio
            </Label>
            <Textarea className="min-h-[150px]" id="message-2" />
          </div>
          <div className="w-full flex items-center justify-end ">
            <Button className="bg-[#FF6020] px-6" type="submit">
              Save
            </Button>
          </div>
        </div>
      </div>
      <div className="col-span-1 lg:order-2 lg:sticky lg:top-20 h-72  bg-white shadow-lg rounded-xl flex flex-col items-center justify-center gap-4">
        <div className="text-base text-[#111827s] font-bold">
          Profile Picture
        </div>
        <div className="w-32 h-32 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={profileImage}
            alt="profile-picture"
          />
        </div>
        <div>
          <Button type="submit" className="w-full  bg-[#FF6020]">
            <TiIconCameraFilled />
            Change Photo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
