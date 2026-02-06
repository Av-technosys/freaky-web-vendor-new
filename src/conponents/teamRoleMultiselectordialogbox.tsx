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
import { USER_ACCESS_DROPDOWN } from "@/const/dropdown";

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

  const [openDialog, setOpenDialog] = useState(false);

  const updatePemissionMutation = useUpdateEmployeePermissions();

  const togglePermission = (roleKey: string, checked: boolean) => {
    setAllowedPermissions((prev: string[]) =>
      checked
        ? [...new Set([...prev, roleKey])]
        : prev.filter((item) => item !== roleKey)
    );
  };

  const updateHandler = () => {
    updatePemissionMutation.mutate(
      { allowedPermissions, employeeId },
      {
        onSuccess: () => {
          setOpenDialog(false);
        },
      }
    );
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Roles</DialogTitle>
          <DialogDescription className="mt-4">
            {USER_ACCESS_DROPDOWN?.map((role: any, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <h3 className="text-black text-normal">{role.label}</h3>
                  <p className="text-gray-500 ">{role?.description}</p>
                </div>
                <div>
                  <Checkbox
                    checked={allowedPermissions.includes(
                      role?.value?.toLowerCase()
                    )}
                    onCheckedChange={(checked) =>
                      togglePermission(
                        role?.value?.toLowerCase(),
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
