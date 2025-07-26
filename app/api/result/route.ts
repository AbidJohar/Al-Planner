import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      uploadImage,
      outputImage,
      prompt,
      roomStyle,
      aiStyle,
      userName,
      userImage,
    } = body;

    console.log("aiStyle",aiStyle);
    
    const saveResult = await db.generateRoom.create({
      data: {
        userId: userId,
        userName: userName ?? "Unknown User",
        userImage: userImage ?? "assets/img/avatar.jpg",
        roomStyle: roomStyle ?? "default",
        aiStyle: aiStyle ?? "default",
        prompt,
        updateImage: uploadImage,
        outputImage,
      },
    });

    return NextResponse.json({
      success: true,
      id: saveResult.id,
    });
  } catch (error) {
    console.error("Error from result side:", error);
    return NextResponse.json(
      {
        error: "Failed to save result!",
      },
      { status: 500 }
    );
  }
};
