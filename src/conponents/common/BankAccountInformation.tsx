/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardContent, CardTitle, Card, CardFooter } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { type CompanyData } from "../../types/company";
import { cn } from "@/lib/utils";
import { useGetVendorDetails } from "@/services/useGetVendorCompanyDetails";
import { useUpdateBankAccountInformation } from "@/services/useCreateOrUpdateCompanyDetails";
import { useState, useEffect } from "react";

interface BankAccountInformationProps {
  data?: Pick<
    CompanyData,
    "accountNumber" | "bankName" | "payeeName" | "routingNumber" | "bankType"
  >;
  onUpdate?: (key: keyof CompanyData, value: any) => void;
  errors?: any;
  onPrevious?: () => void; // Keep optionally for compatibility if used elsewhere
  onSave?: () => void;     // Keep optionally for compatibility if used elsewhere
  className?: string;
  readOnly?: boolean;
}

const BankAccountInformation = ({
  data: controlledData,
  onUpdate,
  errors,
  className,
  readOnly,
  //   onPrevious,
  //   onSave,
}: BankAccountInformationProps) => {
  const isControlled = !!onUpdate;
  const { data: vendorData, isPending: isApiPending } = useGetVendorDetails();
  const updateBankMutation = useUpdateBankAccountInformation();

  const [localFormData, setLocalFormData] = useState({
    accountNumber: "",
    bankName: "",
    payeeName: "",
    routingNumber: "",
    bankType: "",
  });

  useEffect(() => {
    if (!isControlled && vendorData?.data) {
      const data = vendorData.data;
      setLocalFormData({
        accountNumber: data.accountNumber || "",
        bankName: data.bankName || "",
        payeeName: data.payeeName || "",
        routingNumber: data.routingNumber || "",
        bankType: data.bankType || "",
      });
    }
  }, [vendorData, isControlled]);

  const formData = isControlled && controlledData ? {
    accountNumber: controlledData.accountNumber || "",
    bankName: controlledData.bankName || "",
    payeeName: controlledData.payeeName || "",
    routingNumber: controlledData.routingNumber || "",
    bankType: controlledData.bankType || "",
  } : localFormData;

  const handleUpdate = (key: string, value: any) => {
    if (isControlled && onUpdate) {
      onUpdate(key as keyof CompanyData, value);
    } else {
      setLocalFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSave = () => {
    if (isControlled) return;
    const payload = {
      accountNumber: localFormData.accountNumber,
      bankName: localFormData.bankName,
      payeeName: localFormData.payeeName,
      routingNumber: localFormData.routingNumber,
      bankType: localFormData.bankType,
    };
    updateBankMutation.mutate(payload);
  };

  const isPending = !isControlled && isApiPending;

  // Determine readOnly state
  // If controlled, use prop. If uncontrolled, check vendor approval status?
  // Assuming similar logic to other components or just standard readOnly prop
  const isReadOnly = isControlled ? readOnly : (vendorData?.data?.isApproved === true);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Card className={cn(className)}>
      <CardContent>
        <div className="flex justify-between items-center mb-5">
          <CardTitle>Bank Account Information</CardTitle>

        </div>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                name="accountNumber"
                id="accountNumber"
                placeholder="Enter Account Number"
                type="text"
                value={formData.accountNumber}
                onChange={(e) => handleUpdate("accountNumber", e.target.value)}
                required
                readOnly={isReadOnly}
              />
              {errors?.bankAccountNumber && (
                <p className="text-red-500 text-sm">
                  {errors.bankAccountNumber}
                </p>
              )}
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                name="bankName"
                id="bankName"
                placeholder="Enter Bank Name"
                type="text"
                value={formData.bankName}
                onChange={(e) => handleUpdate("bankName", e.target.value)}
                required
                readOnly={isReadOnly}
              />
              {errors?.bankName && (
                <p className="text-red-500 text-sm">{errors.bankName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="payeeName">Payee Name</Label>
              <Input
                name="payeeName"
                id="payeeName"
                placeholder="Enter Payee Name"
                type="text"
                value={formData.payeeName}
                onChange={(e) => handleUpdate("payeeName", e.target.value)}
                required
                readOnly={isReadOnly}
              />
              {errors?.payeeName && (
                <p className="text-red-500 text-sm">{errors.payeeName}</p>
              )}
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="routingNumber">Routing Number (ABA)</Label>
              <Input
                placeholder="Enter Routing Number (ABA)"
                name="routingNumber"
                id="routingNumber"
                type="number"
                className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                value={formData.routingNumber}
                onChange={(e) => handleUpdate("routingNumber", e.target.value)}
                required
                readOnly={isReadOnly}
              />
              {errors?.routingNumber && (
                <p className="text-red-500 text-sm">{errors.routingNumber}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="bankType">Bank Type</Label>
              <Select
                value={formData.bankType}
                onValueChange={(value) => handleUpdate("bankType", value)}
                disabled={isReadOnly}
              >
                <SelectTrigger className="w-full" id="bankType" name="bankType">
                  <SelectValue placeholder="Select Bank Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="business_saving">
                    Business Saving
                  </SelectItem>
                  <SelectItem value="business_checking">
                    Business Checking
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors?.bankType && (
                <p className="text-red-500 text-sm">{errors.bankType}</p>
              )}
            </div>
          </div>
        </div>

      </CardContent>
      <CardFooter className="flex gap-3 items-center justify-center md:justify-end mt-6">
        {!isControlled && (
          <Button onClick={handleSave} className="ml-auto" disabled={updateBankMutation.isPending}>
            {updateBankMutation.isPending ? "Saving..." : "Save"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BankAccountInformation;
