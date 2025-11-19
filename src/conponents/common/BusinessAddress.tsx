/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { type CompanyData } from "../../types/company";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

interface BusinessAddressProps {
    data: Pick<CompanyData, 'address1' | 'address2' | 'country' | 'state' | 'city' | 'zipCode'>;
    onUpdate: (key: keyof CompanyData, value: any) => void;
}
const US_STATES = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
];

const BusinessAddress = ({ data, onUpdate }: BusinessAddressProps) => {
    return (
      <Card>
          <CardContent >
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
                            onChange={(e) => onUpdate('address1', e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-span-1 flex flex-col items-start justify-center gap-3">
                        <Label htmlFor="address2">Street Address Line 2</Label>
                        <Input
                            name="address2"
                            id="address2"
                            placeholder="Enter Street Address Line 2"
                            type="text"
                            value={data.address2}
                            onChange={(e) => onUpdate('address2', e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="col-span-1 flex flex-col items-start justify-center gap-3">
                        <Label htmlFor="country">Country</Label>

                        <Select
                            value={data.country || "united_states"}
                            onValueChange={() => { }} // prevents selecting anything else
                        //   disabled   // disables dropdown opening
                        >
                            <SelectTrigger id="country">
                                <SelectValue placeholder="United States" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="united_states">United States</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="col-span-1 flex flex-col items-start justify-center gap-3">
                        <Label htmlFor="state">State</Label>

                        <Select
                            value={data.state}
                            onValueChange={(value) => onUpdate("state", value)}
                        >
                            <SelectTrigger id="state" name="state">
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
                    </div>


                    <div className="col-span-1 flex flex-col items-start justify-center gap-3">
                        <Label htmlFor="city">City</Label>
                        <Input
                            name="city"
                            id="city"
                            placeholder="Enter City"
                            type="text"
                            value={data.city}
                            onChange={(e) => onUpdate('city', e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-span-1 flex flex-col items-start justify-center gap-3">
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input
                            placeholder="Enter Zip Code"
                            name="zipCode"
                            id="zipCode"
                            type="number"
                            value={data.zipCode}
                            onChange={(e) => onUpdate('zipCode', e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    );
};

export default BusinessAddress;