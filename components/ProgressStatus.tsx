"use client";

import { useEffect, useState } from "react";

interface CircularProgressBarProps {
  duration?: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  duration = 5000,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        setProgress(100);
      }
    };

    requestAnimationFrame(animate);

    return () => setProgress(0);
  }, [duration]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="relative w-20 h-20 rounded-full border-[10px] border-gray-700 flex items-center justify-center">
        <span className="text-white text-xl font-bold">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default CircularProgressBar;
