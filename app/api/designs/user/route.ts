import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = await auth();

  // protect the route
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor");
  const take = 6;

  const designs = await db.generateRoom.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: take + 1,
    ...(cursor && {
      skip: 1,
      cursor: { id: cursor },
    }),
  });

  const hasMore = designs.length > take;
  const data = hasMore ? designs.slice(0, take) : designs;
  const nextCursor = hasMore ? data[data.length - 1].id : null;

  return Response.json({ designs: data, nextCursor, hasMore });
}