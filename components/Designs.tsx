"use client";

import Image from "next/image";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { GenerateRoom } from "@/lib/generated/prisma";
import Container from "@/components/Container";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Heart, Loader } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface designsProps {
  designs: GenerateRoom[];
  isDesigingPage: boolean;
  userId: string | null;
}

export default function Designs({
  designs,
  isDesigingPage = false,
  userId,
}: designsProps) {
      


  if (designs.length === 0) return null;

  return (
    <Container className=" min-m">
      {!isDesigingPage && <div>Design page</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {designs.map((design) => (
          <DesignCard key={design.id} design={design} userId={userId} />
        ))}
      </div>
    </Container>
  );
}

const DesignCard = ({
  design,
  userId,
}: {
  design: GenerateRoom;
  userId: string | null;
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const isFavorite = design?.favourites?.includes(userId || "Unkown User");
    const toggleFavorite = async () => {

        setIsLoading(true)
        try {
              const response = await axios.patch(`/api/result/${design.id}`);
              if(response.data.success){
                toast.success("Favorites", {
                    description : "Update favirote successfully",
                });
                router.refresh();
              } else{
                toast.info("Favorites", {
                    description : "Faild to update favorites"
                })
              }


            
        } catch (error) {
            console.error("Error while updating favorite toggle:",error);
            
        } finally {
            setIsLoading(false);
        }

    }

  return (
    <Card className="p-2  rounded-md border-input hover:shadow-md gap-3 relative">
      {design.favourites?.length > 0 && (
        <Badge className="absolute top-3 left-3 z-50 rounded-full text-white bg-black/70">
          {design?.favourites.length.toLocaleString("en-IN")} like
        </Badge>
      )}
      <div className="w-full aspect-square rounded-md overflow-hidden">
        <ReactBeforeSliderComponent
          firstImage={{
            imageUrl: design?.updateImage || "https://placehold.co/600x400",
          }}
          secondImage={{
            imageUrl: design?.outputImage || "https://placehold.co/600x400",
          }}
        />
      </div>

      <div className="flex items-center justify-center">
        <HoverCard openDelay={0} closeDelay={100}>
          <HoverCardTrigger asChild>
            <span className="text-sm max-w-full overflow-hidden block text-muted-foreground truncate whitespace-nowrap ">
              {design?.prompt}
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-[15rem] text-sm">
            {design?.prompt}
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="flex items-center justify-between gap-1 p-1 sm:gap-2 sm:p-2">
  {design?.userImage && (
    <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
      <Image
        src={design.userImage}
        width={24}
        height={24}
        priority
        alt={design?.userName}
        className="object-cover rounded-full flex-shrink-0 sm:w-7 sm:h-7 md:w-6 md:h-6"
      />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-xs sm:text-sm md:text-xs truncate">{design?.userName}</p>
        <p className="text-[10px] sm:text-xs md:text-[10px] text-muted-foreground">
          {new Date(design?.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  )}
  
  <div className="flex items-center gap-1 flex-shrink-0">
    <Badge variant={"secondary"} className="text-[10px] sm:text-xs md:text-[13px] px-2 py-1 rounded-sm">
      {design?.roomStyle}
    </Badge>
    <Badge variant={"secondary"} className="text-[10px] sm:text-xs md:text-[13px] px-2 py-1 rounded-sm">
      {design?.aiStyle}
    </Badge>
  </div>

  {userId && (
    <Button
      size={"icon"}
      variant={"ghost"}
      onClick={toggleFavorite}
      className="cursor-pointer flex-shrink-0 h-6 w-6 sm:h-8 sm:w-8 md:h-6 md:w-6"
    >
      {isLoading ? (
        <Loader className="animate-spin w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3" />
      ) : (
        <Heart 
          fill={isFavorite ? "#ff0000" : "#999"} 
          strokeWidth={0} 
          className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3"
        /> 
      )}
    </Button>
  )}
</div>
    </Card>
  );
};
