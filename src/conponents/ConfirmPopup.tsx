"use client";

import { TriangleAlertIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../components/ui/alert-dialog";

import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

interface ConfirmPopupProps {
    children: React.ReactNode;
    title?: string;
    alertTitle?: string;
    description?: string;
    icon?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
}

export default function ConfirmPopup({
    children,
    title = "Are you absolutely sure?",
    alertTitle = "Warning",
    description = "Deleting a member will remove their access to the team and all associated data.",
    icon = <TriangleAlertIcon />,
    confirmText = "Delete",
    cancelText = "Cancel",
    onConfirm = () => { },
}: ConfirmPopupProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>

                    <AlertDialogDescription>
                        <Alert className="bg-destructive/10 text-destructive border-none">
                            {icon}
                            <AlertTitle>{alertTitle}</AlertTitle>
                            <AlertDescription className="text-destructive/80">
                                {description}
                            </AlertDescription>
                        </Alert>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-destructive hover:bg-destructive/80"
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
