"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";

const BeforeAfterSlider = ({
  beforeUrl,
  afterUrl,
}: {
  beforeUrl: string | null;
  afterUrl: string | null;
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!beforeUrl || !afterUrl) return null;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isActive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(x, 0), 100));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isActive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(x, 0), 100));
  };

  const toggleActive = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsActive((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${
        isActive ? "cursor-ew-resize" : "cursor-default"
      }`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After image — full cover background */}
      <Image
        src={afterUrl}
        alt="After"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 600px"
      />

      {/* Before image — clipped using clipPath so it always stays full size */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <Image
          src={beforeUrl}
          alt="Before"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-lg pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      />

      {/* Slider handle button — click to activate/deactivate */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
        style={{ left: `${sliderPos}%` }}
      >
        <button
          onClick={toggleActive}
          className={`w-7 h-7 rounded-full cursor-pointer shadow-lg flex items-center justify-center transition-all duration-200 border-2 ${
            isActive
              ? "bg-white border-white scale-110 shadow-xl"
              : "bg-white border-white/60  "
          }`}
        >
          <div
            className={`w-4 h-4 transition-colors ${
              isActive ? "text-purple-600" : "text-white"
            }`}
          > </div>
        </button>
      </div>

      {/* Before / After labels */}
      <div className="absolute bottom-2 left-2 z-10 pointer-events-none">
        <span className="text-xs font-semibold bg-black/50 text-white px-2 py-0.5 rounded-full">
          Before
        </span>
      </div>
      <div className="absolute bottom-2 right-2 z-10 pointer-events-none">
        <span className="text-xs font-semibold bg-black/50 text-white px-2 py-0.5 rounded-full">
          After
        </span>
      </div>

      {/* Hint when not active */}
      {!isActive && (
        <div className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none">
          <span className="text-xs font-medium bg-black/40 text-white px-3 py-1 rounded-full">
            Click ⇔ to compare
          </span>
        </div>
      )}
    </div>
  );
};

export default BeforeAfterSlider;