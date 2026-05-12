import { useEffect, useState } from "react";
import { Button } from "../components/ui";
import { Checkbox } from "../components/ui/checkbox";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { useUpdateEmployeePermissions } from "@/services/useCreateOrUpdateCompanyDetails";
import { USER_ACCESS_DROPDOWN } from "@/const/dropdown";
import { useGetEmployeePermissions } from "@/services/useGetEmployeePermissions";
import { Skeleton } from "../components/ui";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field";

type ComponentProps = {
  children: React.ReactNode;
  employeeId: any;
};

export default function MultiselectorDialog({
  children,
  employeeId,
}: ComponentProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const { data: employeePermissions, isPending } = useGetEmployeePermissions(
    employeeId,
    openDialog,
  );

  const [allowedPermissions, setAllowedPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (!isPending && employeePermissions?.data) {
      try {
        console.log(employeePermissions)
        let permissionArray = employeePermissions.data?.permissions;
        console.log(permissionArray, "permissionArray");

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
        : prev.filter((item) => item !== roleKey),
    );
  };

  const updateHandler = () => {
    updatePemissionMutation.mutate(
      { allowedPermissions, employeeId },
      {
        onSuccess: () => {
          setOpenDialog(false);
        },
      },
    );
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className=" max-h-[90vh] overflow-y-auto lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Roles</DialogTitle>

          <div className="mt-4">
            {isPending ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <div className=" pr-4 w-full overflow-y-auto">
                {USER_ACCESS_DROPDOWN?.map((role: any) => (
                  <FieldLabel
                    key={role.label}
                    className="flex justify-between items-center mb-4"
                  >
                    <Field orientation={"horizontal"} className=" cursor-pointer">
                      <FieldContent className="">
                        <FieldTitle className=" text-gray-800">{role.label}</FieldTitle>
                        <FieldDescription>
                          {role?.description}
                        </FieldDescription>
                      </FieldContent>
                      <Checkbox
                        checked={allowedPermissions.includes(
                          role?.value?.toLowerCase(),
                        )}
                        onCheckedChange={(checked) =>
                          togglePermission(
                            role?.value?.toLowerCase(),
                            checked === true,
                          )
                        }
                      />
                    </Field>
                  </FieldLabel>
                ))}
                <div className="float-right flex gap-2 text-xl font-bold mt-4">
                  <Button onClick={updateHandler}>Update</Button>
                </div>
              </div>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
