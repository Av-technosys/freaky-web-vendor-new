import { useEffect, useRef, useState } from "react";
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
import uploadImage from "../../assets/uploadImage.png";

import { TiIconCameraFilled, TiIconTrash } from "../icons";
import { useGetUserDetails } from "../../services/useGetUserDetails";
import {
  useDeleteProfileImage,
  useUpdateProfileImage,
  useUpdateUserDetails,
} from "../../services/useCreateOrUpdateUserDetails";
import { useGetImageUrl, useUploadImage } from "../../services/useUploadImage";
import { LoaderCircle } from "lucide-react";
import { US_STATES } from "@/const/usState";
import DropdownSelector from "../dropdownSelector";
import { SkeletonForm } from "@/components/skleton/form";
import ImageViewerDialog from "../imageViewerDialog";

const dropdownValuesCountries = {
  options: [
    {
      label: "United States",
      value: "united_states",
    },
  ],
};

const dropdownValuesStates = {
  options: US_STATES.map((state) => ({
    label: state,
    value: state,
  })),
};

const Profile = () => {
  const fileInputRef = useRef<any>(null);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    profileImage: "",
  });

  const [address, setAddress] = useState({
    country: dropdownValuesCountries.options[0].value,
    state: dropdownValuesStates.options[0].value,
    city: "",
    zipCode: "",
    addressLine1: "",
    addressLine2: "",
  });

  const { data: userData, isPending } = useGetUserDetails();
  const createUserInfoMutation = useUpdateUserDetails();
  const createOrUpdateProfileImage = useUpdateProfileImage();
  const deleteProfileImageMutation = useDeleteProfileImage();

  const { isPending: isSaving } = createUserInfoMutation;
  const getImageUrlMutation = useGetImageUrl();
  const uploadImageMutation = useUploadImage();

  useEffect(() => {
    if (userData) {
      const userInfo = userData?.data?.[0];
      setUserDetails((prev: any) => ({
        ...prev,
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        email: userInfo?.email,
        number: userInfo?.number,
        profileImage: userInfo?.profileImage,
      }));
      setAddress((prev: any) => ({
        ...prev,
        country: userInfo?.country,
        state: userInfo?.state,
        city: userInfo?.city,
        zipCode: userInfo?.postalCode,
        addressLine1: userInfo?.streetAddress1,
        addressLine2: userInfo?.streetAddress2,
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
      const filePath = uploadRes.data.filePath;

      setUserDetails((prev) => ({
        ...prev,
        profileImage: filePath,
      }));

      createOrUpdateProfileImage.mutate({
        profileImage: filePath,
      });
    }
  };

  const submitHandler = () => {
    const userInfo = {
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      number: userDetails?.number,
      ...address,
      currentAddressId: userData?.data[0]?.currentAddressId,
    };
    createUserInfoMutation.mutate(userInfo);
  };

  const imageDeleteHandler = (id: number | any) => {
    deleteProfileImageMutation.mutate(id, {
      onSuccess: () => {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setUserDetails((prev: any) => ({
          ...prev,
          profileImage: "",
        }));
      },
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4  gap-3">
      {isPending ? (
        <SkeletonForm />
      ) : (
        <>
          <Card className="col-span-1 order-2  lg:col-span-3  py-4 bg-white shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className=" ">
                <p className="text-lg">Personal Information</p>
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

                {/* Location of the service */}

                <p className="text-lg mt-6">Address</p>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="col-span-1 flex flex-col items-start justify-center gap-2">
                      <Label htmlFor="address1">Street Address Line 1</Label>
                      <Input
                        name="address1"
                        id="address1"
                        placeholder="Enter Street Address Line 1"
                        type="text"
                        value={address.addressLine1}
                        onChange={(e) =>
                          setAddress((prev) => ({
                            ...prev,
                            addressLine1: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>

                    <div className="col-span-1 flex flex-col items-start justify-center gap-2">
                      <Label htmlFor="address2">Street Address Line 2</Label>
                      <Input
                        name="address2"
                        id="address2"
                        placeholder="Enter Street Address Line 2"
                        type="text"
                        value={address.addressLine2}
                        onChange={(e) =>
                          setAddress((prev) => ({
                            ...prev,
                            addressLine2: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    <div className="col-span-1 flex flex-col items-start justify-center w-full gap-2">
                      <Label htmlFor="country">Country</Label>
                      <div className=" w-full">
                        <DropdownSelector
                          values={dropdownValuesCountries}
                          selectedValue={address.country}
                          onChange={({ value }: any) =>
                            setAddress((prev) => ({ ...prev, country: value }))
                          }
                        />
                      </div>
                    </div>

                    <div className="col-span-1 flex flex-col items-start w-full justify-center gap-2">
                      <Label htmlFor="state">State</Label>
                      <div className="w-full">
                        <DropdownSelector
                          values={dropdownValuesStates}
                          selectedValue={address.state}
                          onChange={({ value }: any) =>
                            setAddress((prev) => ({ ...prev, state: value }))
                          }
                        />
                      </div>
                    </div>

                    <div className="col-span-1 flex flex-col items-start justify-center gap-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        name="city"
                        id="city"
                        placeholder="Enter City"
                        type="text"
                        value={address.city}
                        onChange={(e) =>
                          setAddress((prev) => ({
                            ...prev,
                            city: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>

                    <div className="col-span-1 flex flex-col items-start justify-center gap-2">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input
                        placeholder="Enter Zip Code"
                        className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        name="zipCode"
                        id="zipCode"
                        type="number"
                        value={address.zipCode}
                        onChange={(e) =>
                          setAddress((prev) => ({
                            ...prev,
                            zipCode: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
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
              {/* <div className="w-32 h-32  rounded-full overflow-hidden">
                <img
                  className="object-cover"
                  src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${userDetails?.profileImage
                    }`}
                  alt="uploaded-image"
                />
              </div> */}
              {userDetails?.profileImage ? (
                <div className="relative w-fit  mx-auto group">
                  {/* Buttons */}
                  <div className="absolute inset-4 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition">
                    <ImageViewerDialog mediaUrl={userDetails?.profileImage} />

                    <Button
                      variant="outline"
                      disabled={deleteProfileImageMutation.isPending}
                      className="h-7 w-7"
                      onClick={() =>
                        imageDeleteHandler(userData?.data?.[0]?.id)
                      }
                    >
                      <TiIconTrash size="12" color="#D30000" />
                    </Button>
                  </div>

                  {/* Image */}
                  <div className="w-32 h-32 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${userDetails?.profileImage}`}
                      alt="uploaded-image"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full flex items-center  border border-gray-200 justify-center overflow-hidden">
                  <img
                    className="object-cover"
                    src={uploadImage}
                    alt="Banner"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit">
                <TiIconCameraFilled />
                <input
                  ref={fileInputRef}
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
