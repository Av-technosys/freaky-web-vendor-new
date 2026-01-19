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
} from "../../components/ui";

import { TiIconCameraFilled } from "../icons";
import { useGetUserDetails } from "../../services/useGetUserDetails";
import { useUpdateUserDetails } from "../../services/useCreateOrUpdateUserDetails";
import { useGetImageUrl, useUploadImage } from "../../services/useUploadImage";
import { InputGroupAddon } from "@/components/ui/input-group";
import { LoaderCircle } from "lucide-react";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    profileImage: "",
    streetAddress1: "",
    streetAddress2: "",
  });

  const { data: userData, isPending } = useGetUserDetails();
  const createUserInfoMutation = useUpdateUserDetails();
  const { isPending: isSaving } = createUserInfoMutation;
  const getImageUrlMutation = useGetImageUrl();
  const uploadImageMutation = useUploadImage();

  useEffect(() => {
    if (userData) {
      const userInfo = userData?.data[0];
      setUserDetails((prev: any) => ({
        ...prev,
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        email: userInfo?.email,
        number: userInfo?.number,
        profileImage: userInfo?.profileImage,
        streetAddress1: userInfo?.streetAddress1,
        streetAddress2: userInfo?.streetAddress2,
      }));
    }
  }, [userData]);

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
      number: userDetails?.number,
      profileImage: userDetails?.profileImage,
      streetAddress1: userDetails?.streetAddress1,
      streetAddress2: userDetails?.streetAddress2,
    };
    createUserInfoMutation.mutate(userInfo);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4  gap-3">
      {isPending ? (
        <InputGroupAddon align="inline-end">
          <LoaderCircle className="animate-spin" />
        </InputGroupAddon>
      ) : (
        <>
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
                      readOnly
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
                      onChange={(e) =>
                        valueChangeHandler("number", e.target.value)
                      }
                      name="phone"
                      id="phone"
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label className=" mb-2">Street Address Line 1</Label>
                    <Input
                      value={userDetails?.streetAddress1}
                      onChange={(e) =>
                        valueChangeHandler("streetAddress1", e.target.value)
                      }
                      name="streetAddress1"
                      id="streetAddress1"
                      type="text"
                      required
                    />
                  </div>
                  <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                    <Label htmlFor="address">Street Address Line 2</Label>
                    <Input
                      value={userDetails?.streetAddress2}
                      onChange={(e) =>
                        valueChangeHandler("streetAddress2", e.target.value)
                      }
                      name="streetAddress2"
                      id="streetAddress2"
                      type="text"
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="w-full flex items-center justify-end ">
                <Button
                  disabled={isSaving}
                  onClick={submitHandler}
                  className=" px-6 cursor-pointer"
                  type="submit"
                >
                  {isSaving && (
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                  )}
                  {isSaving ? "Saving..." : "Save"}
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
        </>
      )}
    </div>
  );
};

export default Profile;
