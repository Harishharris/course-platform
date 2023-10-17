"use client";

import toast from "react-hot-toast";

import { OurFileRouter, ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <>
      <UploadDropzone<OurFileRouter>
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].fileUrl);
        }}
        onUploadError={() => alert("OOPS")}
      />
    </>
  );
};
