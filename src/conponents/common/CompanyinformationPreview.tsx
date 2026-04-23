import { Button, Card, CardContent, CardTitle, Label } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { CompanyDataPreview, CompanyDataPreviewItem } from "@/types/company";
import { Link } from "react-router-dom";

export const CompanyDetailsPreviewCard = ({
    title,
    data,
    className,
    editLink,
}: CompanyDataPreview) => {
    return (
        <Card className={cn(className)}>
            <CardContent className="flex flex-col  gap-6">
                <CardPreviewHeader title={title} editLink={editLink} />
                <CardPreviewData data={data} />
            </CardContent>
        </Card>
    )
}


export const CompanyOwnersPreviewCard = ({
    title,
    data,
    className,
    editLink,
}: {
    title: string;
    data: any[];
    className?: string;
    editLink?: string;
}) => {
    return (
        <Card className={cn(className)}>
            <CardContent className="flex flex-col  gap-6">
                <CardPreviewHeader title={title} editLink={editLink} />

                <div className=" divide-y flex flex-col">
                    {
                        data.map((owner: any, index: number) => {
                            return (
                                <div key={index} className=" py-4">
                                    <p className="text-primary font-semibold mb-3"># {index + 1}</p>
                                    <CardPreviewData key={index} data={[
                                        {
                                            label: "First Name",
                                            value: owner.firstName,
                                        },
                                        {
                                            label: "Last Name",
                                            value: owner.lastName,
                                        },
                                        {
                                            label: "SSN",
                                            value: owner.ssnNumber,
                                        },
                                        {
                                            label: "Ownership Percentage",
                                            value: `${owner.ownershipPercentage} %`,
                                        },
                                        {
                                            label: "Street Address Line 1",
                                            value: owner.streetAddressLine1,
                                        },
                                        {
                                            label: "Street Address Line 2",
                                            value: owner.streetAddressLine2,
                                        },
                                        {
                                            label: "City",
                                            value: owner.city,
                                        },
                                        {
                                            label: "State",
                                            value: owner.state,
                                        },
                                        {
                                            label: "Zip Code",
                                            value: owner.zipcode,
                                        },
                                        {
                                            label: "Country",
                                            value: owner.country,
                                        },
                                        {
                                            label: "Authorized Signature",
                                            value: owner.isAuthorizedSignature ? "Yes" : "No",
                                        },

                                    ]} />
                                </div>
                            )
                        })
                    }
                </div>
            </CardContent>
        </Card>
    )
}

const CardPreviewHeader = ({ title, editLink }: { title: string, editLink?: string }) => {
    return (
        <CardTitle className=" flex gap-2 items-center justify-between">
            <p>{title}</p>

            {editLink && <Link to={`/company-profile/${editLink}`}>
                <Button variant={"outline"} className="w-fit border-primary text-primary font-semibold rounded-full ml-auto">Edit</Button>
            </Link>}

        </CardTitle>
    )
}



const CardPreviewData = ({ data }: { data: CompanyDataPreviewItem[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-y-6">
            {
                data.map((item: CompanyDataPreviewItem) => (
                    <CardLabelValue key={item.label} label={item.label} value={item.value} type={item?.type} />
                ))
            }
        </div>
    )
}

const CardLabelValue = ({ label, value, type = "text" }: CompanyDataPreviewItem) => {
    return (
        <div className="col-span-1 flex flex-col items-start justify-center gap-1.5">
            <Label htmlFor={label}>{label}</Label>
            {type === "date" ? <p>{new Date(value as Date).toLocaleDateString()}</p> : type === "number" ? <p>{value as number}</p> : type === "link" ? <a className="max-w-xs truncate" href={value as string} target="_blank" rel="noopener noreferrer">{value as string}</a> : <p>{value as string}</p>}
        </div>
    )
}