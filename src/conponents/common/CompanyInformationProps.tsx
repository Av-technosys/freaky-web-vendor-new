import { Card, CardContent, CardFooter, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calender";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetVendorDetails } from "@/services/useGetVendorCompanyDetails";
import { useState, useEffect } from "react";
import { useUpdateCompanyInformation } from "@/services/useCreateOrUpdateCompanyDetails";
import { type CompanyData } from "../../types/company"; // Import CompanyData type

interface CompanyInformationProps {
  className?: string;
  data?: Partial<CompanyData>;
  onUpdate?: (key: keyof CompanyData, value: any) => void;
  errors?: Record<string, string>;
  readOnly?: boolean;
  open?: boolean; // Keep these for compatibility/optional usage
  setOpen?: (open: boolean) => void;
}

const CompanyInformation = ({
  className,
  data: controlledData,
  onUpdate,
  errors,
  readOnly: propReadOnly,
  open: propOpen,
  setOpen: propSetOpen
}: CompanyInformationProps) => {
  const isControlled = !!onUpdate;

  const { data: vendorData, isPending: isApiPending } = useGetVendorDetails();
  const updateCompanyMutation = useUpdateCompanyInformation();

  const [localFormData, setLocalFormData] = useState({
    businessName: "",
    website: "",
    dbaName: "",
    legalEntityName: "",
    einNumber: "",
    businessType: "",
    incorporationDate: undefined as Date | undefined,
  });

  const [localOpen, setLocalOpen] = useState(false);
  // Errors state is used in uncontrolled mode if we want to add validation, but for now we just accept errors prop for controlled mode
  // or simple validation could be added. For now, rely on API feedback or simplified logic for uncontrolled.

  const open = isControlled && propOpen !== undefined ? propOpen : localOpen;
  const setOpen = isControlled && propSetOpen ? propSetOpen : setLocalOpen;

  const isPending = !isControlled && isApiPending;

  useEffect(() => {
    if (!isControlled && vendorData?.data) {
      const data = vendorData.data;
      setLocalFormData({
        businessName: data.businessName || "",
        website: data.websiteURL || "",
        dbaName: data.DBAname || "",
        legalEntityName: data.legalEntityName || "",
        einNumber: data.einNumber || "",
        businessType: data.businessType || "",
        incorporationDate: data.incorporationDate
          ? new Date(data.incorporationDate)
          : undefined,
      });
    }
  }, [vendorData, isControlled]);

  const formData = isControlled && controlledData ? {
    businessName: controlledData.businessName || "",
    website: controlledData.website || "",
    dbaName: controlledData.dbaName || "",
    legalEntityName: controlledData.legalEntityName || "",
    einNumber: controlledData.einNumber || "",
    businessType: controlledData.businessType || "",
    incorporationDate: controlledData.incorporationDate,
  } : localFormData;

  const handleChange = (key: string, value: any) => {
    if (isControlled && onUpdate) {
      onUpdate(key as keyof CompanyData, value);
    } else {
      setLocalFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSave = () => {
    if (isControlled) return;
    const payload = {
      businessName: localFormData.businessName,
      websiteURL: localFormData.website,
      DBAname: localFormData.dbaName,
      legalEntityName: localFormData.legalEntityName,
      einNumber: localFormData.einNumber,
      businessType: localFormData.businessType,
      incorporationDate: localFormData.incorporationDate || new Date(),
    };
    updateCompanyMutation.mutate(payload);
  };

  // Logic for readOnly
  // If controlled, use prop. If uncontrolled, check vendor approval status?
  const isReadOnly = isControlled ? propReadOnly : (vendorData?.data?.isApproved === true);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Card className={cn(className)}>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <CardTitle>Company Information</CardTitle>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                name="businessName"
                id="businessName"
                placeholder="Enter Business Name"
                type="text"
                value={formData.businessName}
                onChange={(e) => handleChange("businessName", e.target.value)}
                required
              />
              {errors?.businessName && (
                <p className="text-red-500 text-sm">{errors?.businessName}</p>
              )}
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="website">Website</Label>
              <InputGroup>
                <InputGroupAddon>
                  {/* <InputGroupText>https://</InputGroupText> */}
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="https://www.example.com"
                  value={formData.website && formData.website.replace("https://", "") || ""}
                  onChange={(e) =>
                    handleChange("website", `https://${e.target.value}`)
                  }
                />
                {errors?.websiteURL && (
                  <p className="text-red-500 text-sm">{errors.websiteURL}</p>
                )}
              </InputGroup>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="dbaName">DBA Name</Label>
              <Input
                name="dbaName"
                id="dbaName"
                placeholder="Enter DBA Name"
                type="text"
                value={formData.dbaName}
                readOnly={isReadOnly}
                onChange={(e) => handleChange("dbaName", e.target.value)}
                required
              />
              {errors?.DBAname && (
                <p className="text-red-500 text-sm">{errors.DBAname}</p>
              )}
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="legalEntityName">Legal Entity Name</Label>
              <Input
                name="legalEntityName"
                id="legalEntityName"
                placeholder="Enter Entity Name"
                type="text"
                value={formData.legalEntityName}
                onChange={(e) => handleChange("legalEntityName", e.target.value)}
                required
              />
              {errors?.legalEntityName && (
                <p className="text-red-500 text-sm">{errors.legalEntityName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="businessType">Business Type</Label>
              <Select
                onValueChange={(value) => handleChange("businessType", value)}
                value={formData.businessType}
              >
                <SelectTrigger
                  className="w-full"
                  id="businessType"
                  name="businessType"
                >
                  <SelectValue placeholder="Select Business Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">Solo</SelectItem>
                  <SelectItem value="proprietorship">Proprietorship</SelectItem>
                  <SelectItem value="llc">LLC</SelectItem>
                  <SelectItem value="corporation">Corporation</SelectItem>
                </SelectContent>
              </Select>
              {errors?.businessType && (
                <p className="text-red-500 text-sm">{errors.businessType}</p>
              )}
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="incorporationDate">Incorporation Date</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between text-gray-500 font-normal"
                  >
                    {formData.incorporationDate
                      ? formData.incorporationDate.toLocaleDateString()
                      : "Select Date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.incorporationDate}
                    captionLayout="dropdown"
                    disabled={{ after: new Date() }}
                    onSelect={(date: Date | undefined) => {
                      handleChange("incorporationDate", date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              {errors?.incorporationDate && (
                <p className="text-red-500 text-sm">
                  {errors.incorporationDate}
                </p>
              )}
            </div>
            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="einNumber">EIN Number</Label>
              <InputOTP
                maxLength={9}
                value={String(formData.einNumber ?? "")}
                onChange={(value) => handleChange("einNumber", value)}
                readOnly={isReadOnly}
                className="text-black"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                  <InputOTPSlot index={6} />
                  <InputOTPSlot index={7} />
                  <InputOTPSlot index={8} />
                </InputOTPGroup>
              </InputOTP>
              {errors?.einNumber && (
                <p className="text-red-500 text-sm">{errors.einNumber}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {!isControlled && (
          <Button onClick={handleSave} className="ml-auto" disabled={updateCompanyMutation.isPending}>
            {updateCompanyMutation.isPending ? "Saving..." : "Save"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CompanyInformation;
