"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { ImagePlus, Loader, Trash } from "lucide-react";

interface ImageUploaderProps {
  disable?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string | null;
  location: string;
}

const ImageUploader = ({
  disable,
  onChange,
  onRemove,
  value,
  location,
}: ImageUploaderProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [onDeleting, setOnDeleting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
  
    const file = acceptedFiles[0];
      onUpload(file);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [],
      },
      multiple: false,
      disabled: disable,
    });

  const onDelete = () => {
    setOnDeleting(true);
    onRemove(value!);
    setOnDeleting(false);
  };
   const onUpload = (file : File) => {
            console.log(file);
            
   }
 

  if (!isMounted) return null;

  return (
    <div className="w-full h-64">
      {value ? (
        <div className="w-full flex-1/2 h-full relative rounded-md border border-input overflow-hidden bg-muted dark:bg-muted/50">
          <Image
            fill
            className="object-cover"
            alt="Uploaded image"
            src={value}
            priority
          />
          <div className="absolute top-2 right-2 cursor-pointer">
            <Button
              size="icon"
              variant="destructive"
              className="cursor-pointer"
              onClick={onDelete}
            >
              {onDeleting ? <Loader className="animate-spin" /> : <Trash />}
            </Button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps({
            className: `w-full h-full relative rounded-md flex items-center justify-center overflow-hidden border-dashed transition-colors ${
              isDragActive
                ? "border-blue-500 bg-blue-100 dark:bg-blue-950"
                : isDragReject
                ? "border-red-500 bg-red-100 dark:bg-red-950"
                : "border-input bg-muted dark:bg-muted/50"
            }`,
          })}
        >
          <input {...getInputProps()} disabled={disable} />
          {loading ? (
            <div className="flex flex-col gap-2">Progress: {progress}%</div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground gap-2">
              <ImagePlus className="w-10 h-10" />
              <p>
                {isDragActive
                  ? "Drop it here..."
                  : "Drag and Drop image, or click to select one"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;