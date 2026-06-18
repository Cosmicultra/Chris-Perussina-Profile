"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollNarrative } from "@/lib/scroll-narrative-context";

export function StorySpine() {
  const narrative = useScrollNarrative();
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) return null;

  const progress = narrative?.sectionProgress ?? 0;
  const isGold = narrative?.activeBrand === "advisorpilot";
  const spineColor = isGold
    ? "linear-gradient(to bottom, #3d6a94, #8b7355)"
    : "linear-gradient(to bottom, #3d6a94, #4a7cab)";
  const dotColor = isGold ? "#c4a882" : "#7eb3dc";
  const heightPercent = Math.max(8, progress * 100);

  return (
    <div
      className="pointer-events-none absolute top-0 left-5 h-full w-px sm:left-1/2 sm:-translate-x-[260px]"
      aria-hidden="true"
    >
      <div className="relative h-full w-px">
        <div
          className="w-px origin-top transition-[height] duration-300 ease-out"
          style={{
            height: `${heightPercent}%`,
            background: spineColor,
            opacity: 0.45,
          }}
        />
        {progress > 0.02 ? (
          <div
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full animate-spine-dot-pulse"
            style={{
              top: `calc(${heightPercent}% - 4px)`,
              backgroundColor: dotColor,
              boxShadow: `0 0 8px 2px ${dotColor}66`,
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
