import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Input,
  Label,
  Textarea,
} from "../../components/ui";
import DropdownSelector from "../dropdownSelector";
import { Switch } from "../../components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../components/ui/calender";
import uploadImage from "../../assets/uploadImage.png";
import { useNavigate, useParams } from "react-router-dom";
import EditPricebookDialog from "../editPricebookDialog";
import DeletePriceListDialog from "../deletePricelistDialog";
import { useGetVendorServiceByServiceId } from "../../services/useGetVendorServices";
import { useGetImageUrl, useUploadImage } from "../../services/useUploadImage";
import { useUpdateVendorService } from "../../services/useCreateOrUpdateVendorService";
import { useQueryClient } from "@tanstack/react-query";
import ServiceAdditionalPhotos from "../serviceAdditionalPhotos";
import ImageViewerDialog from "../imageViewerDialog";

const dropdownValuesProductCategories = {
  options: [
    {
      label: "product",
      value: "product",
    },
    {
      label: "addon",
      value: "addon",
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

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

const ManageService = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [month, setMonth] = useState<Date | undefined>(date);
  const [value, setValue] = useState(formatDate(date));
  const [time, setTime] = useState("12:00");

  const [serviceName, setServiceName] = useState("");
  const [categoryName, setCategoryName] = useState("product");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");

  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { productId } = useParams();

  const { data } = useGetVendorServiceByServiceId(productId);

  const [mediaImages, setMediaImages] = useState<any>([]);
  const [mediaBanner, setMediaBanner] = useState<any>("");
  const [additionalImagesUrl, setAdditionalImagesUrl] = useState<any>([]);
  const [videoUrl, setVideoUrl] = useState("");

  const getImageUrlMutation = useGetImageUrl();
  const uploadImageMutation = useUploadImage();

  useEffect(() => {
    if (data?.product && productId) {
      setMediaImages(data.product.media);
      setServiceName(data.product.title || "");
      setCategoryName(data.product.type || "Select Product Category");
      setDescription(data.product.description || "");
      setLongDescription(data.product.description || "");
      setMediaBanner(data.product.bannerImage);
    }
  }, [data, productId]);

  function handleProductCategoryChange(value: any) {
    setCategoryName(value.label);
  }

  const handleBannerImage = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

  const mutation = useUpdateVendorService();

  const submitHandler = () => {
    const serviceData = {
      title: serviceName,
      description: description,
      type: categoryName,
      bannerImage: mediaBanner,
      additionalImages: additionalImagesUrl,
      videoUrl: videoUrl,
    };
    mutation.mutate(
      { productId, serviceData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["vendor-services-by-id"],
          });
        },
      }
    );
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-3   rounded-lg">
          <Card>
            <CardContent>
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-1 flex flex-col gap-4 py-2  ">
                  <Input
                    placeholder="Enter Service Name"
                    className="bg-[#F4F5FA]"
                    name="service-name"
                    id="service-name"
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    required
                  />
                  <DropdownSelector
                    values={dropdownValuesProductCategories}
                    selectedValue={categoryName}
                    onChange={handleProductCategoryChange}
                  />
                  <div className="w-full flex items-center justify-between">
                    <span className="text-[#8B8D97]">Return Policy</span>
                    {/* <div className="flex gap-3">
                      <Label className="text-[#8B8D97]" htmlFor="airplane-mode">
                        Add Discount
                      </Label>
                      <Switch id="airplane-mode" />
                    </div> */}
                  </div>
                  <Input placeholder="Upload document" type="file" className=" -mt-2" />
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
                  <Textarea
                    placeholder="Short Description"
                    className="min-h-[150px] bg-[#F4F5FA]"
                    id="message-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className="w-full items-start gap-2 mt-3 flex flex-col">
                    <Label className="text-[#5E6366]" htmlFor="password">
                      Product Long Description
                    </Label>
                    <div className="w-full">
                      <Textarea
                        placeholder="Short Description"
                        className="min-h-[150px] bg-[#F4F5FA]"
                        id="message-2"
                        value={longDescription}
                        onChange={(e) => setLongDescription(e.target.value)}
                      />
                      <span className="text-[11px] text-[#5E6366]">
                        Add a long description for your product
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex mt-4 items-center justify-end gap-3">
                    <Button
                      onClick={() => navigate("/services")}
                      variant={"outline"}
                    >
                      Back
                    </Button>
                    <Button onClick={submitHandler}>Save</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-1 px-2  rounded-lg">
          <Card className="w-full  h-40 flex items-center justify-center  rounded-lg bg-[#F4F5FA]">
            <div className="w-full group relative gap-1 flex flex-col items-center">
              {productId ? (
                <>
                <ImageViewerDialog mediaUrl={mediaBanner} />
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img
                    className="object-cover"
                    src={`${
                      import.meta.env.VITE_IMAGE_BASE_URL
                    }/${mediaBanner}`}
                    alt="uploaded-image"
                  />
                </div>
                </>
              ) : (
                <div className="w-10 h-10 flex items-center justify-center p-1 rounded-lg overflow-hidden">
                  <img
                    className="object-cover"
                    src={uploadImage}
                    alt="uploadImage"
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
                <p className="text-[12px]">
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
    </>
  );
};

export default ManageService;
