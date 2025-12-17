import { useEffect, useState } from "react";
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
import { useGetUserDetails } from "../../services/useGetUserDetails";
import { useUpdateUserDetails } from "../../services/useCreateOrUpdateUserDetails";
import { useGetImageUrl, useUploadImage } from "../../services/useUploadImage";

const dropdownValues = {
  Title: "Gender",
  options: [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Other",
      value: "other",
    },
  ],
};

const Profile = () => {
  const [gender, setGender] = useState(dropdownValues.options[0].label);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    profileImage: "",
  });

  const { data: userData } = useGetUserDetails();
  const createUserInfoMutation = useUpdateUserDetails();
  const getImageUrlMutation = useGetImageUrl();
  const uploadImageMutation = useUploadImage();

  console.log("data", userData?.data);

  useEffect(() => {
    if (userData) {
      const userInfo = userData?.data;
      setUserDetails((prev: any) => ({
        ...prev,
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        email: userInfo?.email,
        number: userInfo?.number,
        profileImage: userInfo?.profileImage,
      }));
    }
  }, [userData]);

  function handleGenderChange(value: any) {
    setGender(value.label);
  }

  const valueChangeHandler = (key: any, value: string) => {
    setUserDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUserImage = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageData = {
      fileName: file.name,
      fileType: file.type,
      path: "userImage",
    };

    const uploadRes = await getImageUrlMutation.mutateAsync({
      data: imageData,
    });

    if (uploadRes?.data?.uploadUrl) {
      await uploadImageMutation.mutateAsync({
        url: uploadRes.data.uploadUrl,
        file,
      });
      setUserDetails((prev) => ({
        ...prev,
        profileImage: uploadRes.data.filePath,
      }));
    }
  };

  const submitHandler = () => {
    const userInfo = {
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      email: userDetails?.email,
      number: userDetails?.number,
      profileImage: userDetails?.profileImage,
    };
    createUserInfoMutation.mutate(userInfo);
    console.log("submit");
  };

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
                <Input
                  value={userDetails?.firstName}
                  onChange={(e) =>
                    valueChangeHandler("firstName", e.target.value)
                  }
                  name="firstName"
                  id="firstName"
                  type="text"
                  required
                />
              </div>
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  value={userDetails?.lastName}
                  onChange={(e) =>
                    valueChangeHandler("lastName", e.target.value)
                  }
                  name="lastName"
                  id="lastName"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={userDetails?.email}
                  onChange={(e) => valueChangeHandler("email", e.target.value)}
                  name="email"
                  id="email"
                  type="text"
                  required
                />
              </div>
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  value={userDetails?.number}
                  onChange={(e) => valueChangeHandler("number", e.target.value)}
                  name="phone"
                  id="phone"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <DropdownSelector
                values={dropdownValues}
                selectedValue={gender}
                onChange={handleGenderChange}
              />
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
            <Button onClick={submitHandler} className=" px-6" type="submit">
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
          <div className="w-32 h-32  rounded-full overflow-hidden">
            <img
              className="object-cover"
              src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${
                userDetails?.profileImage
              }`}
              alt="uploaded-image"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">
            <TiIconCameraFilled />
            <input
              className="w-30 bg-none rounded-md p-1 text-[9px] cursor-pointer"
              placeholder="Upload Image"
              type="file"
              onChange={(e) => handleUserImage(e)}
            />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
