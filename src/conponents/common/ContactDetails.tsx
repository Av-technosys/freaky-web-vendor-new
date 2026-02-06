/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { type CompanyData } from "../../types/company";
import { cn } from "@/lib/utils";

interface ContactDetailsProps {
  data: Pick<
    CompanyData,
    | "contactName"
    | "primaryEmail"
    | "primaryPhoneNumber"
    | "instagramLink"
    | "youtubeLink"
    | "facebookLink"
    | "linkedinLink"
  >;
  onUpdate: (key: keyof CompanyData, value: any) => void;
  errors?: any;
  className?: string;
}

const ContactDetails = ({
  data,
  onUpdate,
  errors,
  className,
}: ContactDetailsProps) => {
  return (
    <Card className={cn(className)}>
      <CardContent>
        <CardTitle className="mb-5">Contact Details</CardTitle>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="contactName">Contact Name</Label>
              <Input
                name="contactName"
                id="contactName"
                placeholder="Enter Contact Name"
                type="text"
                value={data.contactName}
                onChange={(e) => onUpdate("contactName", e.target.value)}
                required
              />
              {errors?.primaryContactName && (
                <p className="text-red-500 text-sm">
                  {errors.primaryContactName}
                </p>
              )}
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="primaryEmail">Primary Email</Label>
              <Input
                name="primaryEmail"
                id="primaryEmail"
                placeholder="Enter Primary Email"
                type="email"
                value={data.primaryEmail}
                onChange={(e) => onUpdate("primaryEmail", e.target.value)}
                required
              />
              {errors?.primaryEmail && (
                <p className="text-red-500 text-sm">{errors.primaryEmail}</p>
              )}
            </div>

            <div className="col-span-2 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="primaryPhoneNumber">Primary phone number</Label>
              <Input
                name="primaryPhoneNumber"
                id="primaryPhoneNumber"
                placeholder="Enter Primary Phone Number"
                type="tel"
                value={data.primaryPhoneNumber}
                onChange={(e) => onUpdate("primaryPhoneNumber", e.target.value)}
                required
              />
              {errors?.primaryPhoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.primaryPhoneNumber}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2 font-bold text-sm">Social Links </div>
            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="instagramLink">Instagram Link</Label>
              <Input
                name="instagramLink"
                id="instagramLink"
                placeholder="Enter Instagram Link"
                type="text"
                value={data.instagramLink}
                onChange={(e) => onUpdate("instagramLink", e.target.value)}
                required
              />
              {errors?.instagramURL && (
                <p className="text-red-500 text-sm">{errors.instagramURL}</p>
              )}
            </div>
            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="instagramLink">Linkedin Link</Label>
              <Input
                name="linkedinLink"
                id="linkedinLink"
                placeholder="Enter Linkedin Link"
                type="text"
                value={data.linkedinLink}
                onChange={(e) => onUpdate("linkedinLink", e.target.value)}
                required
              />
              {errors?.linkedinURL && (
                <p className="text-red-500 text-sm">{errors.linkedinURL}</p>
              )}
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="youtubeLink">Youtube Link</Label>
              <Input
                placeholder="Enter Youtube Link"
                name="youtubeLink"
                id="youtubeLink"
                type="text"
                value={data.youtubeLink}
                onChange={(e) => onUpdate("youtubeLink", e.target.value)}
                required
              />
              {errors?.youtubeURL && (
                <p className="text-red-500 text-sm">{errors.youtubeURL}</p>
              )}
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="facebookLink">Facebook Link</Label>
              <Input
                name="facebookLink"
                id="facebookLink"
                placeholder="Enter Facebook Link"
                type="text"
                value={data.facebookLink}
                onChange={(e) => onUpdate("facebookLink", e.target.value)}
                required
              />
              {errors?.facebookURL && (
                <p className="text-red-500 text-sm">{errors.facebookURL}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactDetails;
