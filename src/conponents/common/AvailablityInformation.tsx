/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { DAYS_OF_WEEK } from "@/const";
import { useGetVendorAvailability, useUpdateCompanyAvailability } from "@/services";



type WorkingHour = {
    id?: number;
    vendorId?: number;
    dayOfWeek: number;
    isOpen: boolean;
    openTime: string;
    closeTime: string;
    timezone: string;
};

type WorkingHoursProps = {
    className?: string;
    readOnly?: boolean;
};

const defaultWorkingHours: WorkingHour[] = DAYS_OF_WEEK.map((day) => ({
    dayOfWeek: day.value,
    isOpen: false,
    openTime: "09:00",
    closeTime: "18:00",
    timezone: "Asia/Kolkata",
}));

const CompanyAvailability = ({
    className,
    readOnly = false,
}: WorkingHoursProps) => {
    const {
        data: vendorAvailability,
        isPending: isVendorAvailabilityPending,
    } = useGetVendorAvailability();

    const [workingHours, setWorkingHours] =
        useState<WorkingHour[]>(defaultWorkingHours);
    const UpdateCompanyAvailability = useUpdateCompanyAvailability();

    useEffect(() => {
        const apiData = vendorAvailability?.data;

        if (Array.isArray(apiData) && apiData.length > 0) {
            const merged = defaultWorkingHours.map((defaultDay) => {
                const existing = apiData.find(
                    (item: WorkingHour) =>
                        item.dayOfWeek === defaultDay.dayOfWeek
                );

                return existing
                    ? {
                        ...defaultDay,
                        ...existing,
                    }
                    : defaultDay;
            });

            setWorkingHours(merged);
        }
    }, [vendorAvailability]);

    const handleUpdate = (
        index: number,
        field: keyof WorkingHour,
        value: any
    ) => {
        setWorkingHours((prev) => {
            const updated = [...prev];

            updated[index] = {
                ...updated[index],
                [field]: value,
            };

            return updated;
        });
    };

    const handleSave = () => {
        console.log("Updated Working Hours:", workingHours);
        UpdateCompanyAvailability.mutateAsync(workingHours);
    };

    if (isVendorAvailabilityPending) {
        return <div>Loading...</div>;
    }

    return (
        <Card className={cn(className)}>
            <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                    <CardTitle>Working Hours</CardTitle>

                    <Button onClick={handleSave} disabled={readOnly}>
                        Save
                    </Button>
                </div>

                <div className="flex flex-col gap-4">
                    {workingHours.map((item, index) => {
                        const day = DAYS_OF_WEEK.find(
                            (d) => d.value === item.dayOfWeek
                        );

                        return (
                            <div
                                key={item.dayOfWeek}
                                className="border rounded-xl p-4 grid grid-cols-4 gap-4"
                            >
                                {/* Day */}
                                <div className="w-full ">
                                    <h2 className="font-semibold text-base">
                                        {day?.label}
                                    </h2>
                                </div>

                                {/* Switch */}
                                <div className="flex items-center gap-3">
                                    <Label>Open</Label>

                                    <Switch
                                        checked={item.isOpen}
                                        onCheckedChange={(value: any) =>
                                            handleUpdate(index, "isOpen", value)
                                        }
                                        disabled={readOnly}
                                    />
                                </div>

                                {/* Open Time */}
                                <div className="flex flex-col gap-2 w-full ">
                                    <Label>Open Time</Label>

                                    <Input
                                        type="time"
                                        value={item.openTime}
                                        onChange={(e) =>
                                            handleUpdate(index, "openTime", e.target.value)
                                        }
                                        disabled={!item.isOpen || readOnly}
                                    />
                                </div>

                                {/* Close Time */}
                                <div className="flex flex-col gap-2 w-full ">
                                    <Label>Close Time</Label>

                                    <Input
                                        type="time"
                                        value={item.closeTime}
                                        onChange={(e) =>
                                            handleUpdate(index, "closeTime", e.target.value)
                                        }
                                        disabled={!item.isOpen || readOnly}
                                    />
                                </div>

                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default CompanyAvailability;