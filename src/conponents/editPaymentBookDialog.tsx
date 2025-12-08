import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Button, Input, Label } from "../components/ui";
import { TiIconPencilPlus } from "./icons";

interface PriceType {
  listPrice: number;
  discountPercentage: number;
  salePrice: number;
  lowerSlab: number | null;
  upperSlab: number | null;
}

interface ProductService {
  pricingType: "flat" | "tire";
  prices: PriceType[];
}

const EditPaymentBookDialog = ({ productsData }: any) => {
  const [services, setServices] = useState<ProductService[]>(
    productsData.map((service: any) => ({
      ...service,
      prices: service.prices.map((prev: any) => ({
        ...prev,
        listPrice: Number(prev.listPrice),
        discountPercentage: Number(prev.discountPercentage),
        salePrice: Number(prev.salePrice),
      })),
    }))
  );

  const handleDiscountChange = (
    serviceIndex: number,
    priceIndex: number,
    discount: number
  ) => {
    setServices((prev) => {
      const updated = [...prev];
      const priceObj = updated[serviceIndex].prices[priceIndex];

      priceObj.discountPercentage = discount;
      priceObj.salePrice =
        priceObj.listPrice - (priceObj.listPrice * discount) / 100;

      return [...updated];
    });
  };

  const handleFinalPriceChange = (
    serviceIndex: number,
    priceIndex: number,
    finalPrice: number
  ) => {
    setServices((prev) => {
      const updated = [...prev];
      const priceObj = updated[serviceIndex].prices[priceIndex];

      priceObj.salePrice = finalPrice;
      const diff = priceObj.listPrice - finalPrice;
      priceObj.discountPercentage = Number(
        ((diff / priceObj.listPrice) * 100).toFixed(2)
      );

      return [...updated];
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <TiIconPencilPlus color="#D30000" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Payment Book</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription>
          <div className="flex flex-col gap-6 mt-4">
            {services.map((service, sIndex) => (
              <div key={sIndex}>
                <Label className="text-lg font-semibold">
                  Service {sIndex + 1}
                </Label>

                {service.prices.map((price, pIndex) => (
                  <div key={pIndex} className="flex items-center gap-1 mt-2">
                    {service.pricingType == "tire" && (
                      <div className="w-full flex ">
                        <Input
                          value={price.upperSlab != null ? price.upperSlab : ""}
                          name="upperBond"
                          placeholder="UB"
                          readOnly
                        />
                        <Input
                          value={price.lowerSlab != null ? price.lowerSlab : ""}
                          name="lowerBond"
                          placeholder="LB"
                          readOnly
                        />
                      </div>
                    )}

                    <Input readOnly value={price.listPrice} />

                    <Input
                      type="number"
                      value={price.discountPercentage}
                      placeholder="Discount %"
                      onChange={(e) =>
                        handleDiscountChange(
                          sIndex,
                          pIndex,
                          Number(e.target.value)
                        )
                      }
                    />

                    <Input
                      type="number"
                      value={price.salePrice}
                      placeholder="Final Price"
                      onChange={(e) =>
                        handleFinalPriceChange(
                          sIndex,
                          pIndex,
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel>Back</AlertDialogCancel>
          <AlertDialogAction>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditPaymentBookDialog;
