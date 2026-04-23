import { Card, CardContent, CardFooter, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { useGetVendorDetails } from "@/services/useGetVendorCompanyDetails";
import { useState, useEffect } from "react";
import { useUpdateContactInformation } from "@/services/useCreateOrUpdateCompanyDetails";
import { type CompanyData } from "../../types/company";

interface ContactDetailsProps {
  className?: string;
  data?: Partial<CompanyData>;
  onUpdate?: (key: keyof CompanyData, value: any) => void;
  errors?: Record<string, string>;
  readOnly?: boolean;
}

const ContactDetails = ({ className, data: controlledData, onUpdate, errors, readOnly }: ContactDetailsProps) => {
  const isControlled = !!onUpdate;

  // Hooks should run unconditionally, but we can bypass their effects
  const { data: vendorData, isPending: isApiPending } = useGetVendorDetails();
  const updateContactMutation = useUpdateContactInformation();

  const [localFormData, setLocalFormData] = useState({
    contactName: "",
    primaryEmail: "",
    primaryPhoneNumber: "",
    instagramLink: "",
    youtubeLink: "",
    facebookLink: "",
    linkedinLink: "",
  });

  const isPending = !isControlled && isApiPending;

  useEffect(() => {
    if (!isControlled && vendorData?.data) {
      const data = vendorData.data;
      setLocalFormData({
        contactName: data.primaryContactName || "",
        primaryEmail: data.primaryEmail || data.businessName || "",
        primaryPhoneNumber: data.primaryPhoneNumber || "",
        instagramLink: data.instagramURL || "",
        youtubeLink: data.youtubeURL || "",
        facebookLink: data.facebookURL || "",
        linkedinLink: data.linkedinURL || "",
      });
    }
  }, [vendorData, isControlled]);

  const formData = isControlled && controlledData ? {
    contactName: controlledData.contactName || "",
    primaryEmail: controlledData.primaryEmail || "",
    primaryPhoneNumber: controlledData.primaryPhoneNumber || "",
    instagramLink: controlledData.instagramLink || "",
    youtubeLink: controlledData.youtubeLink || "",
    facebookLink: controlledData.facebookLink || "",
    linkedinLink: controlledData.linkedinLink || "",
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
      primaryContactName: localFormData.contactName,
      primaryEmail: localFormData.primaryEmail,
      primaryPhoneNumber: localFormData.primaryPhoneNumber,
      instagramURL: localFormData.instagramLink,
      youtubeURL: localFormData.youtubeLink,
      facebookURL: localFormData.facebookLink,
      linkedinURL: localFormData.linkedinLink,
    };
    updateContactMutation.mutate(payload);
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Card className={cn(className)}>
      <CardContent>
        <div className="flex justify-between items-center mb-5">
          <CardTitle>Contact Details</CardTitle>

        </div>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="contactName">Contact Name</Label>
              <Input
                name="contactName"
                id="contactName"
                placeholder="Enter Contact Name"
                type="text"
                value={formData.contactName}
                onChange={(e) => handleChange("contactName", e.target.value)}
                required
                readOnly={readOnly}
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
                value={formData.primaryEmail}
                onChange={(e) => handleChange("primaryEmail", e.target.value)}
                required
                readOnly={readOnly}
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
                value={formData.primaryPhoneNumber}
                onChange={(e) => handleChange("primaryPhoneNumber", e.target.value)}
                required
                readOnly={readOnly}
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
                value={formData.instagramLink}
                onChange={(e) => handleChange("instagramLink", e.target.value)}
                required
                readOnly={readOnly}
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
                value={formData.linkedinLink}
                onChange={(e) => handleChange("linkedinLink", e.target.value)}
                required
                readOnly={readOnly}
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
                value={formData.youtubeLink}
                onChange={(e) => handleChange("youtubeLink", e.target.value)}
                required
                readOnly={readOnly}
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
                value={formData.facebookLink}
                onChange={(e) => handleChange("facebookLink", e.target.value)}
                required
                readOnly={readOnly}
              />
              {errors?.facebookURL && (
                <p className="text-red-500 text-sm">{errors.facebookURL}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {!isControlled && (
          <Button onClick={handleSave} className="ml-auto" disabled={updateContactMutation.isPending}>
            {updateContactMutation.isPending ? "Saving..." : "Save"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ContactDetails;
