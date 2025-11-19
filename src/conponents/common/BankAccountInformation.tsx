/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardContent, CardTitle, CardFooter, Card } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { type CompanyData } from "../../types/company";

interface BankAccountInformationProps {
    data: Pick<CompanyData, 'accountNumber' | 'bankName' | 'payeeName' | 'routingNumber' | 'bankType'>;
    onUpdate: (key: keyof CompanyData, value: any) => void;
    onPrevious: () => void;
    onSave: () => void;
}

const BankAccountInformation = ({ data, onUpdate, onPrevious, onSave }: BankAccountInformationProps) => {
    return (
        <Card>
            <CardContent >
            <CardTitle className="mb-5">Bank Account Information</CardTitle>

            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="col-span-1 flex flex-col items-start justify-center gap-3">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                            name="accountNumber"
                            id="accountNumber"
                            placeholder="Enter Account Number"
                            type="text"
                            value={data.accountNumber}
                            onChange={(e) => onUpdate('accountNumber', e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-span-1 flex flex-col items-start justify-center gap-3">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input
                            name="bankName"
                            id="bankName"
                            placeholder="Enter Bank Name"
                            type="text"
                            value={data.bankName}
                            onChange={(e) => onUpdate('bankName', e.target.value)}
                            required
                        />
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
                            value={data.payeeName}
                            onChange={(e) => onUpdate('payeeName', e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-span-1 flex flex-col items-start justify-center gap-3">
                        <Label htmlFor="routingNumber">Routing Number (ABA)</Label>
                        <Input
                            placeholder="Enter Routing Number (ABA)"
                            name="routingNumber"
                            id="routingNumber"
                            type="text"
                            value={data.routingNumber}
                            onChange={(e) => onUpdate('routingNumber', e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="col-span-1 flex flex-col items-start justify-center gap-3">
                        <Label htmlFor="bankType">Bank Type</Label>
                        <Select
                            value={data.bankType}
                            onValueChange={(value) => onUpdate('bankType', value)}
                        >
                            <SelectTrigger id="bankType" name="bankType">
                                <SelectValue placeholder="Select Bank Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="business_saving">Business Saving</SelectItem>
                                <SelectItem value="business_checking">Business Checking</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <CardFooter className="flex gap-3 items-center justify-center md:justify-end mt-6">
                <Button variant="outline" onClick={onPrevious}>
                    Previous
                </Button>
                <Button onClick={onSave}>Save & Next</Button>
            </CardFooter>
        </CardContent>
        </Card>
    );
};

export default BankAccountInformation;