import { SkeletonText } from "@/components/skletob/text"
import { Label } from "@/components/ui"
import { useGetVendorEmployees } from "@/services/useGetVendorCompanyDetails";
import MultiselectorDialog from "./teamRoleMultiselectordialogbox";
import ConfirmPopup from "./ConfirmPopup";
import { useDeleteVendorEmployee } from "@/services/useCreateOrUpdateCompanyDetails";

const ManageUser = () => {
    const { data: vendorEmployees, isPending } = useGetVendorEmployees();
    const deleteEmployeeMutation = useDeleteVendorEmployee();

    const employeeDeleteHandler = (employeeId: any) => {
        deleteEmployeeMutation.mutate(employeeId);
    };

    return (
        <div className="lg:flex w-full p-6">
            <div className="lg:w-1/2 w-full">
                <h1 className="text-3xl"> Team members</h1>
                <p className="text-sm mt-2 text-gray-600">
                    Get your projects up and running faster by inviting your team to
                    collaborate.
                </p>
            </div>

            <div className="w-full lg:mt-0 mt-10  space-y-6">
                <div className="flex">
                    <Label className="">Name</Label>
                </div>
                {isPending ? <SkeletonText /> : vendorEmployees?.data?.map((data: any, index: number) => (
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
                                                data?.vendor_employee?.vendorEmployeeId,
                                            )
                                        }
                                    >
                                        <button className="text-red-500">Delete</button>
                                    </ConfirmPopup>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default ManageUser