import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const popularity = searchParams.get("popularity");
  const date = searchParams.get("date");
  const cursor = searchParams.get("cursor");
  const take = 6;

  // Build orderBy
  const orderBy: any[] = [];

  // Date sorting
  if (date === "date_asc") orderBy.push({ createdAt: "asc" });
  else if (date === "date_desc") orderBy.push({ createdAt: "desc" });

  // Default fallback
  if (orderBy.length === 0) orderBy.push({ createdAt: "desc" });

  const designs = await db.generateRoom.findMany({
    where: { isSaved: true },
    orderBy,
    take: take + 1,
    ...(cursor && {
      skip: 1,
      cursor: { id: cursor },
    }),
  });

  // Sort by popularity in JS (because favourites is an array field —
  // Prisma can't orderBy array length directly)
  if (popularity === "popular_asc") {
    designs.sort((a, b) => a.favourites.length - b.favourites.length);
  } else if (popularity === "popular_desc") {
    designs.sort((a, b) => b.favourites.length - a.favourites.length);
  }

  const hasMore = designs.length > take;
  const data = hasMore ? designs.slice(0, take) : designs;
  const nextCursor = hasMore ? data[data.length - 1].id : null;

  return Response.json({ designs: data, nextCursor, hasMore });
}
 

 