import { useEffect, useState } from "react";
import DropdownSelector from "../dropdownSelector";

import uploadImage from "../../assets/uploadImage.png";
import { useNavigate, useParams } from "react-router-dom";
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { VITE_GOOGLE_MAPS_API_KEY } from '@/const/env';
import { getAddressValue, googleAddressItems } from "@/utils/addressUtils";


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
import { DollarSign, LoaderCircle, X } from "lucide-react";
import { TiIconTrash } from "../icons";
import { TooltipInfo } from "@/components/TooltipInfo";
import { COUNTRY_LABEL_VALUE, PRODUCT_CATEGORIES_LABEL_VALUE, PRODUCT_PRICE_TYPE_LABEL_VALUE, STATE_LABEL_VALUE } from "@/const/locatoins";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import withAuthorization from "@/lib/withAuthorization";
import { useCreateVendorService, useDeleteBannerImage, useGetImageUrl, useGetVendorServiceByServiceId, useUpdateVendorService, useUploadImage } from "@/services";
import { Button, Card, CardContent, Input, Label } from "@/components/ui";
import { SelectProductType } from "@/components/product/SelectProductType";
import { ProductPriceTypeRadio } from "@/components/product/PriceTypeSelect";
import type { FormData, PriceTypeTier, PricingType } from "@/types/serviceTypes";
import { cn } from "@/lib/utils";



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



  const [productPricing, setProductPricing] = useState<PriceTypeTier[]>([]);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    type: "PRODUCT",
    country: COUNTRY_LABEL_VALUE.options[0].value,
    state: STATE_LABEL_VALUE.options[0].value,
    city: "",
    postalCode: "",
    streetAddressLine1: "",
    streetAddressLine2: "",
    latitude: "",
    longitude: "",
    pricingType: "FLAT",
    price: 1,
    deliveryRadius: 30,
    productTypeId: "",
    description: "",
    maxBookingAtTime: 10,
    maxQuantity: 100,
    minQuantity: 1,
    isAvailable: true,
    returnPolicyURL: "",
    bannerImage: "",

  });

  const [productData, setProductData] = useState<FormData>({
    title: "",
    type: "PRODUCT",
    country: COUNTRY_LABEL_VALUE.options[0].value,
    state: STATE_LABEL_VALUE.options[0].value,
    city: "",
    postalCode: "",
    streetAddressLine1: "",
    streetAddressLine2: "",
    latitude: "",
    longitude: "",
    pricingType: "FLAT",
    price: 1,
    deliveryRadius: 30,
    productTypeId: "",
    description: "",
    maxBookingAtTime: 10,
    maxQuantity: 100,
    minQuantity: 1,
    isAvailable: true,
    returnPolicyURL: "",
    bannerImage: "",
  });


  function mapProductToForm(product: any): FormData {
  const price =
    product.price ??
    product.prices?.[0]?.salePrice ??
    product.prices?.[0]?.listPrice ??
    0;

  return {
    title: product.title,
    type: product.type,
    country: product.country,
    state: product.state,
    city: product.city,
    postalCode: product.postalCode,
    streetAddressLine1: product.streetAddressLine1,
    streetAddressLine2: product.streetAddressLine2,
    latitude: product.latitude,
    longitude: product.longitude,
    pricingType: product.pricingType,
    price: Number(price),
    deliveryRadius: product.deliveryRadius,
    productTypeId: product.productTypeId,
    description: product.description,
    maxBookingAtTime: product.maxBookingAtTime,
    maxQuantity: product.maxQuantity,
    minQuantity: product.minQuantity,
    isAvailable: product.isAvailable,
    returnPolicyURL: product.returnPolicyURL,
    bannerImage: product.bannerImage,
  };
}

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
      setFormData(mapProductToForm(data.product));
      setProductData(mapProductToForm(data.product));
      // setProductPricing(data.product.pricing || []);
      setProductPricing(
  data.product.priceSlabs?.map((item: any) => ({
    lowerBound: Number(item.lowerSlab),
    upperBound: Number(item.upperSlab),
    price: Number(item.salePrice ?? item.listPrice),
  })) || []
);
      // setMediaBanner(data.product.bannerImage || "");
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

    console.log(place)


    setFormData((prev: any) => ({
      ...prev,
      country: "india",
      state: getAddressValue(place.address_components, googleAddressItems.administrative_area_level_1),
      city: getAddressValue(place.address_components, googleAddressItems.locality),
      postalCode: getAddressValue(place.address_components, googleAddressItems.postal_code),
      streetAddressLine1: place.formatted_address,
      streetAddressLine2: getAddressValue(place.address_components, googleAddressItems.subpremise),
      latitude: place?.geometry?.location?.lat || "",
      longitude: place?.geometry?.location?.lng || "",
    }));
  };

  // function handleProductCategoryChange(value: any) {
  //   setCategoryName(value.label);
  // }

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
      title: formData.title,
      description: formData.description,
      deleveryRadius: formData.deliveryRadius,
      type: formData.type,
      bannerImage: mediaBanner,
      additionalImages: additionalImagesUrl,
      videoUrl: videoUrl,
      pricingType: formData.pricingType,
      streetAddressLine1: formData.streetAddressLine1,
      streetAddressLine2: formData.streetAddressLine2,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.country,
      latitude: formData.latitude,
      longitude: formData.longitude,
      productTypeId: formData.productTypeId,
      price: formData.price,
      productPricing: productPricing,
      maxBookingAtTime: formData.maxBookingAtTime,
      maxQuantity: formData.maxQuantity,
      minQuantity: formData.minQuantity,
      isAvailable: formData.isAvailable,
      returnPolicyURL: formData.returnPolicyURL,

    };

    if (formData.pricingType === "TIER" && !productPricing.length) {
    toast.error("Add at least one tier");
    return;
}
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
  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleDescriptionChange(value: any) {
  setFormData((prev) => ({
    ...prev,
    description: value,
  }));
}


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
                  {/* <form> */}
                  <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-1 flex flex-col gap-4 py-2  ">
                      <div className="w-full">
                        <Label htmlFor="service-name">Service Name</Label>
                        <Input
                          placeholder="Enter Service Name"
                          className="  mt-2"
                          name="title"
                          id="title"
                          type="text"
                          value={formData.title}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <div className="w-full flex flex-col gap-1">
                        <Label htmlFor="product-type">Product Type</Label>
                        <SelectProductType
                          categoryName={formData.productTypeId}
                          handleProductCategoryChange={(value: any) => {
                            setFormData((prev) => ({
                              ...prev,
                              productTypeId: value.value,
                            }));
                          }}
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
                            htmlFor="max-booking"
                            className="flex items-center gap-2  "
                          >
                            Min Booking At a Time
                            <TooltipInfo content=" Min Booking defines how Min Quantity for the product in (km)" />
                          </Label>

                          <Input
                            id="max-booking"
                            name="maxBookingAtTime"
                            value={formData.maxBookingAtTime}
                            onChange={handleFormChange}
                            placeholder="Enter Maximum Quantity"
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
                            <TooltipInfo content=" Max Booking defines how Max Quantity for the product in (km)" />
                          </Label>

                          <Input
                            id="max-booking"
                            name="maxBookingAtTime"
                            value={formData.maxBookingAtTime}
                            onChange={handleFormChange}
                            placeholder="Enter Maximum Quantity"
                            type="number"
                            className="mt-2"
                            required
                            min={1}
                            max={100}
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor="delivery-radius"
                            className="flex items-center gap-2  "
                          >
                            Delivery Radius
                            <TooltipInfo content="Delivery radius in Km how far orders can be delivered in (km)." />
                          </Label>

                          <Input
                            id="delivery-radius"
                            name="deliveryRadius"
                            value={formData.deliveryRadius}
                            placeholder="Delevery Radius"
                            onChange={handleFormChange}
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
                                  value={formData.streetAddressLine1}
                                  defaultValue={formData.streetAddressLine1}
                                  onChange={handleFormChange}
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
                              value={formData.streetAddressLine2}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  streetAddressLine2: e.target.value,
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
                                values={COUNTRY_LABEL_VALUE}
                                selectedValue={formData.country}
                                onChange={({ value }: any) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    country: value,
                                  }))
                                }
                              />
                            </div>
                          </div>

                          <div className="col-span-1 flex flex-col items-start w-full justify-center gap-2">
                            <Label htmlFor="state">State</Label>
                            <div className="w-full">
                              <DropdownSelector
                                values={STATE_LABEL_VALUE}
                                selectedValue={formData.state}
                                onChange={({ value }: any) =>
                                  setFormData((prev) => ({
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
                              value={formData.city}
                              onChange={(e) =>
                                setFormData((prev) => ({
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
                              value={formData.postalCode}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  postalCode: e.target.value,
                                }))
                              }
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Pricing of the service */}

                      <p className="text-lg mt-6">Pricing </p>
                      
                      <ServicePricingSection className={`${!productId ? "" : ""}`} productId={productId} formData={formData} setFormData={setFormData} productPricing={productPricing} setProductPricing={setProductPricing} />
                    </div>
                    <div className="col-span-1 py-2 grid h-full ">
                      <div className="w-full items-start  gap-2 flex flex-col">
                        <Label className="text-[#8B8D97] ">
                          Product Long Description
                        </Label>
                        <div className="w-full h-96">
                          <MarkdownEditor
                            longDescription={formData.description}
                           setLongDescription={handleDescriptionChange}
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
                      // onClick={() => imageDeleteHandler(productId)}
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


function ServicePricingSection({
  className,
  formData,
  setFormData,
  productPricing,
  setProductPricing,
  productId,
}: {
  className?: string,
  productId?: string;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  productPricing: PriceTypeTier[];
  setProductPricing: React.Dispatch<React.SetStateAction<PriceTypeTier[]>>;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="col-span-1 flex flex-col items-start justify-center w-full gap-2">
        <Label htmlFor="country">
          Pricing type{" "}
          <TooltipInfo content="Price type set with service, once set during service creation, it cannot be changed later." />{" "}
        </Label>
        
        <ProductPriceTypeRadio
  selectedValue={formData.pricingType}
    disabled={!!productId}
  onChange={(value) => {
    const type = value.toUpperCase() as PricingType;
    

setFormData((prev: FormData) => ({
  ...prev,
  pricingType: type,
  price: type === "TIER" ? 0 : prev.price,
}));
    if (type === "TIER") {
      setProductPricing([
        { lowerBound: 1, upperBound: 10, price: 0 },
      ]);
    }

    if (type === "FLAT") {
      setProductPricing([]);
    }
  }}
/>
        <div className=" w-full">
        </div>
      </div>
      <div className="w-full">
        {formData.pricingType === 'TIER' ? <div className=" w-full flex flex-col gap-4">
          <div>
            <Button type="button" onClick={() => setProductPricing((prev) => [...prev, { lowerBound: 0, upperBound: 0, price: 0 }])}>Add tier</Button>
          </div>
          {
            (
              (productPricing as PriceTypeTier[])?.map((priceItem: PriceTypeTier, idx: number) => {
                return (
                  <div className=" w-full grid grid-cols-7 items-end gap-4">
                    <div className=" col-span-2 flex flex-col items-start justify-center gap-2">
                      <Label htmlFor="unitPrice">Lower bound</Label>
                      <Input
                        name="unitPrice"
                        id="unitPrice"
                        placeholder="Enter unit pricing"
                        type="number"
                        value={priceItem.lowerBound}
                        onChange={(e) =>
                          setProductPricing((prev) => {
                            return prev.map((item, index) => {
                              if (index === idx) {
                                return {
                                  ...item,
                                 lowerBound: Number(e.target.value),
                                }
                              }
                              return item
                            }) as PriceTypeTier[]
                          })
                        }
                        required
                      />
                    </div>
                    <div className=" col-span-2 flex flex-col items-start justify-center gap-2">
                      <Label htmlFor="unitPrice">Upper bound</Label>
                      <Input
                        name="unitPrice"
                        id="unitPrice"
                        placeholder="Enter unit pricing"
                        type="number"
                        value={priceItem.upperBound}
                        onChange={(e) =>
                          setProductPricing((prev) => {
                            return prev.map((item, index) => {
                              if (index === idx) {
                                return {
                                  ...item,
                                  upperBound: Number(e.target.value),
                                }
                              }
                              return item
                            }) as PriceTypeTier[]
                          })
                        }
                        required
                      />
                    </div>
                    <div className=" col-span-2 flex flex-col items-start justify-center gap-2">
                      <Label htmlFor="unitPrice">Price</Label>
                      <Input
                        name="unitPrice"
                        id="unitPrice"
                        placeholder="Enter unit pricing"
                        type="number"
                        value={priceItem.price}
                        onChange={(e) =>
                          setProductPricing((prev) => {
                            return prev.map((item, index) => {
                              if (index === idx) {
                                return {
                                  ...item,
                                  price: Number(e.target.value),
                                }
                              }
                              return item
                            }) as PriceTypeTier[]
                          })
                        }
                        required
                      />
                    </div>
                    <div className=" col-span-1 flex flex-col items-start justify-center gap-2">
                      {/* <Label htmlFor="unitPrice">Price</Label> */}
                      <Button type="button" onClick={() => {
                        setProductPricing((prev) => {
                          return prev.filter((_, index) => idx !== index)
                        })
                      }} variant={"ghost"} className="mb-1" size={"sm"} ><X className=" text-red-500 " /></Button>
                    </div>

                  </div>
                )
              })

            )
          }
        </div> :
          <div className="col-span-1 flex flex-col items-start justify-center gap-2">
            <Label htmlFor="unitPrice">Price</Label>
            <InputGroup className=" w-fit">
              <InputGroupAddon>
                <DollarSign />
                <InputGroupInput
                  name="unitPrice"
                  id="unitPrice"
                  placeholder="Enter unit pricing"
                  type="number"
                  value={formData.price as number || 0}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      price: Number(e.target.value),
                    }))
                  }
                  required
                />
              </InputGroupAddon>
            </InputGroup>
          </div>
        }

      </div>
    </div>
  )
}