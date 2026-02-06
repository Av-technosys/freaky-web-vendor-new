"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../components/ui/input-group";
import { useState } from "react";
import { Button, Label, Separator } from "../../components/ui";
import { IconMailFilled, IconPlus, IconTrash } from "@tabler/icons-react";
import MultiselectorDialog from "../teamRoleMultiselectordialogbox";
import MultipleSelector from "../../components/ui/multi-select";
import ConfirmPopup from "../ConfirmPopup";
import { useGetVendorEmployees } from "@/services/useGetVendorCompanyDetails";
import {
  useDeleteVendorEmployee,
  useInviteVendorEmployee,
} from "@/services/useCreateOrUpdateCompanyDetails";
import { USER_ACCESS_DROPDOWN } from "@/const/dropdown";



const Users = () => {
  const singleField = { email: "", permissions: [] };
  const [fields, setFields] = useState<any>(Array.from({ length: 3 }, () => singleField));

  const updateField = (index: number, value: string, fieldData: any) => {
    if (fieldData) {
      setFields((prev: any) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          email: value,
          permissions: fieldData.permissions,
        };
        return updated;
      });
    } else {
      setFields((prev: any) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], email: value, permissions: [] };
        return updated;
      });
    }
  };

  const addField = () => {
    setFields([...fields, singleField]);
  };

  const { data: vendorEmployees } = useGetVendorEmployees();
  const deleteEmployeeMutation = useDeleteVendorEmployee();
  const inviteEmloyeeMutation = useInviteVendorEmployee();

  const employeeDeleteHandler = (employeeId: any) => {
    deleteEmployeeMutation.mutate(employeeId);
  };

  const sendInvitationHandler = () => {
    if (fields.length > 0) {
      const fieldsData = fields.filter((field: any) => {
        return field.email != "";
      });

      inviteEmloyeeMutation.mutate(fieldsData, {
        onSuccess: () => {
          setFields([
            { email: "", permissions: [] },
            { email: "", permissions: [] },
            { email: "", permissions: [] },
          ]);
        },
      });
    }
  };

  return (
    <>
      <div className="rounded-lg  shadow-2xl shadow-gray-200 bg-white">
        <div className="p-6">
          <h1 className="text-3xl  ">Manage Users</h1>
          <p className="  mt-2 text-gray-600">
            Manage your team members and their account permissions here.
          </p>
          <Separator className="mt-4" />
        </div>
        <div className="lg:flex w-full p-6">
          <div className="lg:w-1/2 w-full">
            <h1 className="text-3xl">Invite team members</h1>
            <p className=" mt-2 text-gray-600">
              Get your projects up and running faster by inviting your team to
              collaborate.
            </p>
          </div>
          <div className="w-full lg:mt-0 mt-10  space-y-4 text-black">
            {fields.map((field: any, index: number) => (
              <div key={index} className="space-y-2 space-x-4  flex">
                <InputGroup>
                  <InputGroupInput
                    type="email"
                    value={field.email}
                    placeholder="team@team.com"
                    onChange={(e) => updateField(index, e.target.value, "")}
                    onBlur={(e) => {
                      e.currentTarget.reportValidity();
                    }}
                  />

                  <InputGroupAddon>
                    <IconMailFilled className="h-5 w-5 text-yellow-500" />
                  </InputGroupAddon>
                </InputGroup>

                <MultipleSelector
                  field={field.email}
                  index={index}
                  updateField={updateField}
                  commandProps={{ label: "Select Role" }}
                  defaultOptions={USER_ACCESS_DROPDOWN}
                  placeholder="Select Role"
                  emptyIndicator={
                    <p className="text-center text-black text-sm">
                      No results found
                    </p>
                  }
                  className="w-full text-black"
                />

                <button
                  onClick={() => {
                    setFields((prev: any[]) =>
                      prev.filter((_, i) => i !== index)
                    );
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <IconTrash size={20} />
                </button>
              </div>
            ))}
            <div className="flex justify-between mt-2">
              <Button
                variant="ghost"
                className="cursor-pointer"
                onClick={addField}
              >
                <IconPlus size={18} />
                Add another
              </Button>

              <div className="flex gap-2 items-center cursor-pointer">
                <IconMailFilled size={18} className="text-orange-500" />
                <button
                  onClick={sendInvitationHandler}
                  className="text-orange-500 cursor-pointer"
                >
                  Send Invites
                </button>
              </div>
            </div>
          </div>
        </div>
        <Separator className="mt-4 mb-4" />

        <div className="lg:flex w-full p-6">
          <div className="lg:w-1/2 w-full">
            <h1 className="text-3xl"> Team members</h1>
            <p className="text-sm mt-2 text-gray-600">
              Get your projects up and running faster by inviting your team to
              collaborate.
            </p>
          </div>

          <div className="w-full lg:mt-0 mt-10 text-black">
            <div className="flex">
              <Label className="ml-2">Name</Label>
            </div>
            <Separator className="mt-4" />
            {vendorEmployees?.data?.map((data: any, index: number) => (
              <div key={index}>
                <div className="lg:flex grid grid-cols-2 justify-between w-full my-4">
                  <div className="flex items-center gap-4 w-1/3">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${data?.user?.profileImage
                        }`}
                      alt={data?.user?.firstName}
                    />
                    <Label className="ml-2">{data?.user?.firstName}</Label>
                  </div>

                  <div className="lg:flex grid  text-sm items-center justify-around w-2/3">
                    <h1>{data?.user?.email}</h1>
                    <h1>{data?.user?.number}</h1>
                    <div className="flex gap-4">
                      <MultiselectorDialog
                        employeeId={data?.vendor_employee?.vendorEmployeeId}
                        permissions={data?.vendor_employee?.permissions}
                      >
                        <button className="text-orange-500">Edit</button>
                      </MultiselectorDialog>

                      <ConfirmPopup
                        title="Are you sure you want to delete this member?"
                        alertTitle="Delete Member"
                        description="This action cannot be undone. This will permanently delete the member from your team."
                        confirmText="Delete"
                        cancelText="Cancel"
                        onConfirm={() =>
                          employeeDeleteHandler(
                            data?.vendor_employee?.vendorEmployeeId
                          )
                        }
                      >
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
