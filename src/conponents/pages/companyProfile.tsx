import { useState } from "react";
import profileImage from "../../assets/testingProfilePicture.jpg";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
} from "../../components/ui";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../../components/ui/input-group";
import DropdownSelector from "../dropdownSelector";
import { TiIconCameraFilled } from "../icons";

const dropdownValues = {
  Title: "Working Time",
  options: [
    {
      label: "8:00 am - 10:00 pm",
      value: "8:00 am - 10:00 pm",
    },
    {
      label: "10:00 am - 12:00 pm",
      value: "10:00 am - 12:00 pm",
    },
    {
      label: "12:00 pm - 02:00 am",
      value: "12:00 pm - 02:00 am",
    },
  ],
};

const CompanyProfile = () => {
  const [time, setTime] = useState(dropdownValues.options[0].label);

  function handleTimeChange(value: any) {
    setTime(value.label);
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4  gap-3">
      <Card className="col-span-1 order-2 my-2 lg:col-span-3 ">
        <CardContent>
          {/* <Card */}
          <div className="flex flex-col gap-6">
            <CardTitle>Company Information</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  name="businessName"
                  id="businessName"
                  placeholder="Enter Business Name"
                  type="text"
                  required
                />
              </div>
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="Website">Website</Label>
                {/* <Input
                name="Website"
                id="Website"
                placeholder="https://"
                type="text"
                required
              /> */}

                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>https://</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput placeholder="example.com" />
                </InputGroup>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="DBAName">DBA Name</Label>
                <Input name="DBAName" id="DBAName" type="text" required />
              </div>
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="serviceLine">Service Line</Label>
                <Input
                  name="serviceLine"
                  id="serviceLine"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="incorporationYear">Incorporation Year</Label>
                <Input
                  name="incorporationYear"
                  id="incorporationYear"
                  type="text"
                  required
                />
              </div>
              <DropdownSelector
                values={dropdownValues}
                selectedValue={time}
                onChange={handleTimeChange}
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-3">
              <Label htmlFor="message-2">Description</Label>
              <Textarea
                placeholder="Describe Your Service"
                className="min-h-[150px]"
                id="message-2"
              />
            </div>
          </div>
          {/* <h1 className="text-base my-5 md:my-7 text-[#111827s] font-bold">
         
          </h1> */}
          <CardTitle className="mb-5 mt-12">Contact Details</CardTitle>
          <div className="flex mt-3 flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  name="contactName"
                  id="contactName"
                  placeholder="Enter Contact Name"
                  type="text"
                  required
                />
              </div>
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  name="contactEmail"
                  id="contactEmail"
                  placeholder="Enter Contact Email"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1  gap-5">
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="instagramLink">Instagram Link</Label>
                <Input
                  name="instagramLink"
                  id="instagramLink"
                  placeholder="Enter Instagram Link"
                  type="text"
                  required
                />
              </div>
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="youtubeLink">Youtube Link</Label>
                <Input
                  placeholder="Enter Youtube Link"
                  name="youtubeLink"
                  id="youtubeLink"
                  type="text"
                  required
                />
              </div>
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="facebookLink">Facebook Link</Label>
                <Input
                  name="facebookLink"
                  id="facebookLink"
                  placeholder="Enter Facebook Link"
                  type="text"
                  required
                />
              </div>
            </div>
          </div>

          {/* <h1 className="text-base my-5 md:my-7 text-[#111827s] font-bold">
            
          </h1> */}
          <CardTitle className="mb-5 mt-12">Business Address</CardTitle>

          <div className="flex mt-3 flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="addresslane1">Address Lane 1</Label>
                <Input
                  name="addresslane1"
                  id="addresslane1"
                  placeholder="Enter Address Lane 1"
                  type="text"
                  required
                />
              </div>
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="addresslane2">Address Lane 2</Label>
                <Input
                  name="addresslane2"
                  id="addresslane2"
                  placeholder="Enter Address Lane 2"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="city">City</Label>
                <Input
                  name="city"
                  id="city"
                  placeholder="Enter City"
                  type="text"
                  required
                />
              </div>
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="state">State</Label>
                <Input
                  placeholder="Enter State"
                  name="state"
                  id="state"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="country">Country</Label>
                <Input
                  placeholder="Enter Country"
                  name="country"
                  id="country"
                  type="text"
                  required
                />
              </div>
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  placeholder="Enter Postal Code"
                  name="postalCode"
                  id="postalCode"
                  type="text"
                  required
                />
              </div>
            </div>
          </div>

          {/* <h1 className="text-base my-5  md:my-7 text-[#111827s] font-bold">
            
          </h1> */}
          <CardTitle className="mb-5 mt-12">Ownership Information</CardTitle>

          <div className="flex mt-3 flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="ownerFirstName">Owner's First Name</Label>
                <Input
                  name="ownerFirstName"
                  id="ownerFirstName"
                  placeholder="Enter Owner's First Name"
                  type="text"
                  required
                />
              </div>
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="ownerSecondName">Owner's Second Name</Label>
                <Input
                  name="ownerSecondName"
                  id="ownerSecondName"
                  placeholder="Enter Owner's Second Name"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="ssn">SSN</Label>
                <Input
                  name="ssn"
                  id="ssn"
                  placeholder="Enter SSN"
                  type="text"
                  required
                />
              </div>
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="authorizedSignatoryName">
                  Authorized Signatory Name
                </Label>
                <Input
                  placeholder="Enter Authorized Signatory Name"
                  name="authorizedSignatoryName"
                  id="authorizedSignatoryName"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="country">Country</Label>
                <Input
                  placeholder="Enter Country"
                  name="country"
                  id="country"
                  type="text"
                  required
                />
              </div>
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  placeholder="Enter Postal Code"
                  name="postalCode"
                  id="postalCode"
                  type="text"
                  required
                />
              </div>
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="etinNumber">ETIN Number</Label>
                <Input
                  placeholder="Enter ETIN Number"
                  name="etinNumber"
                  id="etinNumber"
                  type="text"
                  required
                />
              </div>
            </div>
          </div>

          {/* <h1 className="text-base my-5 md:my-7 text-[#111827s] font-bold">
            
          </h1> */}
          <CardTitle className="mb-5 mt-12">Bank Account Information</CardTitle>

          <div className="flex mt-3 flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  name="bankName"
                  id="bankName"
                  placeholder="Enter Bank Name"
                  type="text"
                  required
                />
              </div>
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="accountHolderName">Account Holder's Name</Label>
                <Input
                  name="accountHolderName"
                  id="accountHolderName"
                  placeholder="Enter Account Holder's Name"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="accountName">Account Name</Label>
                <Input
                  name="accountName"
                  id="accountName"
                  placeholder="Enter Account Name"
                  type="text"
                  required
                />
              </div>
              <div className="col-span-1  flex flex-col items-start justify-center gap-3">
                <Label htmlFor="routingNumber">Routing Number (ABA)</Label>
                <Input
                  placeholder="Enter Routing Number (ABA)"
                  name="routingNumber"
                  id="routingNumber"
                  type="text"
                  required
                />
              </div>
            </div>
            <CardFooter className="flex gap-3 items-center justify-center md:justify-end">
              <Button variant="outline" type="submit">
                Previous
              </Button>
              <Button type="submit">Save & Next</Button>
            </CardFooter>
          </div>
        </CardContent>
      </Card>
      <Card className=" lg:order-2 items-center text-center lg:sticky lg:top-24  h-fit ">
        <CardHeader className=" w-full">
          <CardTitle className=" text-xl">Company Logo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={profileImage}
              alt="profile-picture"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">
            <TiIconCameraFilled />
            Upload Logo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompanyProfile;
