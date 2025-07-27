"use client";

import CustomSelect from "@/components/CustomSelect";
import ImageUploader from "@/components/ImageUploader";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import ToolTipButton from "@/components/ToolTipButton";
import { Textarea } from "@/components/ui/textarea";
import { roomStyles,aiStyle } from "@/lib/helper";
import { FilterX, Loader, RefreshCcw, SaveAllIcon } from "lucide-react";
import { ChangeEvent,  useState } from "react";
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
  // const [progress, setProgress] = useState<number>(0);

  const router = useRouter();

  //_______( Function to set room type )_________

  const handleRoomChange = (value: string) => {
    console.log("Room value", value);

    setRoom(value);
  };
  //____________( Function to set AI style type )_________
  const handleAistyle = (value: string) => {
    console.log("AI Room value", value);
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
  };

  const clearAfterSave = () => {
    handleRoomReset();
    handleAistyleReset();
    setPrompt("");
    setUploadImage(null);
    setOutputImage(null);
    setIsSaving(false);
  };
  //___________( Save result function)
  const saveAllResult = async () => {
    if (!uploadImage && !outputImage) {
      toast.error("Please generate an image before saving");
    }

    try {
      setIsSaving(true);
      const response = await axios.post("/api/result", {
        uploadImage,
        outputImage,
        prompt,
        roomStyles: room ?? "default",
        aiStyle: aistyle ?? "default",
        userName: user.fullName ?? "Unknow User",
        userImage: user.imageUrl ?? "assets/img/avatar.jpg",
      });

      if (response.data.success) {
        toast.success("Result save successfully");
        router.refresh();
        clearAfterSave();
      } else {
        toast.error("Something went wrong. Could not save");
      }
    } catch (error) {
      console.error("Faild to save result", error);
      toast.error("Faild to save result!");
    } finally {
      setIsSaving(false);
    }
  };
  //___________( Handle Generate function )___________
  const handleGenerate = async () => {
    console.log("handle generate is hitting...");
    console.log("upload image:", uploadImage);

    if (!uploadImage) return;

    try {
      setLoading(true);

      const result = await generateFromHuggingFaceModel({
        imageUrl: uploadImage,
        prompt: `${prompt} ${room ? `Room Style: ${room}` : ""} ${
          aistyle ? `AI style: ${aistyle}` : ""
        }.Make sure the image is high quality (1080px) and make sure the ratio is 16:9 and visually appealing. }`,
      });

      setOutputImage(result);
    } catch (error) {
      toast.error("Faild to generate the room design!");
    } finally {
      setLoading(false);
    }
  };
  const handleChangeImage = (url: string) => {
    console.log("file,", url);

    setUploadImage(url);
  };
  const handleRemoveImage = () => {
    setUploadImage(null);
  };

  //____________( progess bar setup )__________
  // useEffect(() => {
  //   let interval: ReturnType<typeof setInterval> | null = null;
  //   let timeout: ReturnType<typeof setTimeout> | null = null;

  //   if (loading) {
  //     setProgress(0);
  //     interval = setInterval(() => {
  //       setProgress((p) => (p < 97 ? p + 3 : 97));
  //     }, 800);
  //   } else {
  //     // push to 100% only if we were actually progressing
  //     if (progress < 100) setProgress(100);
  //     // small delay to let the user see 100% (optional)
  //     timeout = setTimeout(() => {
  //       setProgress(0);
  //     }, 800);
  //   }

  //   return () => {
  //     if (interval) clearInterval(interval);
  //     if (timeout) clearTimeout(timeout);
  //   };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loading]);

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
              loading = {loading}
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
      <div className="w-full grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 gap-6 mt-5">
        <ImageUploader
          location="clients"
          onChange={handleChangeImage}
          onRemove={handleRemoveImage}
          value={uploadImage}
        />
        <div className="w-full  aspect-video relative rounded-md border border-input bg-muted  dark:bg-muted/50">
          {loading && !outputImage && (
            <div className="w-full h-full  flex flex-col gap-2 items-center justify-center">
              <div className="flex items-center justify-center gap-1 ">
                <Loader className="w-5 h-5 animate-spin text-purple-600" />
                <span className="text-sm mt-1 block text-center animate-pulse font-medium">
                  Generating...
                </span>
              </div>
              <div className="px-8 text-gray-400">
                <span className="text-sm ">
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
