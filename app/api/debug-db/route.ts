import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const debugInfo = {
      nodeEnv: process.env.NODE_ENV,
      hasDbUrl: !!process.env.DATABASE_URL,
      dbUrlPreview: process.env.DATABASE_URL?.substring(0, 50) + "...",
      timestamp: new Date().toISOString()
    };

    const designs = await db.generateRoom.findMany({
      take: 5, // Just get first 5 for testing
    });

    return NextResponse.json({
      success: true,
      debugInfo,
      designsCount: designs.length,
      designs: designs.map(d => ({
        id: d.id,
        userId: d.userId,
        userName: d.userName,
        createdAt: d.createdAt
      }))
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: {
        message: error,
         
      },
      debugInfo: {
        nodeEnv: process.env.NODE_ENV,
        hasDbUrl: !!process.env.DATABASE_URL,
        dbUrlPreview: process.env.DATABASE_URL?.substring(0, 50) + "..."
      }
    });
  }
}