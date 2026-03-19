import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export const PATCH = async (
  req: NextRequest,
  { params }: RouteParams
) => {
  try {
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: "Design ID is required" }, { status: 400 });
    }

    const existingDesign = await db.generateRoom.findUnique({
      where: { id },
    });

    if (!existingDesign) {
      return NextResponse.json({ error: "Design not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => ({}));

    // ________________( Handle isSaved update )________________
    if (body.isSaved !== undefined) {
      // Only the owner can mark their design as saved
      if (existingDesign.userId !== userId) {
        return NextResponse.json(
          { error: "Forbidden: You can't update this design" },
          { status: 403 }
        );
      }

      const updatedRoom = await db.generateRoom.update({
        where: { id },
        data: { isSaved: true },
      });

      return NextResponse.json({
        success: true,
        isSaved: updatedRoom.isSaved,
      });
    }

    // ________________( Handle favourite toggle )________________
    const isAlreadyFavorite = existingDesign.favourites.includes(userId);
    const updateFavorite = isAlreadyFavorite
      ? existingDesign.favourites.filter((favId) => favId !== userId)
      : [...existingDesign.favourites, userId];

    const updatedRoom = await db.generateRoom.update({
      where: { id },
      data: { favourites: updateFavorite },
    });

    return NextResponse.json({
      success: true,
      isFavorite: !isAlreadyFavorite,
      favourites: updatedRoom.favourites,
    });

  } catch (error) {
    console.error("Error in PATCH /api/result/[id]:", error);
    return NextResponse.json(
      { error: "Failed to update design" },
      { status: 500 }
    );
  }
};

//____________________( Delete room )_____________________

export const DELETE = async (
  req: NextRequest,
  { params }: RouteParams
) => {
  try {
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { error: "Design ID is required" },
        { status: 400 }
      );
    }

    const existingDesign = await db.generateRoom.findUnique({
      where: { id },
    });

    if (!existingDesign) {
      return NextResponse.json(
        { error: "Design not found" },
        { status: 404 }
      );
    }

    if (existingDesign.userId !== userId) {
      return NextResponse.json(
        { error: "Forbidden: You can't delete this design" },
        { status: 403 }
      );
    }

    await db.generateRoom.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Design deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting design:", error);
    return NextResponse.json(
      { error: "Failed to delete design" },
      { status: 500 }
    );
  }
};