import { useState, useRef } from 'react';
import { Card, CardContent, CardTitle, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { type Document } from "../../types/company";
import {  Upload, FileText, Trash2, CheckIcon } from "lucide-react";
import { Avatar, AvatarFallback, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../../components/ui';

interface DocumentUploadProps {
  documents: Document[];
  onUploadDocument: (documentId: string, file: File) => void;
  onRemoveDocumentFile: (documentId: string, fileId: string) => void;
}

const DocumentUpload = ({
  documents,
  onUploadDocument,
  onRemoveDocumentFile
}: DocumentUploadProps) => {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getDocumentDisplayName = (type: string) => {
    const names: { [key: string]: string } = {
      business_license: 'Business License',
      tax_certificate: 'Tax Certificate', 
      ownership_proof: 'Proof of Ownership',
      bank_statement: 'Bank Statement'
    };
    return names[type] || type;
  };

const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, documentId: string) => {
  const file = event.target.files?.[0];
  if (file) {
    onUploadDocument(documentId, file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }
};

  const handleUploadClick = (documentId: string) => {
    setSelectedDoc(documentId);
    fileInputRef.current?.click();
  };

  const getSelectedDocument = () => {
    return documents.find(doc => doc.id === selectedDoc);
  };

  return (
    <Card className="mb-2">
      <CardHeader>
        <CardTitle>Required Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Document List */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="font-semibold text-lg mb-4">Documents</h3>
  <DropdownMenu>
  <DropdownMenuTrigger className='bg-secondary flex items-center gap-2 rounded-lg px-3 py-2.5'>
    <Avatar>
      <AvatarFallback className='text-xs'>
        {selectedDoc ? getDocumentDisplayName(getSelectedDocument()?.type || '')[0] : 'D'}
      </AvatarFallback>
    </Avatar>

    <span className="text-sm font-medium">
      {selectedDoc ? getDocumentDisplayName(getSelectedDocument()?.type || '') : "Select Document"}
    </span>
  </DropdownMenuTrigger>

  <DropdownMenuContent align='start' className='w-56'>
    <DropdownMenuLabel>Select Document</DropdownMenuLabel>

    {documents.map((doc) => (
      <DropdownMenuItem
        key={doc.id}
        onClick={() => setSelectedDoc(doc.id)}
        className="flex items-center gap-2"
      >
        <div className="flex flex-col">
          <span className="font-medium text-sm">
            {getDocumentDisplayName(doc.type)}
          </span>
        </div>

        {/* Check icon for selected one */}
        {selectedDoc === doc.id && <CheckIcon className="ml-auto h-4 w-4" />}
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>

              
          
          </div>

          {/* Right Column - Upload Area & File List */}
          <div className="lg:col-span-2">
            {selectedDoc ? (
              <div className="space-y-6">
                {/* Upload Section */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-lg mb-2">
                      Upload {getDocumentDisplayName(getSelectedDocument()?.type || 'Document')}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Supported formats: PDF, JPG, PNG (Max 10MB)
                    </p>
                    
                    {getSelectedDocument() && getSelectedDocument()!.files.length < getSelectedDocument()!.maxFiles ? (
                      <Button
                        onClick={() => handleUploadClick(selectedDoc)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {getSelectedDocument()!.files.length === 0 ? 'Upload File' : 'Add Another File'}
                      </Button>
                    ) : (
                      <p className="text-red-500 text-sm">
                        Maximum {getSelectedDocument()!.maxFiles} files reached
                      </p>
                    )}
                    
                    {/* Show file count only when files exist */}
                    {getSelectedDocument() && getSelectedDocument()!.files.length > 0 && (
                      <div className="text-xs text-gray-500 mt-2">
                        {getSelectedDocument()!.files.length} file{getSelectedDocument()!.files.length > 1 ? 's' : ''} uploaded
                        {getSelectedDocument()!.files.length < getSelectedDocument()!.maxFiles && 
                          ` (can add ${getSelectedDocument()!.maxFiles - getSelectedDocument()!.files.length} more)`
                        }
                      </div>
                    )}
                  </div>
                  
                  {/* Hidden file input */}
                  <Input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileSelect(e, selectedDoc)}
                  />
                </div>

                {/* Uploaded Files List */}
                {getSelectedDocument() && getSelectedDocument()!.files.length > 0 && (
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-3">Uploaded Files</h3>
                    <div className="space-y-3">
                      {getSelectedDocument()!.files.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <FileText className="h-4 w-4 text-green-500" />
                            <div>
                              <p className="font-medium text-sm">{file.fileName}</p>
                              <p className="text-xs text-gray-500">
                                Uploaded {file.uploadedAt?.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveDocumentFile(selectedDoc, file.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center h-full flex items-center justify-center">
                <div>
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Select a document</h3>
                  <p className="text-gray-600">
                    Click on a document from the list to manage files
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upload Progress Summary */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <Label className="font-semibold">Overall Progress</Label>
            <span className="text-sm text-gray-600">
              {documents.filter(d => d.files.length > 0).length} of {documents.length} document types completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{
                width: `${(documents.filter(d => d.files.length > 0).length / documents.length) * 100}%`
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;