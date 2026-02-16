import { useEffect, useState } from "react";
import { Button, Card, CardContent, Input, Label } from "../../components/ui";
import DropdownSelector from "../dropdownSelector";

import uploadImage from "../../assets/uploadImage.png";
import { useNavigate, useParams } from "react-router-dom";
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { VITE_GOOGLE_MAPS_API_KEY } from '@/const/env';
import { getAddressValue, googleAddressItems } from "@/utils/addressUtils";

import { useGetVendorServiceByServiceId } from "../../services/useGetVendorServices";
import { useGetImageUrl, useUploadImage } from "../../services/useUploadImage";
import {
  useCreateVendorService,
  useDeleteBannerImage,
  useUpdateVendorService,
} from "../../services/useCreateOrUpdateVendorService";
import { useQueryClient } from "@tanstack/react-query";
import ServiceAdditionalPhotos from "../serviceAdditionalPhotos";
import ImageViewerDialog from "../imageViewerDialog";
import { toast } from "sonner";
import {
  MAX_HEIGHT,
  MAX_SIZE,
  MAX_WIDTH,
} from "@/components/calendar/constants";
import MarkdownEditor from "../textEditor";
import { DollarSign, LoaderCircle } from "lucide-react";
import { TiIconTrash } from "../icons";
import { TooltipInfo } from "@/components/TooltipInfo";
import { US_STATES } from "@/const/locatoins";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import withAuthorization from "@/lib/withAuthorization";

const dropdownValuesProductCategories = {
  options: [
    {
      label: "PRODUCT",
      value: "PRODUCT",
    },
    {
      label: "ADDON",
      value: "ADDON",
    },
  ],
};

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

const dropdownValuesProductPriceType = {
  options: [
    {
      label: "FLAT",
      value: "FLAT",
    },
    {
      label: "TIRE",
      value: "TIRE",
    },
  ],
};

// function formatDate(date: Date | undefined) {
//   if (!date) {
//     return "";
//   }
//   return date.toLocaleDateString("en-US", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });
// }
// function isValidDate(date: Date | undefined) {
//   if (!date) {
//     return false;
//   }
//   return !isNaN(date.getTime());
// }

const ManageService = () => {
  // const [open, setOpen] = useState(false);
  // const [date, setDate] = useState<Date | undefined>(undefined);
  // const [month, setMonth] = useState<Date | undefined>(date);
  // const [value, setValue] = useState(formatDate(date));
  // const [time, setTime] = useState("12:00");

  const [serviceName, setServiceName] = useState("");
  const [categoryName, setCategoryName] = useState("PRODUCT");
  const [address, setAddress] = useState({
    countery: dropdownValuesCountries.options[0].value,
    state: dropdownValuesStates.options[0].value,
    city: "",
    zipCode: "",
    addressLine1: "",
    addressLine2: "",
  });
  const [pricingType, setPricingType] = useState("FLAT");
  const [unitPricing, setUnitPricing] = useState({
    price: "0",
    lowerBound: "0",
    upperBound: "0",
  });
  const [longDescription, setLongDescription] = useState<String>("");

  const [maxBooking, setMaxBooking] = useState<number>();
  const [deleveryRadius, setDeleveryRadius] = useState<number>();

  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { productId } = useParams();

  const { data, isPending } = useGetVendorServiceByServiceId(productId);

  const [mediaImages, setMediaImages] = useState<any>([]);
  const [mediaBanner, setMediaBanner] = useState<any>("");
  const [additionalImagesUrl, setAdditionalImagesUrl] = useState<any>([]);
  const [videoUrl, setVideoUrl] = useState("");

  const getImageUrlMutation = useGetImageUrl();
  const uploadImageMutation = useUploadImage();
  const deleteBannerImageMutation = useDeleteBannerImage();

  useEffect(() => {
    if (data?.product && productId) {
      setMediaImages(data.product.media);
      setServiceName(data.product.title || "");
      setCategoryName(data.product.type || "Select Product Category");
      setLongDescription(data.product.description || "");
      setMediaBanner(data.product.bannerImage || "");
      setDeleveryRadius(data.product.deliveryRadius || "");
      setMaxBooking(data.product.maxQuantity || "");
    }
  }, [data, productId]);

  const libraries: ('places')[] = ['places'];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (auto: google.maps.places.Autocomplete) => {
    setAutocomplete(auto);
  };

  const onPlaceChanged = () => {
    if (!autocomplete) return;

    const place = autocomplete.getPlace();

    if (!place.geometry?.location) return;

    // const lat = place.geometry.location.lat();
    // const lng = place.geometry.location.lng();

    console.log("places: ", place);

    setAddress((prev: any) => ({
      ...prev,
      country: "united_states",
      state: getAddressValue(place.address_components, googleAddressItems.administrative_area_level_1),
      city: getAddressValue(place.address_components, googleAddressItems.locality),
      zipCode: getAddressValue(place.address_components, googleAddressItems.postal_code),
      addressLine1: getAddressValue(place.address_components, googleAddressItems.administrative_area_level_2) || place.formatted_address,
      addressLine2: "", // Reset or keep previous?
      // latitude: lat,
      // longitude: lng,
    }));
  };

  function handleProductCategoryChange(value: any) {
    setCategoryName(value.label);
  }

  const handleBannerImage = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_SIZE) {
      toast.error("Image size is too large to upload.", {
        style: {
          color: "#dc2626",
          border: "1px solid #dc2626",
        },
      });
      e.target.value = "";
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = async () => {
      if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
        toast.error(
          `Image dimensions too large. Max allowed Width ${MAX_WIDTH}px and Height ${MAX_HEIGHT}px`,
          {
            style: {
              color: "#dc2626",
              border: "1px solid #dc2626",
            },
          },
        );
        e.target.value = "";
        URL.revokeObjectURL(objectUrl);
        return;
      }

      URL.revokeObjectURL(objectUrl);

      const imageData = {
        fileName: file.name,
        fileType: file.type,
        path: "productBanner",
      };

      const uploadRes = await getImageUrlMutation.mutateAsync({
        data: imageData,
      });

      if (uploadRes?.data?.uploadUrl) {
        await uploadImageMutation.mutateAsync({
          url: uploadRes.data.uploadUrl,
          file,
        });

        setMediaBanner(uploadRes.data.filePath);
      }
    };

    img.onerror = () => {
      toast.error("Invalid image file", {
        style: {
          color: "#dc2626",
          border: "1px solid #dc2626",
        },
      });
      e.target.value = "";
      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  };

  const mutation = useUpdateVendorService();

  const createMutation = useCreateVendorService();

  const submitHandler = (e: any) => {
    e.preventDefault();
    const serviceData = {
      title: serviceName,
      description: longDescription,
      maxBooking: maxBooking,
      deleveryRadius: deleveryRadius,
      type: categoryName,
      bannerImage: mediaBanner,
      additionalImages: additionalImagesUrl,
      videoUrl: videoUrl,
      pricingType: pricingType,
    };
    if (productId) {
      mutation.mutate(
        { productId, serviceData },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["vendor-services"],
            });
            navigate("/services");
          },
        },
      );
    } else {
      createMutation.mutate(
        { serviceData },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["vendor-services"],
            });
            navigate("/services");
          },
        },
      );
    }
  };

  const imageDeleteHandler = (id: number | any) => {
    deleteBannerImageMutation.mutate(id, {
      onSuccess: () => {
        setMediaBanner("");

        queryClient.invalidateQueries({
          queryKey: ["vendor-services-by-id"],
        });
      },
    });
  };

  return (
    <>
      {isPending && productId ? (
        <div className="flex justify-center items-center w-full">
          <LoaderCircle className="animate-spin w-6 h-6" />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-3   rounded-lg">
            <Card>
              <CardContent>
                <form onSubmit={(e) => submitHandler(e)}>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-1 flex flex-col gap-4 py-2  ">
                      <div className="w-full">
                        <Label htmlFor="service-name">Service Name</Label>
                        <Input
                          placeholder="Enter Service Name"
                          className="  mt-2"
                          name="service-name"
                          id="service-name"
                          type="text"
                          value={serviceName}
                          onChange={(e) => setServiceName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="w-full flex flex-col gap-1">
                        <Label htmlFor="product-type">Product Type</Label>
                        <DropdownSelector
                          values={dropdownValuesProductCategories}
                          selectedValue={categoryName}
                          onChange={handleProductCategoryChange}
                        />
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <Label htmlFor="return-policy" className="">
                          Return Policy
                        </Label>
                        {/* <div className="flex gap-3">
                      <Label className="text-[#8B8D97]" htmlFor="airplane-mode">
                        Add Discount
                      </Label>
                      <Switch id="airplane-mode" />
                    </div> */}
                      </div>
                      <Input
                        placeholder="Upload document"
                        type="file"
                        className=" -mt-2"
                      />

                      <div className=" grid grid-cols-2 gap-4  w-full">
                        <div>
                          <Label
                            htmlFor="delivery-radius"
                            className="flex items-center gap-2  "
                          >
                            Delivery Radius
                            <TooltipInfo content="Delivery radius in Km how far orders can be delivered." />
                          </Label>

                          <Input
                            id="delivery-radius"
                            value={deleveryRadius}
                            placeholder="Delevery Radius"
                            onChange={(e) =>
                              setDeleveryRadius(Number(e.target.value))
                            }
                            type="number"
                            className="mt-2"
                            required
                            min={1}
                            max={100}
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="max-booking"
                            className="flex items-center gap-2  "
                          >
                            Max Booking At a Time
                            <TooltipInfo content=" Max Booking defines how Max Quantity of product at a time." />
                          </Label>

                          <Input
                            id="max-booking"
                            value={maxBooking}
                            onChange={(e) =>
                              setMaxBooking(Number(e.target.value))
                            }
                            placeholder="Enter Maximum Quantity"
                            type="number"
                            className="mt-2"
                            required
                            min={1}
                            max={100}
                          />
                        </div>
                      </div>

                      {/* Location of the service */}

                      <p className="text-lg mt-6">Location of the service</p>
                      <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="col-span-1 flex flex-col items-start justify-center gap-2">
                            <Label htmlFor="address1">
                              Street Address Line 1
                            </Label>
                            {isLoaded && (
                              <Autocomplete className='w-full' onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                                <Input
                                  name="address1"
                                  id="address1"
                                  placeholder="Enter Street Address Line 1"
                                  type="text"
                                  // value={address.addressLine1} 
                                  defaultValue={address.addressLine1}
                                  onChange={(e) =>
                                    setAddress((prev) => ({
                                      ...prev,
                                      addressLine1: e.target.value,
                                    }))
                                  }
                                  required
                                />
                              </Autocomplete>
                            )}
                          </div>

                          <div className="col-span-1 flex flex-col items-start justify-center gap-2">
                            <Label htmlFor="address2">
                              Street Address Line 2
                            </Label>
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
                                selectedValue={address.countery}
                                onChange={({ value }: any) =>
                                  setAddress((prev) => ({
                                    ...prev,
                                    countery: value,
                                  }))
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
                                  setAddress((prev) => ({
                                    ...prev,
                                    state: value,
                                  }))
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

                      {/* Pricing of the service */}

                      <p className="text-lg mt-6">Pricing </p>
                      <div className="flex flex-col gap-4">
                        <div className="col-span-1 flex flex-col items-start justify-center w-full gap-2">
                          <Label htmlFor="country">
                            Pricing type{" "}
                            <TooltipInfo content="Price type set with service, once set during service creation, it cannot be changed later." />{" "}
                          </Label>
                          <div className=" w-full">
                            <DropdownSelector
                              values={dropdownValuesProductPriceType}
                              selectedValue={pricingType}
                              onChange={({ value }: any) =>
                                setPricingType(value)
                              }
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-5">
                          {pricingType === "TIRE" && (
                            <>
                              <div className="col-span-1 flex flex-col items-start justify-center gap-2">
                                <Label htmlFor="unitPrice">Lower bound</Label>
                                <Input
                                  name="unitPrice"
                                  id="unitPrice"
                                  placeholder="Enter unit pricing"
                                  type="number"
                                  value={unitPricing.lowerBound}
                                  onChange={(e) =>
                                    setUnitPricing((prev) => ({
                                      ...prev,
                                      lowerBound: e.target.value,
                                    }))
                                  }
                                  required
                                />
                              </div>
                              <div className="col-span-1 flex flex-col items-start justify-center gap-2">
                                <Label htmlFor="unitPrice">Upper bound</Label>
                                <Input
                                  name="unitPrice"
                                  id="unitPrice"
                                  placeholder="Enter unit pricing"
                                  type="number"
                                  value={unitPricing.upperBound}
                                  onChange={(e) =>
                                    setUnitPricing((prev) => ({
                                      ...prev,
                                      upperBound: e.target.value,
                                    }))
                                  }
                                  required
                                />
                              </div>
                            </>
                          )}
                          <div className="col-span-1 flex flex-col items-start justify-center gap-2">
                            <Label htmlFor="unitPrice">Unit price</Label>
                            <InputGroup>
                              <InputGroupAddon>
                                <DollarSign />
                                <InputGroupInput
                                  name="unitPrice"
                                  id="unitPrice"
                                  placeholder="Enter unit pricing"
                                  type="number"
                                  value={unitPricing.price}
                                  onChange={(e) =>
                                    setUnitPricing((prev) => ({
                                      ...prev,
                                      price: e.target.value,
                                    }))
                                  }
                                  required
                                />
                              </InputGroupAddon>
                            </InputGroup>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 py-2 grid h-full ">
                      <div className="w-full items-start  gap-2 flex flex-col">
                        <Label className="text-[#8B8D97] ">
                          Product Long Description
                        </Label>
                        <div className="w-full h-96">
                          <MarkdownEditor
                            longDescription={longDescription}
                            setLongDescription={setLongDescription}
                          />
                        </div>
                      </div>
                      <div className="w-full h-full flex mt-auto items-end justify-end gap-3">
                        <Button
                          type="button"
                          onClick={() => navigate("/services")}
                          variant={"outline"}
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          disabled={
                            mutation.isPending || createMutation.isPending
                          }
                        >
                          {mutation.isPending || createMutation.isPending
                            ? "Submitting"
                            : "Save"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          <Card className=" px-4  gap-2 rounded-lg">
            <span className="text-[#5E6366]">Service banner image</span>
            <Card className="w-full flex items-center justify-center  rounded-lg bg-[#F4F5FA]">
              <div className="w-full group  gap-1  flex flex-col items-center">
                {productId && mediaBanner != "" ? (
                  <div className="relative w-fit mx-auto group">
                    {/* Buttons */}
                    <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition">
                      <ImageViewerDialog mediaUrl={mediaBanner} />

                      <Button
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => imageDeleteHandler(productId)}
                      >
                        <TiIconTrash size="12" color="#D30000" />
                      </Button>
                    </div>

                    {/* Image */}
                    <div className="w-24 h-24 rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={`${import.meta.env.VITE_IMAGE_BASE_URL
                          }/${mediaBanner}`}
                        alt="uploaded-image"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className={`${mediaBanner != ""
                      ? "w-24 h-24 rounded-full overflow-hidden"
                      : "w-10 h-12 flex items-center justify-center p-1"
                      }`}
                  >
                    <img
                      className="object-cover"
                      src={
                        mediaBanner != ""
                          ? `${import.meta.env.VITE_IMAGE_BASE_URL
                          }/${mediaBanner}`
                          : uploadImage
                      }
                      alt="Banner"
                    />
                  </div>
                )}
                <input
                  className="w-30 bg-[#E1E2E9] rounded-md p-1 text-[9px] cursor-pointer"
                  placeholder="Upload Image"
                  type="file"
                  onChange={(e) => handleBannerImage(e)}
                />
                <div>
                  <p className="text-[10px] text-center">
                    Upload a cover image for your product.
                  </p>
                </div>
              </div>
            </Card>
            <ServiceAdditionalPhotos
              mediaImages={mediaImages}
              setVideoUrl={setVideoUrl}
              setMediaImages={setMediaImages}
              setAdditionalImagesUrl={setAdditionalImagesUrl}
            />
          </Card>
        </div>
      )}
    </>
  );
};

export default withAuthorization("manage-services")(ManageService);
