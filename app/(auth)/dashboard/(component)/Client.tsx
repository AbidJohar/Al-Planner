"use client";

import CustomSelect from "@/components/CustomSelect";
import ImageUploader from "@/components/ImageUploader";
import ToolTipButton from "@/components/ToolTipButton";
import { Textarea } from "@/components/ui/textarea";
import { roomStyles, aiStyle } from "@/lib/helper";
import { FilterX, Loader, RefreshCcw, SaveAllIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";

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

  const handleRoomChange = (value: string) => {
    setRoom(value);
  };
  const handleAistyle = (value: string) => {
    setAistyle(value);
  };
  const handlePrompt = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };
  const clearAllfilter = () => {};
  const saveAllResult = () => {};
  const handleGenerate = () => {};
  const handleChangeImage = (url: string) => {
    setUploadImage(url);
  };
  const handleRemoveImage = () => {
    setUploadImage(null);
  };

  return (
    <div className="my-10 w-full p-4 rounded-md border border-input">
      <div className=" w-full grid grid-cols-1 min-md:grid-cols-3 gap-3">
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
              icon={<FilterX className="min-w-4 min-h-4" />}
            />
            <ToolTipButton
              content="save the result"
              onClick={saveAllResult}
              icon={<SaveAllIcon className="min-w-4 min-h-4" />}
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
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        <ImageUploader
          location="clients"
          onChange={handleChangeImage}
          onRemove={handleRemoveImage}
          value={uploadImage}
        />
        <div className="w-full aspect-video relative rounded-md border border-input bg-muted  dark:bg-muted/50">
        
        {loading && !outputImage &&  (
          <div className="w-full h-full  flex flex-col gap-2 items-center justify-center">
            <div className="flex items-center justify-center gap-1 ">
              <Loader  className="w-6 h-6 animate-spin text-purple-600"/>
              <span className="ml-1 text-lg animate-pulse">Generating...</span>
            </div>
            <div className="px-8 text-gray-400">
            <span className="text-sm ">Please wait a moment. We&apos;re using free AI models, so it might take a little time. Don&apos;t close this tab.</span>
            </div>
          </div>
        ) }
        </div> 
      </div>
    </div>
  );
};

export default Client;
