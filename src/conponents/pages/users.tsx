"use client";

import img from "../../assets/testingProfilePicture.jpg"

import { InputGroup, InputGroupAddon, InputGroupInput } from "../../components/ui/input-group";
import { useState } from "react";
import { Checkbox } from "../../components/ui/checkbox";
import { Label, Separator } from "../../components/ui";
import { IconMailFilled, IconPlus, IconTrash } from "@tabler/icons-react";
import MultiselectorDialog from "../teamRoleMultiselectordialogbox";
import MultipleSelector from "../../components/ui/multi-select";
import ConfirmPopup from "../ConfirmPopup";


const users = [
    {
        name: "Jane Doe",
        email: "Olivia@gmail.com",
        phone: "1234567890",
        img: img,
    },
    {
        name: "John Smith",
        email: "john@gmail.com",
        phone: "9876543210",
        img: img,
    },
    {
        name: "Emily Watson",
        email: "emily@gmail.com",
        phone: "9988776655",
        img: img,
    },
    {
        name: "Michael Lee",
        email: "michael@gmail.com",
        phone: "8899001122",
        img: img,
    },
    {
        name: "Sarah Brown",
        email: "sarah@gmail.com",
        phone: "7766554433",
        img: img,
    },
];
const categories = [
    { value: "admin", label: "Admin" },
    { value: "dashboard", label: "Dashboard" },
    { value: "manage_services", label: "Manage Services" },
    { value: "booking", label: "Booking" },
    { value: "review", label: "Review" },
    { value: "manage_bookings", label: "Manage Bookings" },
    { value: "company_profile", label: "Company Profile" },
];

const Users = () => {
    const [fields, setFields] = useState([{ email: "" },
    { email: "" }, { email: "" },
    ]);

    const addField = () => {
        setFields([...fields, { email: "" }]);
    }

    const updateField = (index: number, value: string) => {
        const updated = [...fields];
        updated[index].email = value;
        setFields(updated);
    };
    return (
        <>
            <div className="rounded-lg  shadow-2xl shadow-gray-200 bg-white">
                <div className="p-6">
                    <h1 className="text-4xl  ">Manage Users</h1>
                    <p className="text-sm mt-2 text-gray-600">Manage your team members and their account permissions here.</p>
                    <Separator className="mt-4" />
                </div>
                <div className="lg:flex w-full p-6">
                    <div className="lg:w-1/2 w-full">
                        <h1 className="text-3xl">Invite team members</h1>
                        <p className="text-sm mt-2 text-gray-600">Get your projects up and running faster by
                            inviting your team to collaborate.</p>
                    </div>
                    <div className="w-full lg:mt-0 mt-10  space-y-4 text-black">
                        {fields.map((field, index) => (
                            <div key={index} className="space-y-2 space-x-4  flex">

                                {/* Email Input */}
                                <InputGroup>
                                    <InputGroupInput
                                        type="email"
                                        placeholder="team@team.com"
                                        value={field.email}
                                        onChange={(e) => updateField(index, e.target.value)}
                                    />
                                    <InputGroupAddon>
                                        <IconMailFilled className="h-5 w-5 text-yellow-500" />
                                    </InputGroupAddon>
                                </InputGroup>

                                {/* Role Selector */}
                                <MultipleSelector
                                    commandProps={{ label: "Select Role" }}
                                    defaultOptions={categories}
                                    placeholder="Select Role"
                                    emptyIndicator={
                                        <p className="text-center text-black text-sm">No results found</p>
                                    }
                                    className="w-full text-black"
                                />

                                {/* DELETE BUTTON */}
                                <button
                                    onClick={() => {
                                        const updated = fields.filter((_, i) => i !== index);
                                        setFields(updated);
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <IconTrash size={20} />
                                </button>

                            </div>
                        ))}
                        <div className="flex justify-between mt-2">
                            <div className="flex gap-2 items-center cursor-pointer">
                                <IconPlus size={18} />
                                <button onClick={addField}>Add another</button>
                            </div>

                            <div className="flex gap-2 items-center cursor-pointer">
                                <IconMailFilled size={18} className="text-orange-500" />
                                <button className="text-orange-500">Send Invites</button>
                            </div>
                        </div>
                    </div>


                </div>
                <Separator className="mt-4 mb-4" />

                <div className="lg:flex w-full p-6">
                    <div className="lg:w-1/2 w-full">
                        <h1 className="text-3xl"> Team members</h1>
                        <p className="text-sm mt-2 text-gray-600">Get your projects up and running faster by
                            inviting your team to collaborate.</p>
                    </div>


                    <div className="w-full lg:mt-0 mt-10 text-black">
                        <div className="flex">
                            <Checkbox />
                            <Label className="ml-2">Name</Label>

                        </div>
                        <Separator className="mt-4" />
                        {users.map((user, index) => (
                            <div key={index}>
                                <div className="lg:flex grid grid-cols-2 justify-between w-full my-4">
                                    <div className="flex items-center gap-4 w-1/3">
                                        <Checkbox />
                                        <img src={user.img} alt={user.name} className="w-8 h-8 rounded-full" />
                                        <Label className="ml-2">{user.name}</Label>
                                    </div>

                                    <div className="lg:flex grid  text-sm items-center justify-around w-2/3">
                                        <h1>{user.email}</h1>
                                        <h1>{user.phone}</h1>
                                        <div className="flex gap-4"><MultiselectorDialog>
                                            <button className="text-orange-500">Edit</button>
                                        </MultiselectorDialog>

                                            <ConfirmPopup
                                                title="Are you sure you want to delete this member?"
                                                alertTitle="Delete Member"
                                                description="This action cannot be undone. This will permanently delete the member from your team."
                                                confirmText="Delete"
                                                cancelText="Cancel"
                                                onConfirm={() => {
                                                    console.log("Member Deleted");
                                                }}>
                                                <button className="text-red-500">Delete</button>
                                            </ConfirmPopup>
                                        </div>
                                    </div>

                                </div>

                                <Separator className="mt-4" />
                            </div>
                        ))}


                    </div>

                </div>

            </div>
        </>
    );
};

export default Users;
