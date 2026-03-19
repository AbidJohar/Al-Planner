"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { GenerateRoom } from "@prisma/client";
import Container from "@/components/Container";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Heart, Loader, Trash2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

//Lazy load (performance boost)
const ReactBeforeSliderComponent = dynamic(
  () => import("react-before-after-slider-component"),
  { ssr: false }
);

interface designsProps {
  designs: GenerateRoom[];
  isDesigingPage: boolean;
  userId: string | null;
}

export default function Designs({
  designs,
  isDesigingPage,
  userId,
}: designsProps) {
  console.log("all designs:",designs);

  if (designs.length === 0) return null;

  return (
    <Container>
      {isDesigingPage &&
      <h1 className="text-white/70 underline underline-offset-2">My designs History</h1>
      }
      <div className="grid grid-cols-1 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {designs.map((design) => (
          <DesignCard key={design.id} design={design} userId={userId} isDesigingPage={isDesigingPage} />
        ))}
      </div>
    </Container>
  );
}

const DesignCard = ({
  design,
  userId,
  isDesigingPage
}: {
  design: GenerateRoom;
  userId: string | null;
  isDesigingPage: boolean;
}) => {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isFavoriting, setIsFavoriting] = useState(false);

  const isFavorite = design?.favourites?.includes(userId || "");
  const isOwner = design.userId === userId;

  // Toggle Favorite
  const toggleFavorite = async () => {
    try {
      setIsFavoriting(true);

      const response = await axios.patch(`/api/result/${design.id}`);

      if (response.data.success) {
        toast.success("Updated favorites");
        router.refresh();
      } else {
        toast.error("Failed to update favorite");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating favorite");
    } finally {
      setIsFavoriting(false);
    }
  };

  // Delete Design
  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const res = await axios.delete(`/api/result/${design.id}`);

      if (res.data.success) {
        toast.success("Design deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="p-2 rounded-md border-input hover:shadow-md gap-3 relative">

      {/* Delete Button with Confirmation Dialog */}
      {isDesigingPage && isOwner && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="icon"
              variant="destructive"
              disabled={isDeleting}
              className="absolute top-3 right-3 z-50 h-7 w-7"
            >
              {isDeleting ? (
                <Loader className="animate-spin w-4 h-4" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Design</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this design? This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Likes Badge */}
      {design.favourites?.length > 0 && (
        <Badge className="absolute top-3 left-3 z-50 bg-black/70 text-white rounded-full">
          {design.favourites.length} likes
        </Badge>
      )}

      {/* Image Slider */}
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

      {/* Prompt */}
      <HoverCard openDelay={0} closeDelay={100}>
        <HoverCardTrigger asChild>
          <p className="text-sm truncate text-muted-foreground">
            {design.prompt}
          </p>
        </HoverCardTrigger>
        <HoverCardContent className="text-sm w-[15rem]">
          {design.prompt}
        </HoverCardContent>
      </HoverCard>

      {/*  User Info + Styles */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Image
            src={design.userImage || "/avatar.png"}
            width={28}
            height={28}
            alt="user"
            className="rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">
              {design.userName}
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(design.createdAt).toDateString()}
            </p>
          </div>
        </div>

        <div className="flex gap-1">
          <Badge variant="secondary">{design.roomStyle}</Badge>
          <Badge variant="secondary">{design.aiStyle}</Badge>
        </div>
        {/*  Actions */}
      <div className="flex justify-end">
        {userId && (
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleFavorite}
            disabled={isFavoriting}
          >
            {isFavoriting ? (
              <Loader className="animate-spin w-4 h-4" />
            ) : (
              <Heart
                fill={isFavorite ? "red" : "#999"}
                strokeWidth={0}
              />
            )}
          </Button>
        )}
      </div>
      </div>

      
    </Card>
  );
};