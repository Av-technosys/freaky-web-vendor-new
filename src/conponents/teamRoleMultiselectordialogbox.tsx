import { useEffect, useState } from "react";
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
import { useGetEmployeePermissions } from "@/services/useGetEmployeePermissions";
import { Skeleton } from "../components/ui";

type ComponentProps = {
  children: React.ReactNode;
  employeeId: any;
}

export default function MultiselectorDialog({
  children,
  employeeId,
}: ComponentProps) {

  const [openDialog, setOpenDialog] = useState(false);
  const { data: employeePermissions, isPending } = useGetEmployeePermissions(
    employeeId,
    openDialog
  );

  const [allowedPermissions, setAllowedPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (!isPending && employeePermissions?.data) {
      try {
        let permissionArray = employeePermissions.data;

        if (typeof permissionArray === "string") {
          permissionArray = JSON.parse(permissionArray);
        }

        if (Array.isArray(permissionArray)) {
          setAllowedPermissions(permissionArray);
        } else {
          setAllowedPermissions([]);
        }
      } catch (error) {
        console.error("Failed to parse permissions:", error);
        setAllowedPermissions([]);
      }
    }
  }, [employeePermissions, isPending]);

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
            {isPending ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <>
                {USER_ACCESS_DROPDOWN?.map((role: any) => (
                  <div
                    key={role.label}
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
              </>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
