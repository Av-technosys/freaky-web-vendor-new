export interface DocumentUploadProps {
    documents?: Document[]; // Optional for hybrid mode
    onUpload?: (documentId: string, file: File) => void;
    onDelete?: (documentId: string, fileId: string) => void;
}

export interface DocumentInput {
    id?: string;
    documentType: string;
    documentUrl: string; // URL string or "choose file"
    file?: File;
    isNew?: boolean;
}