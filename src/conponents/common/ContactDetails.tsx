/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { type CompanyData } from "../../types/company";

interface ContactDetailsProps {
    data: Pick<CompanyData, 'contactName' | 'primaryEmail' | 'primaryPhoneNumber' | 'instagramLink' | 'youtubeLink' | 'facebookLink'>;
    onUpdate: (key: keyof CompanyData, value: any) => void;
}

const ContactDetails = ({ data, onUpdate }: ContactDetailsProps) => {
    return (
       <Card>
         <CardContent >
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
                            onChange={(e) => onUpdate('contactName', e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-span-1 flex flex-col items-start justify-center gap-3">
                        <Label htmlFor="primaryEmail">Primary Email</Label>
                        <Input
                            name="primaryEmail"
                            id="primaryEmail"
                            placeholder="Enter Primary Email"
                            type="email"
                            value={data.primaryEmail}
                            onChange={(e) => onUpdate('primaryEmail', e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-span-1 flex flex-col items-start justify-center gap-3">
                        <Label htmlFor="primaryPhoneNumber">Primary phone number</Label>
                        <Input
                            name="primaryPhoneNumber"
                            id="primaryPhoneNumber"
                            placeholder="Enter Primary Phone Number"
                            type="tel"
                            value={data.primaryPhoneNumber}
                            onChange={(e) => onUpdate('primaryPhoneNumber', e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                    <div className="col-span-1 flex flex-col items-start justify-center gap-3">
                        <Label htmlFor="instagramLink">Instagram Link</Label>
                        <Input
                            name="instagramLink"
                            id="instagramLink"
                            placeholder="Enter Instagram Link"
                            type="text"
                            value={data.instagramLink}
                            onChange={(e) => onUpdate('instagramLink', e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-span-1 flex flex-col items-start justify-center gap-3">
                        <Label htmlFor="youtubeLink">Youtube Link</Label>
                        <Input
                            placeholder="Enter Youtube Link"
                            name="youtubeLink"
                            id="youtubeLink"
                            type="text"
                            value={data.youtubeLink}
                            onChange={(e) => onUpdate('youtubeLink', e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-span-1 flex flex-col items-start justify-center gap-3">
                        <Label htmlFor="facebookLink">Facebook Link</Label>
                        <Input
                            name="facebookLink"
                            id="facebookLink"
                            placeholder="Enter Facebook Link"
                            type="text"
                            value={data.facebookLink}
                            onChange={(e) => onUpdate('facebookLink', e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>
        </CardContent>
       </Card>
    );
};

export default ContactDetails;