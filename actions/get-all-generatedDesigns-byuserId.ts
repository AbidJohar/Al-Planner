"use server";

import { db } from "@/lib/db";

export const fetchAllDesignById = async (
  userId?: string | null,
 
) => {
  try {
    let designs = await db.generateRoom.findMany({
      where: userId ? { userId } : undefined,
    });
 
    return designs;
  } catch (error) {
    
    console.error("Error in FetchAllDesignByid:", error);
    return [];
  }
};



