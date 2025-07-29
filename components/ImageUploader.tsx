"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { ImagePlus, Loader, Trash } from "lucide-react";
import { toast } from "sonner";
import CircularProgressBar from "./ProgressStatus";

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
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onDeleting, setOnDeleting] = useState(false);


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
      accept: { "image/*": [] },
      multiple: false,
      disabled: disable,
    });


  const onDelete = async () => {
    if (!value) return;
    setOnDeleting(true);
    try {
      console.log("value", value);

      const key = value.split("/").pop();

      const res = await fetch(`/api/s3-remove?key=${key}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete image");
      }

      toast.success("Image deleted from S3");
      onChange(""); // Clear image
    } catch (error) {
      toast.error("Failed to delete image");
      console.error("S3 delete error:", error);
    } finally {
      setOnDeleting(false);
    }
  };

  const onUpload = (file: File) => {
    try {
      setLoading(true);
      

      const formData = new FormData();
      formData.append("file", file);

      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          setLoading(false);
          if (xhr.status === 200) {
            const res = JSON.parse(xhr.responseText);
            if (res.success) {
              toast.success("Image uploaded successfully on S3");
              onChange(res.url);
            } else {
              toast.error("Upload failed");
              console.error("Upload failed:", res.error);
            }
          } else {
            toast.error("Upload error");
            console.error("Upload error", xhr.responseText);
          }
        }
      };

      xhr.open("POST", "/api/s3-upload");
      xhr.send(formData);
    } catch (err) {
      toast.error("Something went wrong during upload");
      console.error("Upload exception", err);
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="w-full  aspect-video border border-input rounded-md">
      {value ? (
        <div className="w-full h-full relative rounded-md border border-input overflow-hidden bg-muted dark:bg-muted/50">
          <Image
            fill
            className="object-cover object-center"
            alt="Uploaded image"
            src={value}
            priority
          />
          <div className="absolute top-2 right-2">
            <Button
              size="icon"
              variant="destructive"
              className="cursor-pointer "
              onClick={onDelete}
              disabled={disable}
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
            
              <CircularProgressBar />
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
