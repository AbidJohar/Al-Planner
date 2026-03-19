"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FilterX} from "lucide-react";
import ToolTipButton from "@/components/ToolTipButton";

export default function FilterControl() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentpopularity = searchParams.get("popularity") ?? "";
  const currentDate = searchParams.get("date") ?? "";

  const handleChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
         console.log("params:",params);
         
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/designs?${params.toString()}`);
  };

  const handleClear = () => {
    router.push("/designs");
  };

  return (
    <div className="w-full flex flex-col items-start  gap-4 md:gap-2 md:flex-row md:items-center md:justify-between">
      <Select
        value={currentpopularity}
        onValueChange={(val) => handleChange("popularity", val)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by Popularity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popularity_desc">Most</SelectItem>
          <SelectItem value="popularity_asc">Least</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center justify-center gap-2">
        <Select
          value={currentDate}
          onValueChange={(val) => handleChange("date", val)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity_desc">Recently Added</SelectItem>
            <SelectItem value="popularity_asc">Earlier Posts</SelectItem>
          </SelectContent>
        </Select>
       <ToolTipButton
              content="clear all filter"
              onClick={handleClear}
              icon={<FilterX className="min-w-4 min-h-4" />}
            />
      </div>
    </div>
  );
}
