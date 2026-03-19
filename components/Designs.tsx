"use client";

import { useState } from "react";
import DesignCard from "./DesignCard";
import Container from "@/components/Container";
import { GenerateRoom } from "@prisma/client";

interface designsProps {
  initialDesigns: GenerateRoom[];
  initialCursor: string | null;
  initialHasMore: boolean;
  isDesigingPage: boolean;
  userId: string | null;
  popularity?: string;
  date?: string;
}

export default function Designs({
  initialDesigns,
  initialCursor,
  initialHasMore,
  isDesigingPage,
  userId,
  popularity,
  date,
}: designsProps) {
  const [designs, setDesigns] = useState<GenerateRoom[]>(initialDesigns);
  const [cursor, setCursor] = useState<string | null>(initialCursor);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (!cursor || loading) return;
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (cursor) params.set("cursor", cursor);
      if (popularity) params.set("popularity", popularity);
      if (date) params.set("date", date);

      const res = await fetch(`/api/designs/public?${params.toString()}`);
      const data = await res.json();

      setDesigns((prev) => [...prev, ...data.designs]);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Failed to load more designs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (designs.length === 0) return null;

  return (
    <Container>
      {isDesigingPage && (
        <h1 className="text-white/70 underline underline-offset-2">
          My designs History
        </h1>
      )}
      <div className="grid grid-cols-1 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {designs.map((design) => (
          <DesignCard
            key={design.id}
            design={design}
            userId={userId}
            isDesigingPage={isDesigingPage}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </Container>
  );
}