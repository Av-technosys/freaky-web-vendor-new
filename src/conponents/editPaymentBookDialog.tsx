
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
import { Button, Input, Label } from "@/components/ui";
import { useUpdatePriceBook } from "@/services/useUpdatePriceBook";
import Spin from "@/components/spin";

const EditPaymentBookDialog = ({ isOpen, setOpen, priceBook }: any) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      <AlertDialogContent className="sm:max-w-[600px]">
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
  const [servicesData, setServicesData] = useState<any[]>([]);

  const updatePriceBookMutation = useUpdatePriceBook();

  useEffect(() => {
    setServicesData(data?.data || []);
  }, [data]);

  if (isPending) return <Spin />;

  // 🔥 GROUP BY productId
  const groupedServices = Object.values(
    servicesData.reduce((acc: any, item: any) => {
      if (!acc[item.productId]) acc[item.productId] = [];
      acc[item.productId].push(item);
      return acc;
    }, {})
  );

  function updateRow(updatedRow: any) {
    setServicesData((prev) =>
      prev.map((item) =>
        item.id === updatedRow.id ? { ...updatedRow, isEdited: true } : item
      )
    );
  }

  function handleDiscountChange(value: any, service: any) {
    const discount = Number(value);
    const updated = {
      ...service,
      discountPercentage: discount,
      salePrice:
        service.listPrice - (service.listPrice * discount) / 100,
    };
    updateRow(updated);
  }

  function handleSalePriceChange(value: any, service: any) {
    const sale = Number(value);
    const updated = {
      ...service,
      salePrice: sale,
      discountPercentage: Number(
        ((service.listPrice - sale) / service.listPrice) * 100
      ),
    };
    updateRow(updated);
  }

  function handleLowerSlabChange(value: any, service: any) {
    updateRow({ ...service, lowerSlab: Number(value) });
  }

  function handleUpperSlabChange(value: any, service: any) {
    updateRow({ ...service, upperSlab: Number(value) });
  }

  function handleSaveClick() {
    const isEditedData = servicesData.filter((s) => s.isEdited);
    updatePriceBookMutation.mutate(isEditedData);
  }

  function handleCancelClick() {
    setOpen(false);
  }

  return (
    <>
      <div className="flex flex-col gap-6 mt-4 max-h-[500px] overflow-y-auto pr-2">
        {groupedServices.map((group: any, index: number) => {
          const isTier =
            group.length > 1 || group[0].upperSlab !== null;

          return (
            <div key={index}>
              <Label className="text-lg font-semibold">
                {group[0].title}
              </Label>

              {isTier ? (
                <div className="space-y-3 mt-2">
                  {group.map((service: any) => (
                    <div
                      key={service.id}
                      className="grid grid-cols-2 gap-4 border p-3 rounded-lg"
                    >
                      <div>
                        <Label>Lower Slab</Label>
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

                      <div>
                        <Label>List Price</Label>
                        <Input readOnly value={service.listPrice} />
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
                  ))}
                </div>
              ) : (
                <div className="grid gap-3 grid-cols-3 mt-2">
                  <div>
                    <Label>List Price</Label>
                    <Input readOnly value={group[0].listPrice} />
                  </div>

                  <div>
                    <Label>Discount %</Label>
                    <Input
                      value={group[0].discountPercentage}
                      onChange={(e) =>
                        handleDiscountChange(e.target.value, group[0])
                      }
                    />
                  </div>

                  <div>
                    <Label>Sale Price</Label>
                    <Input
                      value={group[0].salePrice}
                      onChange={(e) =>
                        handleSalePriceChange(e.target.value, group[0])
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
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
