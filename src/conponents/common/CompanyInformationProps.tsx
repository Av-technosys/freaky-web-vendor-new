/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../../components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
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
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CompanyInformation = ({
  data,
  onUpdate,
  open,
  setOpen,
}: CompanyInformationProps) => {
  return (
    <Card>
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
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="website">Website</Label>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>https://</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="example.com"
                  value={data.website.replace("https://", "")}
                  onChange={(e) =>
                    onUpdate("website", `https://${e.target.value}`)
                  }
                />
              </InputGroup>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="dbaName">DBA Name</Label>
              <Input
                name="dbaName"
                id="dbaName"
                type="text"
                value={data.dbaName}
                onChange={(e) => onUpdate("dbaName", e.target.value)}
                required
              />
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="legalEntityName">Legal Entity Name</Label>
              <Input
                name="legalEntityName"
                id="legalEntityName"
                type="text"
                value={data.legalEntityName}
                onChange={(e) => onUpdate("legalEntityName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="einNumber">EIN Number</Label>
              <InputOTP
                maxLength={9}
                value={data.einNumber}
                onChange={(value) => onUpdate("einNumber", value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                </InputOTPGroup>
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
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
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
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="incorporationDate">Incorporation Date</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between font-normal"
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
                    onSelect={(date: Date | undefined) => {
                      onUpdate("incorporationDate", date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyInformation;
