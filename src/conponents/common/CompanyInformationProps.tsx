/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardTitle } from "../../components/ui/card";
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
import { type CompanyData } from "../../types/company";
import { cn } from "@/lib/utils";

interface CompanyInformationProps {
  data: Pick<
    CompanyData,
    | "businessName"
    | "website"
    | "dbaName"
    | "legalEntityName"
    | "einNumber"
    | "businessType"
    | "incorporationDate"
  >;
  onUpdate: (key: keyof CompanyData, value: any) => void;
  errors?: Record<string, string>;
  readOnly: boolean | any;
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
}

const CompanyInformation = ({
  data,
  onUpdate,
  errors,
  readOnly,
  open,
  setOpen,
  className,
}: CompanyInformationProps) => {
  const isReadOnly = readOnly === true;

  return (
    <Card className={cn(className)}>
      <CardContent>
        <div className="flex flex-col  gap-6">
          <CardTitle>Company Information</CardTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                name="businessName"
                id="businessName"
                placeholder="Enter Business Name"
                type="text"
                value={data.businessName}
                onChange={(e) => onUpdate("businessName", e.target.value)}
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
                  value={data.website.replace("https://", "")}
                  onChange={(e) =>
                    onUpdate("website", `https://${e.target.value}`)
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
                value={data.dbaName}
                readOnly={isReadOnly}
                onChange={(e) => onUpdate("dbaName", e.target.value)}
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
                value={data.legalEntityName}
                onChange={(e) => onUpdate("legalEntityName", e.target.value)}
                required
              />
              {errors?.legalEntityName && (
                <p className="text-red-500 text-sm">{errors.legalEntityName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2  gap-3">
            <div className="col-span-1  flex flex-col items-start justify-center gap-3">
              <Label htmlFor="businessType">Business Type</Label>
              <Select
                onValueChange={(value) => onUpdate("businessType", value)}
                value={data.businessType}
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

            <div className="col-span-1  flex flex-col items-start justify-center gap-3">
              <Label htmlFor="incorporationDate">Incorporation Date</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between text-gray-500 font-normal"
                  >
                    {data.incorporationDate
                      ? data.incorporationDate.toLocaleDateString()
                      : "Select Date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={data.incorporationDate}
                    captionLayout="dropdown"
                    disabled={{ after: new Date() }}
                    onSelect={(date: Date | undefined) => {
                      onUpdate("incorporationDate", date);
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
                value={String(data.einNumber ?? "")}
                onChange={(value) => onUpdate("einNumber", value)}
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
    </Card>
  );
};

export default CompanyInformation;
