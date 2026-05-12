import React, { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, X } from "lucide-react";

const AlertDashboardForMonth = () => {
    const [isShown, setIsShown] = useState(true);
    if (!isShown) return <></>
    return (
        <Alert>
            <InfoIcon />
            {/* <AlertTitle>New feature available</AlertTitle> */}
            <AlertDescription className=' w-full flex justify-between gap-4'>
                <p>The displayed data corresponds to the current month.</p>
                <X className=' cursor-pointer' onClick={() => setIsShown(false)} />
            </AlertDescription>
        </Alert>
    )
}

export default AlertDashboardForMonth