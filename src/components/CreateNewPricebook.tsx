import { Button, Input, Label, Textarea } from "./ui";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Switch } from "./ui/switch";

export default function CreateNewPricebook() {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="  "  >Add Pricebook</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new pricebook</DialogTitle>
                        <DialogDescription>
                            Create a new Price Book to manage and assign services prices.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <Label>Name</Label>
                        <Input
                            placeholder="Enter name"
                            className=""
                        />
                        <Label>Description</Label>
                        <Textarea
                            placeholder="Enter description"
                            className=""
                        />
                        <Label className=" mt-2" htmlFor="isStandard">Mark as standard</Label>

                        <Switch id="isStandard" />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button>Continue</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}