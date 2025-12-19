"use client";

import { useState } from "react";
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
import { useUpdateEmployeePermissions } from "@/services/useCreateOrUpdateCompanyDetails";

const roles = [
  {
    title: "Admin",
    description: "Admin manages operations and resources.",
  },
  {
    title: "Dashboard",
    description: "Monitor, manage, and control system",
  },
  {
    title: "Manage_Services",
    description: "Organize, track, and modify services.",
  },
  {
    title: "Booking",
    description: "View, manage, and track bookings",
  },
  {
    title: "Reviews",
    description: "View and manage customer reviews",
  },
  {
    title: "Manage_Bookings",
    description: "Track, update, and control bookings",
  },
  {
    title: "Company_Profile",
    description: "Manage your business profile information",
  },
];

export default function MultiselectorDialog({
  children,
  employeeId,
  permissions,
}: {
  children: React.ReactNode;
  employeeId: any;
  permissions: any;
}) {
  const [allowedPermissions, setAllowedPermissions] =
    useState<any>(permissions);

  const updatePemissionMutation = useUpdateEmployeePermissions();

  const togglePermission = (roleKey: string, checked: boolean) => {
    setAllowedPermissions((prev: string[]) =>
      checked
        ? [...new Set([...prev, roleKey])]
        : prev.filter((item) => item !== roleKey)
    );
  };

  const updateHandler = () => {
    updatePemissionMutation.mutate({ allowedPermissions, employeeId });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="lg:max-w-2xl  rounded-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Roles</DialogTitle>

          <DialogDescription className="mt-4">
            {roles?.map((role: any, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <h3 className="text-black text-normal">{role.title}</h3>
                  <p className="text-gray-500 ">{role?.description}</p>
                </div>
                <div>
                  <Checkbox
                    checked={allowedPermissions.includes(
                      role?.title?.toLowerCase()
                    )}
                    onCheckedChange={(checked) =>
                      togglePermission(
                        role?.title?.toLowerCase(),
                        checked === true
                      )
                    }
                  />
                </div>
              </div>
            ))}
            <div className="float-right flex gap-2 text-xl font-bold mt-4">
              <Button onClick={updateHandler}>Update</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
