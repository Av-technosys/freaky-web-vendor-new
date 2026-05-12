import type { Owner } from "./company";

export interface OwnershipInformationProps {
    data?: {
        owners: Owner[];
        authorizedSignatory: number;
        businessType: string;
    };
    onUpdateOwner?: (index: number, field: keyof Owner, value: string) => void;
    onUpdateAuthorizedSignatory?: (index: number) => void;
    onAddOwner?: () => void;
    onRemoveOwner?: (index: number) => void;
    errors?: any;
    className?: string;
    readOnly?: boolean;
}