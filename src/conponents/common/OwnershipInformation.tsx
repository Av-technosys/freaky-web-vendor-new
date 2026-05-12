/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "../../components/ui/input-otp";
import { Switch } from "../../components/ui/switch";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRY_LABEL_VALUE, STATE_LABEL_VALUE } from "@/const/locatoins";
import { useState, useEffect } from "react";
import { useGetVendorDetails, useGetVendorOwnershipDetails } from "@/services/useGetVendorCompanyDetails";
import { useUpdateOwnershipInformation } from "@/services/useCreateOrUpdateCompanyDetails";
import type { Owner, OwnershipInformationProps } from "@/types";

const initialOwner: Owner = {
  firstName: "",
  lastName: "",
  ssnNumber: "",
  streetAddressLine1: "",
  streetAddressLine2: "",
  country: "united_states",
  state: "",
  city: "",
  zipcode: "",
  ownershipPercentage: "",
};

const OwnershipInformation = ({
  data: controlledData,
  onUpdateOwner,
  onUpdateAuthorizedSignatory,
  onAddOwner,
  onRemoveOwner,
  errors,
  className,
  readOnly,
}: OwnershipInformationProps) => {
  const isControlled = !!controlledData;

  // Hooks for uncontrolled mode
  const { data: vendorOwnershipData, isPending: isOwnershipPending } = useGetVendorOwnershipDetails();
  const { data: vendorDetails } = useGetVendorDetails(); // businessType
  const updateOwnershipMutation = useUpdateOwnershipInformation();

  // Local state for uncontrolled
  const [localOwners, setLocalOwners] = useState<Owner[]>([initialOwner]);
  const [localAuthorizedSignatory, setLocalAuthorizedSignatory] = useState<number>(0);
  const [localBusinessType, setLocalBusinessType] = useState<string>("");

  // Sync data in uncontrolled mode
  useEffect(() => {
    if (!isControlled) {
      // Check if data is array (as per user API response) or object with owners
      const data = vendorOwnershipData?.data;
      if (Array.isArray(data)) {
        setLocalOwners(data.length > 0 ? data : [initialOwner]);
        const authIndex = data.findIndex((o: any) => o.isAuthorizedSignature === true);
        setLocalAuthorizedSignatory(authIndex !== -1 ? authIndex : 0);
      } else if (data?.owners) {
        // Fallback for previous structure if any
        setLocalOwners(data.owners.length > 0 ? data.owners : [initialOwner]);
        setLocalAuthorizedSignatory(data.authorizedSignatory || 0);
      }

      if (vendorDetails?.data) {
        setLocalBusinessType(vendorDetails.data.businessType || "");
      }
    }
  }, [vendorOwnershipData, vendorDetails, isControlled]);

  const owners = isControlled && controlledData ? controlledData.owners : localOwners;
  const authorizedSignatory = isControlled && controlledData ? controlledData.authorizedSignatory : localAuthorizedSignatory;
  const businessType = isControlled && controlledData ? controlledData.businessType : localBusinessType;

  const handleUpdateOwner = (index: number, field: keyof Owner, value: string) => {
    if (isControlled && onUpdateOwner) {
      onUpdateOwner(index, field, value);
    } else {
      setLocalOwners(prev => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });
    }
  };

  const handleUpdateAuthorizedSignatory = (index: number) => {
    if (isControlled && onUpdateAuthorizedSignatory) {
      onUpdateAuthorizedSignatory(index);
    } else {
      setLocalAuthorizedSignatory(index);
    }
  };

  const handleAddOwner = () => {
    if (isControlled && onAddOwner) {
      onAddOwner();
    } else {
      if (localOwners.length >= 4) return;
      setLocalOwners(prev => [...prev, { ...initialOwner }]);
    }
  };

  const handleRemoveOwner = (index: number) => {
    if (isControlled && onRemoveOwner) {
      onRemoveOwner(index);
    } else {
      if (localOwners.length <= 1) return;
      setLocalOwners(prev => {
        const updated = prev.filter((_, i) => i !== index);
        // Adjust authorized signatory if needed
        if (index === localAuthorizedSignatory) setLocalAuthorizedSignatory(0);
        else if (index < localAuthorizedSignatory) setLocalAuthorizedSignatory(prev => prev - 1);
        return updated;
      });
    }
  };

  const handleSave = () => {
    if (isControlled) return;
    const vendorId = vendorDetails?.data?.vendorId;
    if (!vendorId) return;

    // Prepare payload with correct isAuthorizedSignature
    const ownersPayload = localOwners.map((owner, index) => ({
      ...owner,
      isAuthorizedSignature: index === localAuthorizedSignatory
    }));

    updateOwnershipMutation.mutate({
      owners: ownersPayload,
      vendorId: Number(vendorId),
    });
  };

  const isPending = !isControlled && (isOwnershipPending);
  // Determine readOnly state
  const isReadOnly = isControlled ? readOnly : (vendorDetails?.data?.isApproved === true);


  if (isPending) return <div>Loading...</div>;

  return (
    <Card className={cn(className)}>
      <CardContent>
        <div className="flex justify-between items-center mb-5">
          <CardTitle>Ownership Information</CardTitle>
          {!isControlled && (
            <Button onClick={handleSave} disabled={updateOwnershipMutation.isPending}>
              {updateOwnershipMutation.isPending ? "Saving..." : "Save"}
            </Button>
          )}
          {owners.length < 4 && businessType !== "solo" && (
            <Button onClick={handleAddOwner} className="ml-auto" variant={isControlled ? "default" : "outline"} disabled={isReadOnly}>
              + Add Owner
            </Button>
          )}
        </div>

        {owners.map((owner, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-6 mb-6 last:mb-0"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Owner #{index + 1}</h2>
              {owners.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveOwner(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  disabled={isReadOnly}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              )}
            </div>

            <div className="flex flex-col gap-6 mt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-3">
                  <Label>First Name</Label>
                  <Input
                    value={owner.firstName}
                    onChange={(e) =>
                      handleUpdateOwner(index, "firstName", e.target.value)
                    }
                    placeholder="Enter First Name"
                    required
                    readOnly={isReadOnly}
                  />
                  {errors?.owners?.[index]?.firstName?._errors?.length > 0 && (
                    <p className="text-red-500 text-sm">
                      {errors.owners[index].firstName._errors[0]}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <Label>Last Name</Label>
                  <Input
                    value={owner.lastName}
                    onChange={(e) =>
                      handleUpdateOwner(index, "lastName", e.target.value)
                    }
                    placeholder="Enter Last Name"
                    required
                    readOnly={isReadOnly}
                  />
                  {errors?.owners?.[index]?.lastName?._errors?.length > 0 && (
                    <p className="text-red-500 text-sm">
                      {errors.owners[index].lastName._errors[0]}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Label>SSN</Label>
                <InputOTP
                  maxLength={9}
                  value={String(owner.ssnNumber)}
                  onChange={(value) => handleUpdateOwner(index, "ssnNumber", value)}
                  required
                  disabled={isReadOnly}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator className="hidden md:block ">
                    -
                  </InputOTPSeparator>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                  <InputOTPSeparator className="hidden md:block ">
                    -
                  </InputOTPSeparator>
                  <InputOTPGroup>
                    <InputOTPSlot index={5} />
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                    <InputOTPSlot index={8} />
                  </InputOTPGroup>
                </InputOTP>
                {errors?.owners?.[index]?.ssnNumber?._errors?.length > 0 && (
                  <p className="text-red-500 text-sm">
                    {errors.owners[index].ssnNumber._errors[0]}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-6 mt-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-3">
                    <Label>Street Address Line 1</Label>
                    <Input
                      value={owner.streetAddressLine1}
                      onChange={(e) =>
                        handleUpdateOwner(
                          index,
                          "streetAddressLine1",
                          e.target.value,
                        )
                      }
                      placeholder="Enter Street Address Line 1"
                      required
                      readOnly={isReadOnly}
                    />
                    {errors?.owners?.[index]?.streetAddressLine1?._errors
                      ?.length > 0 && (
                        <p className="text-red-500 text-sm">
                          {errors.owners[index].streetAddressLine1._errors[0]}
                        </p>
                      )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label>Street Address Line 2</Label>
                    <Input
                      value={owner.streetAddressLine2}
                      onChange={(e) =>
                        handleUpdateOwner(
                          index,
                          "streetAddressLine2",
                          e.target.value,
                        )
                      }
                      placeholder="Enter Street Address Line 2"
                      required
                      readOnly={isReadOnly}
                    />
                    {errors?.owners?.[index]?.streetAddressLine2?._errors
                      ?.length > 0 && (
                        <p className="text-red-500 text-sm">
                          {errors.owners[index].streetAddressLine2._errors[0]}
                        </p>
                      )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-3">
                    <Label>Country</Label>

                    <Select
                      value={owner.country || "united_states"}
                      onValueChange={(value) =>
                        handleUpdateOwner(index, "country", value)
                      }
                      disabled={isReadOnly}
                    >
                      <SelectTrigger className="w-full" id="country">
                        <SelectValue placeholder="United States" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="united_states">
                          United States
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors?.owners?.[index]?.country?._errors?.length > 0 && (
                      <p className="text-red-500 text-sm">
                        {errors.owners[index].country._errors[0]}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label htmlFor="state">State</Label>

                    <Select
                      value={owner.state}
                      onValueChange={(value) =>
                        handleUpdateOwner(index, "state", value)
                      }
                      disabled={isReadOnly}
                    >
                      <SelectTrigger className="w-full" id="state" name="state">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>

                      <SelectContent>
                        {STATE_LABEL_VALUE.options.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors?.owners?.[index]?.state?._errors?.length > 0 && (
                      <p className="text-red-500 text-sm">
                        {errors.owners[index].state._errors[0]}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label>City</Label>
                    <Input
                      value={owner.city}
                      onChange={(e) =>
                        handleUpdateOwner(index, "city", e.target.value)
                      }
                      placeholder="Enter City"
                      required
                      readOnly={isReadOnly}
                    />
                    {errors?.owners?.[index]?.city?._errors?.length > 0 && (
                      <p className="text-red-500 text-sm">
                        {errors.owners[index].city._errors[0]}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label>Zip Code</Label>
                    <Input
                      type="number"
                      value={owner.zipcode}
                      onChange={(e) =>
                        handleUpdateOwner(index, "zipcode", e.target.value)
                      }
                      placeholder="Enter Zip Code"
                      className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      required
                      readOnly={isReadOnly}
                    />
                    {errors?.owners?.[index]?.zipcode?._errors?.length > 0 && (
                      <p className="text-red-500 text-sm">
                        {errors.owners[index].zipcode._errors[0]}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col gap-3">
                <Label>Ownership Percentage (%)</Label>
                <Input
                  type="number"
                  value={owner.ownershipPercentage}
                  onChange={(e) =>
                    handleUpdateOwner(index, "ownershipPercentage", e.target.value)
                  }
                  min={25}
                  placeholder="Min 25%"
                  className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  required
                  readOnly={isReadOnly}
                />
                {errors?.owners?.[index]?.ownershipPercentage?._errors?.length >
                  0 && (
                    <p className="text-red-500 text-sm">
                      {errors.owners[index].ownershipPercentage._errors[0]}
                    </p>
                  )}
              </div>

              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-200">
                <Label className="font-bold text-base">
                  Authorized Signatory
                </Label>
                <Switch
                  checked={authorizedSignatory === index}
                  onCheckedChange={(value: any) => {
                    if (isReadOnly) return;
                    if (value) {
                      handleUpdateAuthorizedSignatory(index);
                    } else {
                      handleUpdateAuthorizedSignatory(0);
                    }
                  }}
                  disabled={isReadOnly}
                />
                {authorizedSignatory === index && (
                  <span className="text-sm text-green-600 font-medium">
                    Currently authorized
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OwnershipInformation;
