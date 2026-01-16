// manage payment book
import { Button, Card, CardDescription, Label } from "../../components/ui";
import EditPaymentBookDialog from "../editPaymentBookDialog";
import { useState } from "react";
import { TiIconPencilPlus, TiIconTrash } from "../icons";
import { Badge } from "@/components/ui/badge";
import DeletePricebookDialog from "@/components/DeletePricebookDialog";
import { useGetAllPriceBook } from "@/services/useGetAllPricebooks";
import CreateNewPricebook from "@/components/CreateNewPricebook";


const ManagePaymentBook = () => {

  const { data, isPending } = useGetAllPriceBook();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPricebook, setSelectedPricebook] = useState({
    id: "",
    name: ""
  });

  function handleEditClick(priceBook: any) {
    setSelectedPricebook(priceBook);
    setIsEditOpen(true);
  }

  function handleDeleteClick(priceBook: any) {
    setSelectedPricebook(priceBook);
    setIsDeleteOpen(true);
  }

  if (isPending) {
    return <div>Loading...</div>
  }

  const proceBooksData = data?.data;
  return (
    <div className="">
      <div className="  w-full flex justify-end px-4">
        <CreateNewPricebook />
      </div>
      <Label className=" pl-4 ">Pricebooks</Label>
      {proceBooksData?.map((priceBook: any) => {
        return (
          <Card key={priceBook?.id} className="mt-2">
            <CardDescription>
              <div className="w-full px-6 flex items-center justify-between">
                <div className=" flex gap-2 items-center">
                  <div className="text-base ">{priceBook?.name}</div>
                  {priceBook.isStandard && <BadgeStandard />}
                  {priceBook.isActive && <BadgePrimary />}
                </div>
                <div className="flex gap-4">
                  <Button disabled={priceBook?.isStandard || priceBook?.isActive} onClick={() => handleDeleteClick({ id: priceBook?.id, name: priceBook?.name })} variant={"outline"}>
                    <TiIconTrash color="#D30000" />
                  </Button>
                  <Button onClick={() => handleEditClick({ id: priceBook?.id, name: priceBook?.name })} variant="outline">
                    <TiIconPencilPlus color="#D30000" />
                  </Button>
                </div>
              </div>
            </CardDescription>
          </Card>
        );
      })}

      <DeletePricebookDialog priceBookId={selectedPricebook.id} isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
      <EditPaymentBookDialog priceBook={selectedPricebook} isOpen={isEditOpen} setOpen={setIsEditOpen} />
    </div>
  );
};

const BadgeStandard = () => {
  return <Badge >Standard</Badge>
}

const BadgePrimary = () => {
  return <Badge className=" bg-green-600">Primary</Badge>
}

export default ManagePaymentBook;
