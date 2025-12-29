import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Button, Input, InputOTPSeparator, Label } from "../components/ui";
import { TiIconX } from "./icons";
import { useState } from "react";

const EditProdcutPricebookPriceDialog = ({ pricebook, isEditOpen, setIsEditOpen }: any) => {
  const [tierPrice, setTierPrice] = useState(false);
  const [addMore, setAddMore] = useState<number[]>([0]);

  const addMoreHandler = () => {
    setAddMore((prev) => [...prev, prev.length]);
  };

  const removeAddmoreHandler = () => {
    setAddMore((prev) => prev.slice(0, -1));
  };

  return (
    <>
      <AlertDialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Edit ${pricebook?.name}`}</AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogDescription
            className={`${addMore.length > 1 && "h-52 overflow-y-auto"}`}
          >
            <>
              {!tierPrice ? (
                <div className="flex my-3 flex-col items-start gap-2">
                  <Label htmlFor="email">Price</Label>
                  <Input
                    placeholder="Enter Your Fixed Price "
                    name="price"
                    id="price"
                    type="number"
                    required
                  />
                </div>
              ) : (
                addMore.map((index) => {
                  return (
                    <div
                      key={index}
                      className="w-full flex gap-2 items-center justify-between"
                    >
                      <div className="w-1/2 flex my-3 flex-col items-start gap-2">
                        <Label htmlFor="email">Range</Label>
                        <div className="flex gap-2 items-center">
                          <Input
                            placeholder="From"
                            name="price"
                            type="number"
                            required
                          />
                          <InputOTPSeparator />
                          <Input
                            placeholder="To"
                            name="price"
                            type="number"
                            required
                          />
                        </div>
                      </div>
                      <div className="w-1/2 flex my-3 flex-col items-start gap-2">
                        <Label htmlFor="email">Price</Label>
                        <Input
                          placeholder="Price"
                          name="price"
                          type="number"
                          required
                        />
                      </div>
                      <Button
                        className="mt-5"
                        variant={"outline"}
                        onClick={removeAddmoreHandler}
                      >
                        <TiIconX color="#D30000" />
                      </Button>
                    </div>
                  );
                })
              )}

              <Button
                className={`${tierPrice ? "block" : "hidden"}`}
                onClick={addMoreHandler}
                variant={"ghost"}
              >
                + Add More
              </Button>
            </>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Back</AlertDialogCancel>
            <AlertDialogAction>Done</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditProdcutPricebookPriceDialog;
