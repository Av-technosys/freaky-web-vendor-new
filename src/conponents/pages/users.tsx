"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../components/ui/input-group";
import { useState } from "react";
import { Button, Separator } from "../../components/ui";
import { IconMailFilled, IconPlus, IconTrash } from "@tabler/icons-react";
import MultipleSelector from "../../components/ui/multi-select";
import {
  useInviteVendorEmployee,
} from "@/services/useCreateOrUpdateCompanyDetails";
import { USER_ACCESS_DROPDOWN } from "@/const/dropdown";
import withAuthorization from "@/lib/withAuthorization";
import ManageUser from "../manageUser";



const Users = () => {
  const createField = () => ({
    id: crypto.randomUUID(), //yeh isliye lagaya hai taki har field ko unique id mil ske or delete par multiseletor bhii remove ho jaaye..
    email: "",
    permissions: [],
  });

  const [fields, setFields] = useState<any>([
    createField(),
    createField(),
    createField(),
  ]);

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
    setFields((prev: any) => [...prev, createField()]);
  };

  const inviteEmloyeeMutation = useInviteVendorEmployee();


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
              <div key={field.id} className="space-y-2 space-x-4  flex">
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
                  value={field.permissions}
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
                      prev.filter((f) => f.id !== field.id),
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
        <ManageUser />

      </div>
    </>
  );
};

export default withAuthorization("manage-users")(Users);
