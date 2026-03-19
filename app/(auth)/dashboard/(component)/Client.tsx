"use client";

import CustomSelect from "@/components/CustomSelect";
import ImageUploader from "@/components/ImageUploader";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import ToolTipButton from "@/components/ToolTipButton";
import { Textarea } from "@/components/ui/textarea";
import { roomStyles, aiStyle } from "@/lib/helper";
import { FilterX, Loader, RefreshCcw, Share2Icon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { generateFromHuggingFaceModel } from "@/actions/generate-from-hugginface";

import axios from "axios";
import { useRouter } from "next/navigation";

interface clientProps {
  user: {
    id: string;
    fullName: string | null;
    email: string;
    imageUrl: string;
  };
}

const Client = ({ user }: clientProps) => {
  const [room, setRoom] = useState<string | null>(null);
  const [aistyle, setAistyle] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [savedDesignId, setSavedDesignId] = useState<string | null>(null); // track the auto-saved record

  
  const router = useRouter();

  //_______( Function to set room type )_________
  const handleRoomChange = (value: string) => {
    setRoom(value);
  };

  //____________( Function to set AI style type )_________
  const handleAistyle = (value: string) => {
    setAistyle(value);
  };

  //_________( Function to handle the prompt)
  const handlePrompt = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleRoomReset = () => {
    setRoom(null);
  };

  const handleAistyleReset = () => {
    setAistyle(null);
  };

  const clearAllfilter = () => {
    if (uploadImage && !isSaving) {
      toast.warning(
        "please delete the uploaded image before clearing the filter"
      );
      return;
    }
    handleRoomReset();
    handleAistyleReset();
    setPrompt("");
    setUploadImage(null);
    setOutputImage(null);
    setIsSaving(false);
    setSavedDesignId(null);
  };

  const clearAfterSave = () => {
    handleRoomReset();
    handleAistyleReset();
    setPrompt("");
    setUploadImage(null);
    setOutputImage(null);
    setIsSaving(false);
    setSavedDesignId(null);
  };

  //___________( Save result function — just marks isSaved: true )___________
  const saveAllResult = async () => {
    if (!outputImage) {
      toast.error("Please generate an image before saving");
      return;
    }

    if (!savedDesignId) {
      toast.error("No generated design found to save");
      return;
    }

    try {
      setIsSaving(true);

      const response = await axios.patch(`/api/result/${savedDesignId}`, {
        isSaved: true,
      });

      if (response.data.success) {
        toast.success("Shared successfully with the public.");
        router.refresh();
        clearAfterSave();
      } else {
        toast.error("Something went wrong. Could not save");
      }
    } catch (error) {
      console.error("Failed to share with public", error);
      toast.error("Failed to sahre it with public!");
    } finally {
      setIsSaving(false);
    }
  };

  //___________( Handle Generate function — auto-saves with isSaved: false )___________
  const handleGenerate = async () => {
    if (!uploadImage) return;

    try {
      setLoading(true);
      setSavedDesignId(null); // reset any previous saved id

      const result = await generateFromHuggingFaceModel({
        imageUrl: uploadImage,
        prompt: `${prompt} ${room ? `Room Style: ${room}` : ""} ${
          aistyle ? `AI style: ${aistyle}` : ""
        }.Make sure the image is high quality (720px) and make sure the ratio is 16:9 and visually appealing. }`,
      });

    
    // step 1: Fetch the temp HuggingFace image as a blob
    const hfResponse = await fetch(result);

    const blob = await hfResponse.blob();

    // Step 2: Upload it to your S3 via existing endpoint
    const formData = new FormData();
    formData.append("file", new File([blob], `output-${Date.now()}.webp`, { type: blob.type }));

    const s3Response = await fetch("/api/s3-upload", {
      method: "POST",
      body: formData,
    });

    const s3Data = await s3Response.json();

    if (!s3Data.success) {
      toast.error("Failed to save output image");
      return;
    }

    const permanentUrl = s3Data.url; // permanent S3 URL

    setOutputImage(permanentUrl);

      // Auto-save with isSaved: false
      const response = await axios.post("/api/result", {
        uploadImage,
        outputImage: result,
        prompt,
        roomStyle: room ?? "default",
        aiStyle: aistyle ?? "default",
        userName: user.fullName ?? "Unknown User",
        userImage: user.imageUrl ?? "assets/img/avatar.jpg",
        isSaved: false,
      });

      if (response.data.success) {
        setSavedDesignId(response.data.id); // store the record id for later
      } else {
        toast.error("Design generated but could not be auto-saved");
      }
    } catch (error) {
      toast.error("Failed to generate the room design!");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeImage = (url: string) => {
    setUploadImage(url);
  };

  const handleRemoveImage = () => {
    setUploadImage(null);
  };

  return (
    <div className="my-10 w-full p-4 rounded-md border border-input">
      <div className="w-full grid grid-cols-1 min-md:grid-cols-3 gap-3">
        <div className="w-full space-y-4 col-span-1 p-10 border border-input rounded-md">
          <CustomSelect
            placeholder="Select your interior"
            option={roomStyles}
            onChange={handleRoomChange}
            value={room}
            className=""
          />
          <CustomSelect
            placeholder="Select AI style interior"
            option={aiStyle}
            onChange={handleAistyle}
            value={aistyle}
            className=""
          />
        </div>
        <div className="w-full space-y-4 col-span-2 p-10 border relative border-input rounded-md">
          <Textarea
            placeholder="Type your prompt here..."
            value={prompt}
            onChange={handlePrompt}
            className="min-h-[100px]"
          />
          <div className="absolute top-0 right-4">
            <ToolTipButton
              content="clear all filter"
              onClick={clearAllfilter}
              disable={loading}
              icon={<FilterX className="min-w-4 min-h-4" />}
            />
            <ToolTipButton
              content="Share it with public"
              onClick={saveAllResult}
              disable={loading || !savedDesignId} // disable if nothing generated yet
              loading={isSaving}
              icon={<Share2Icon className="min-w-4 min-h-4" />}
            />
          </div>
          <ToolTipButton
            label="Generate"
            content="Generate"
            onClick={handleGenerate}
            icon={<RefreshCcw />}
            disable={!uploadImage || loading}
            buttonSize="default"
            buttonVariant={"default"}
            buttonClassName="w-full"
            loading={loading}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-5">
        <ImageUploader
          location="clients"
          onChange={handleChangeImage}
          onRemove={handleRemoveImage}
          value={uploadImage}
          disable={loading}
        />
        <div className="w-full aspect-video relative rounded-md border border-input bg-muted dark:bg-muted/50">
          {loading && !outputImage && (
            <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
              <div className="flex items-center justify-center gap-1">
                <Loader className="w-5 h-5 animate-spin text-orange-500" />
                <span className="text-sm mt-1 block text-center animate-pulse font-medium">
                  Generating...
                </span>
              </div>
              <div className="px-8 text-gray-400">
                <span className="text-sm">
                  Please wait a moment. We&apos;re using free AI models, so it
                  might take a couple of minutes. Don&apos;t close this tab.
                </span>
              </div>
            </div>
          )}

          {outputImage && (
            <ReactBeforeSliderComponent
              firstImage={{
                imageUrl: uploadImage || "https://placehold.co/600x400",
              }}
              secondImage={{
                imageUrl: outputImage || "https://placehold.co/600x400",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Client;