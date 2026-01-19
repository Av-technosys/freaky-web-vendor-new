import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Input,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui";
import DropdownSelector from "../dropdownSelector";
// import { Switch } from "../../components/ui/switch";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "../../components/ui/popover";
// import { CalendarIcon } from "lucide-react";
// import { Calendar } from "../../components/ui/calender";
import uploadImage from "../../assets/uploadImage.png";
import { useNavigate, useParams } from "react-router-dom";
import EditPricebookDialog from "../editPricebookDialog";
import DeletePriceListDialog from "../deletePricelistDialog";
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
import { Info, LoaderCircle } from "lucide-react";
import { TiIconTrash } from "../icons";

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

const dropdownValuesPricingTypes = {
  options: [
    {
      label: "FLAT",
      value: "FLAT",
    },
    {
      label: "PERCENTAGE",
      value: "PERCENTAGE",
    },
    {
      label: "TIRE",
      value: "TIRE",
    },
    {
      label: "MODULAR",
      value: "MODULAR",
    },
  ],
};

const serviceList = [
  {
    name: "Service",
    price: "$199",
  },
  {
    name: "Service",
    price: "$199",
  },
  {
    name: "Service",
    price: "$199",
  },
];

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
  const [pricingType, setPricingType] = useState("FLAT");
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

  function handleProductCategoryChange(value: any) {
    setCategoryName(value.label);
  }

  function handlePricingTypeChange(value: any) {
    setPricingType(value.label);
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
          }
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
        }
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
        }
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
      {isPending ? (
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
                        <span className="text-[#8B8D97]">Service Name</span>
                        <Input
                          placeholder="Enter Service Name"
                          className="bg-[#F4F5FA] mt-2"
                          name="service-name"
                          id="service-name"
                          type="text"
                          value={serviceName}
                          onChange={(e) => setServiceName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-[#8B8D97] ">Product Type</span>
                        <DropdownSelector
                          values={dropdownValuesProductCategories}
                          selectedValue={categoryName}
                          onChange={handleProductCategoryChange}
                        />
                      </div>
                      {!productId && (
                        <div className="w-full flex flex-col gap-1">
                          <span className="text-[#8B8D97] ">Pricing Type</span>
                          <DropdownSelector
                            values={dropdownValuesPricingTypes}
                            selectedValue={pricingType}
                            onChange={handlePricingTypeChange}
                          />
                        </div>
                      )}
                      <div className="w-full flex items-center justify-between">
                        <span className="text-[#8B8D97]">Return Policy</span>
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

                      <span className="flex items-center gap-2 text-[#8B8D97]">
                        Delivery Radius
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-pointer">
                              <Info className="w-4 h-4 text-[#8B8D97] hover:text-black" />
                            </span>
                          </TooltipTrigger>

                          <TooltipContent className="p-2 bg-[#F4F5FA] text-black [&>span]:hidden mb-1">
                            <p>
                              Delivery radius defines how far orders can be
                              delivered.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </span>

                      <Input
                        value={deleveryRadius}
                        placeholder="Delevery Radius"
                        onChange={(e) =>
                          setDeleveryRadius(Number(e.target.value))
                        }
                        type="number"
                        className=" -mt-2"
                        required
                        min={1}
                        max={100}
                      />
                      {/* <div className="w-full flex gap-3">
                    <div className="relative flex gap-2">
                      <Input
                        id="date"
                        value={value}
                        placeholder="June 01, 2025"
                        className="bg-background pr-10 bg-[#F4F5FA]"
                        onChange={(e) => {
                          const date = new Date(e.target.value);
                          setValue(e.target.value);
                          if (isValidDate(date)) {
                            setDate(date);
                            setMonth(date);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setOpen(true);
                          }
                        }}
                      />
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            id="date-picker"
                            variant="ghost"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                          >
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Select date</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="end"
                          alignOffset={-8}
                          sideOffset={10}
                        >
                          <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(date) => {
                              setDate(date);
                              setValue(formatDate(date));
                              setOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Input
                        defaultValue={time}
                        className="text-[#8B8D97] bg-[#F4F5FA]"
                        onChange={(e) => setTime(e.target.value)}
                        name="time"
                        id="time"
                        type="time"
                        required
                      />
                    </div>
                  </div> */}

                      <div className="w-full text-[#8B8D97] flex flex-col items-start gap-2">
                        <span>Price Book List</span>
                        <div className="w-full flex flex-col items-start gap-2">
                          {serviceList.map((service, index) => {
                            return (
                              <div className="w-full flex items-center justify-between border border-gray-300 bg-[#F4F5FA] p-1 rounded-md">
                                <div>{index + 1}</div>
                                <div>{service.name}</div>
                                <div>{service.price}</div>
                                <div className="flex gap-1">
                                  <EditPricebookDialog />
                                  <DeletePriceListDialog />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 py-2   ">
                      <span className="flex items-center gap-2 text-[#8B8D97]">
                        Max Booking At a Time
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-pointer">
                              <Info className="w-4 h-4 text-[#8B8D97] hover:text-black" />
                            </span>
                          </TooltipTrigger>

                          <TooltipContent className="p-2 bg-[#F4F5FA] text-black [&>span]:hidden mb-1">
                            <p>
                              Max Booking defines how Max Quantity of product at
                              a time.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </span>

                      <Input
                        value={maxBooking}
                        onChange={(e) => setMaxBooking(Number(e.target.value))}
                        placeholder="Enter Maximum Quantity"
                        type="number"
                        className="mt-2"
                        required
                        min={1}
                        max={100}
                      />

                      <div className="w-full items-start gap-2 mt-3 flex flex-col">
                        <span className="text-[#8B8D97] ">
                          {" "}
                          Product Long Description
                        </span>
                        <div className="w-full">
                          {/* <Textarea
                        placeholder="Short Description"
                        className="min-h-[150px] bg-[#F4F5FA]"
                        id="message-2"
                        value={longDescription}
                        onChange={(e) => setLongDescription(e.target.value)}
                      /> */}
                          <MarkdownEditor
                            longDescription={longDescription}
                            setLongDescription={setLongDescription}
                          />
                          <span className="text-[11px] text-[#5E6366]">
                            Add a long description for your product
                          </span>
                        </div>
                      </div>
                      <div className="w-full flex mt-4 items-center justify-end gap-3">
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
          <Card className="col-span-1 px-4  rounded-lg">
            <Card className="w-full  h-40  flex items-center justify-center  rounded-lg bg-[#F4F5FA]">
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
                        src={`${
                          import.meta.env.VITE_IMAGE_BASE_URL
                        }/${mediaBanner}`}
                        alt="uploaded-image"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className={`${
                      mediaBanner != ""
                        ? "w-24 h-24 rounded-full overflow-hidden"
                        : "w-10 h-12 flex items-center justify-center p-1"
                    }`}
                  >
                    <img
                      className="object-cover"
                      src={
                        mediaBanner != ""
                          ? `${
                              import.meta.env.VITE_IMAGE_BASE_URL
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

export default ManageService;
