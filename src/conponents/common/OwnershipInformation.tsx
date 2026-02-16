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
import { type Owner } from "../../types/company";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { US_STATES } from "@/const/locatoins";

interface OwnershipInformationProps {
  data: {
    owners: Owner[];
    authorizedSignatory: number;
    businessType: string;
  };
  onUpdateOwner: (index: number, field: keyof Owner, value: string) => void;
  onUpdateAuthorizedSignatory: (index: number) => void;
  onAddOwner: () => void;
  onRemoveOwner: (index: number) => void; // Add this prop
  errors?: any;
  className?: string;
}

const OwnershipInformation = ({
  data,
  onUpdateOwner,
  onUpdateAuthorizedSignatory,
  onAddOwner,
  onRemoveOwner, // Add this to destructuring
  errors,
  className,
}: OwnershipInformationProps) => {
  return (
    <Card className={cn(className)}>
      <CardContent>
        <div className="flex justify-between items-center mb-5">
          <CardTitle>Ownership Information</CardTitle>
          {data.owners.length < 4 && data.businessType !== "solo" && (
            <Button onClick={onAddOwner} className="ml-auto">
              + Add Owner
            </Button>
          )}
        </div>

        {data?.owners.map((owner, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-6 mb-6 last:mb-0"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Owner #{index + 1}</h2>
              {data.owners.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveOwner(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
                      onUpdateOwner(index, "firstName", e.target.value)
                    }
                    placeholder="Enter First Name"
                    required
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
                      onUpdateOwner(index, "lastName", e.target.value)
                    }
                    placeholder="Enter Last Name"
                    required
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
                  onChange={(value) => onUpdateOwner(index, "ssnNumber", value)}
                  required
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
                        onUpdateOwner(
                          index,
                          "streetAddressLine1",
                          e.target.value,
                        )
                      }
                      placeholder="Enter Street Address Line 1"
                      required
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
                        onUpdateOwner(
                          index,
                          "streetAddressLine2",
                          e.target.value,
                        )
                      }
                      placeholder="Enter Street Address Line 2"
                      required
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
                        onUpdateOwner(index, "country", value)
                      }
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
                        onUpdateOwner(index, "state", value)
                      }
                    >
                      <SelectTrigger className="w-full" id="state" name="state">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>

                      <SelectContent>
                        {US_STATES.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
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
                        onUpdateOwner(index, "city", e.target.value)
                      }
                      placeholder="Enter City"
                      required
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
                        onUpdateOwner(index, "zipcode", e.target.value)
                      }
                      placeholder="Enter Zip Code"
                      className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      required
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
                    onUpdateOwner(index, "ownershipPercentage", e.target.value)
                  }
                  min={25}
                  placeholder="Min 25%"
                  className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  required
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
                  checked={data.authorizedSignatory === index}
                  onCheckedChange={(value: any) => {
                    if (value) {
                      onUpdateAuthorizedSignatory(index);
                    } else {
                      onUpdateAuthorizedSignatory(0);
                    }
                  }}
                />
                {data.authorizedSignatory === index && (
                  <span className="text-sm text-green-600 font-medium">
                    Currently authorized
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* {data.owners.length < 4 && data.businessType !== "solo" && (
          <div className="flex justify-center mt-4">
            <Button onClick={onAddOwner} variant="outline">
              + Add Another Owner
            </Button>
          </div>
        )} */}
      </CardContent>
    </Card>
  );
};

export default OwnershipInformation;
