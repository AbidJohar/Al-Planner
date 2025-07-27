"use server";

import { db } from "@/lib/db";

export const fetchAllDesignById = async (
  userId?: string | null,
  popularity?: "popular_asc" | "popular_desc",
  date?: "date_asc " | "date_desc"
) => {
  try {
    let designs = await db.generateRoom.findMany({
      where: userId ? { userId } : undefined,
    });
    //_______( Sort Popularity )_____

    if (popularity === "popular_asc") {
      designs = designs.sort(
        (a, b) => a.favourites.length - b.favourites.length
      );
    } else {
      designs = designs.sort(
        (a, b) => b.favourites.length - a.favourites.length
      );
    }
    //_______( Sort date )_____
    if (date === "date_asc ") {
      designs = designs.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else {
      designs = designs.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return designs;
  } catch (error) {
    console.error("Error in FetchAllDesignByid:", error);
    return [];
  }
};
