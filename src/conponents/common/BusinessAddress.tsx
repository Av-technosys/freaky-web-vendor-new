/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { type CompanyData } from "../../types/company";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { cn } from "@/lib/utils";
import { US_STATES } from "@/const/usState";

interface BusinessAddressProps {
  data: Pick<
    CompanyData,
    "address1" | "address2" | "country" | "state" | "city" | "zipCode"
  >;
  onUpdate: (key: keyof CompanyData, value: any) => void;
  errors?: any;
  className?: string;
}

const BusinessAddress = ({
  data,
  onUpdate,
  errors,
  className,
}: BusinessAddressProps) => {
  return (
    <Card className={cn(className)}>
      <CardContent>
        <CardTitle className="mb-5">Business Address</CardTitle>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="address1">Street Address Line 1</Label>
              <Input
                name="address1"
                id="address1"
                placeholder="Enter Street Address Line 1"
                type="text"
                value={data.address1}
                onChange={(e) => onUpdate("address1", e.target.value)}
                required
              />
              {errors?.streetAddressLine1 && (
                <p className="text-red-500 text-sm">
                  {errors.streetAddressLine1}
                </p>
              )}
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="address2">Street Address Line 2</Label>
              <Input
                name="address2"
                id="address2"
                placeholder="Enter Street Address Line 2"
                type="text"
                value={data.address2}
                onChange={(e) => onUpdate("address2", e.target.value)}
                required
              />
              {errors?.streetAddressLine2 && (
                <p className="text-red-500 text-sm">
                  {errors.streetAddressLine2}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="country">Country</Label>

              <Select
                value={data.country || "united_states"}
                onValueChange={() => {}} // prevents selecting anything else
                //   disabled   // disables dropdown opening
              >
                <SelectTrigger className="w-full" id="country">
                  <SelectValue placeholder="United States" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="united_states">United States</SelectItem>
                </SelectContent>
              </Select>
              {errors?.country && (
                <p className="text-red-500 text-sm">{errors.country}</p>
              )}
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="state">State</Label>

              <Select
                value={data.state}
                onValueChange={(value) => onUpdate("state", value)}
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
              {errors?.state && (
                <p className="text-red-500 text-sm">{errors.state}</p>
              )}
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="city">City</Label>
              <Input
                name="city"
                id="city"
                placeholder="Enter City"
                type="text"
                value={data.city}
                onChange={(e) => onUpdate("city", e.target.value)}
                required
              />
              {errors?.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                placeholder="Enter Zip Code"
                name="zipCode"
                id="zipCode"
                type="number"
                value={data.zipCode}
                onChange={(e) => onUpdate("zipCode", e.target.value)}
                required
              />
              {errors?.zipcode && (
                <p className="text-red-500 text-sm">{errors.zipcode}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessAddress;
