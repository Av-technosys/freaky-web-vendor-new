import { useState } from "react";
import { Button, Input, Label, Textarea } from "./ui";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Switch } from "./ui/switch";
import { useCreatePriceBook } from "@/services/useCreatePriceBook";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateNewPricebook() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isActive, setIsActive] = useState(false);

    const { mutate: createPriceBook, isPending } = useCreatePriceBook();
    const queryClient = useQueryClient();

    const handleCreate = () => {
        if (!name) {
            toast.error("Name is required");
            return;
        }

        const payload = {
            name,
            description,
            isActive // User asked for isActive, I'm mapping "Mark as standard" to this for now or just separate?
            // Wait, the prompt said: "const { name, description, isActive } = req.body;"
            // The UI has "Mark as standard".  Usually standard might imply isActive or default. 
            // I'll map "Mark as standard" switch for now to `isActive` or add a separate switch?
            // The UI shows: Label "Mark as standard", Switch id="isStandard". 
            // I'll use isActive state variable for this switch.
        };

        createPriceBook(payload, {
            onSuccess: () => {
                setOpen(false);
                // Reset form
                setName("");
                setDescription("");
                setIsActive(false);
                queryClient.invalidateQueries({ queryKey: ["vendor-pricebooks"] });
            }
        });
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Label>Description</Label>
                        <Textarea
                            placeholder="Enter description"
                            className=""
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="flex items-center space-x-2 mt-2">
                            <Switch
                                id="isStandard"
                                checked={isActive}
                                onCheckedChange={setIsActive}
                            />
                            <Label htmlFor="isStandard">Mark as standard</Label>
                        </div>

                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleCreate} disabled={isPending}>
                            {isPending ? "Creating..." : "Continue"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}