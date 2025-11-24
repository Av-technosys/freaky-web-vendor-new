"use client";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../components/ui/dialog";



export default function DeleteMemberPopup({ children }: { children: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mx-auto text-4xl text-center"> Are you sure you want to delete user?</DialogTitle>

                    <DialogDescription className="mt-4">
                        hello
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
