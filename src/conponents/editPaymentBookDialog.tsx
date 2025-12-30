import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { useServicesByPriceBookId } from "@/services/useGetAllPricebooks";
import Spin from "@/components/spin";
import { Button, Input, Label } from "@/components/ui";
import { useUpdatePriceBook } from "@/services/useUpdatePriceBook";

const EditPaymentBookDialog = ({ isOpen, setOpen, priceBook }: any) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      <AlertDialogContent className=" sm:max-w-[600px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{`Edit ${priceBook?.name}`}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertContent setOpen={setOpen} id={priceBook?.id} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditPaymentBookDialog;

function AlertContent({ id, setOpen }: any) {
  const { data, isPending } = useServicesByPriceBookId(id);
  const [servicesData, setServicesData] = useState<any>([]);

  const updatePriceBookMutation = useUpdatePriceBook();

  useEffect(() => {
    setServicesData(data?.data);
  }, [data]);

  if (isPending) return <Spin />;

  function handleDiscountChange(value: any, serviceData: any) {
    serviceData.salePrice =
      serviceData.listPrice - (serviceData.listPrice * value) / 100;
    serviceData.discountPercentage = value;
    setServicesData((prev: any) =>
      prev.map((item: any) =>
        item.productId === serviceData.productId
          ? { ...serviceData, isEdited: true }
          : item
      )
    );
  }

  function handleSalePriceChange(value: any, serviceData: any) {
    serviceData.salePrice = value;
    serviceData.discountPercentage = Number(
      ((serviceData.listPrice - value) / serviceData.listPrice) * 100
    );
    setServicesData((prev: any) =>
      prev.map((item: any) =>
        item.productId === serviceData.productId
          ? { ...serviceData, isEdited: true }
          : item
      )
    );
  }
  function handleLowerSlabChange(value: any, serviceData: any) {
    serviceData.lowerSlab = value;
    setServicesData((prev: any) =>
      prev.map((item: any) =>
        item.productId === serviceData.productId
          ? { ...serviceData, isEdited: true }
          : item
      )
    );
  }

  function handleUpperSlabChange(value: any, serviceData: any) {
    serviceData.upperSlab = value;
    setServicesData((prev: any) =>
      prev.map((item: any) =>
        item.productId === serviceData.productId
          ? { ...serviceData, isEdited: true }
          : item
      )
    );
  }

  function handleSaveClick() {
    const isEditedData = servicesData.filter((service: any) => {
      if (service.isEdited) {
        return service;
      }
    });
    updatePriceBookMutation.mutate(isEditedData);
  }

  function handleCancelClick() {
    setOpen(false);
  }

  return (
    <>
      <div className="flex flex-col gap-6 mt-4">
        {servicesData?.map((service: any) => (
          <div key={service.productId}>
            <Label className="text-lg font-semibold">
              {service.productName}
            </Label>
            <div className=" space-y-2 mt-1">
              {service.pricingType === "tier" && (
                <div className=" w-full grid grid-cols-2 gap-4">
                  <div>
                    <Label className=" mb-1">Lower Slab</Label>
                    <Input
                      value={service.lowerSlab}
                      onChange={(e) =>
                        handleLowerSlabChange(e.target.value, service)
                      }
                    />
                  </div>
                  <div>
                    <Label>Upper Slab</Label>
                    <Input
                      value={service.upperSlab}
                      onChange={(e) =>
                        handleUpperSlabChange(e.target.value, service)
                      }
                    />
                  </div>
                </div>
              )}
              <div className=" grid gap-3 grid-cols-3">
                <div>
                  <Label>List Price</Label>
                  <Input
                    className=" opacity-50"
                    readOnly
                    value={service.listPrice}
                  />
                </div>
                <div>
                  <Label>Discount %</Label>
                  <Input
                    value={service.discountPercentage}
                    onChange={(e) =>
                      handleDiscountChange(e.target.value, service)
                    }
                  />
                </div>
                <div>
                  <Label>Sale Price</Label>
                  <Input
                    value={service.salePrice}
                    onChange={(e) =>
                      handleSalePriceChange(e.target.value, service)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleCancelClick}>
          Cancel
        </AlertDialogCancel>
        <Button
          disabled={updatePriceBookMutation.isPending}
          onClick={handleSaveClick}
        >
          {updatePriceBookMutation.isPending ? "Updating..." : "Save"}
        </Button>
      </AlertDialogFooter>
    </>
  );
}
