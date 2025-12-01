"use client";

import { Button } from "../components/ui";
import { Checkbox } from "../components/ui/checkbox";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../components/ui/dialog";


const roles = [
    {
        title: "Admin",
        description: "Admin manages operations and resources."
    },
    {
        title: "Dashboard",
        description: "Monitor, manage, and control system"
    },
    {
        title: "Manage Services",
        description: "Organize, track, and modify services."
    },
    {
        title: "Booking",
        description: "View, manage, and track bookings"
    },
    {
        title: "Reviews",
        description: "View and manage customer reviews"
    },
    {
        title: "Manage Bookings",
        description: "Track, update, and control bookings"
    },
    {
        title: "Company Profile",
        description: "Manage your business profile information"
    }
];


export default function MultiselectorDialog({ children }: { children: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="lg:max-w-2xl  rounded-4xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Edit Roles</DialogTitle>

                    <DialogDescription className="mt-4">
                        {roles.map((role, index) => (
                            <div key={index} className="flex justify-between items-center mb-4">
                                <div>
                                    <h1 className="text-black text-xl font-bold">{role.title}</h1>
                                    <p>{role.description}</p>
                                </div>
                                <div>
                                    <Checkbox />
                                </div>
                            </div>
                        ))}
                        <div className="float-right flex gap-2 text-xl font-bold mt-4">
                            {/* <button className="px-6 py-2 border-2 rounded-full border-primary shadow-2xl text-primary">
                                Cancel
                            </button>
                            <button className="px-6 py-2 border rounded-full border-primary shadow-2xl bg-primary text-white">
                                Update
                            </button> */}
                            <Button variant="outline">Cancel</Button>
                            <Button >Update</Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
