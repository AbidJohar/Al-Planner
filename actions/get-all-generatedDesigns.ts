"use server";

import { db } from "@/lib/db";

export const fetchAllPublicDesigns = async (
  popularity?: "popular_asc" | "popular_desc",
  date?: "date_asc" | "date_desc"
) => {
  try {
    let designs = await db.generateRoom.findMany({
      where: {
        isSaved: true, // only publicly saved designs
      },
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

    //_______( Sort Date )_____
    if (date === "date_asc") {
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
    console.error("Failed to fetch public designs:", error);
    return [];
  }
};