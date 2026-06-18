"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function AtmosphericLayer() {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-overlay"
      aria-hidden="true"
    >
      <svg className="h-full w-full animate-grain-drift" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          >
            <animate
              attributeName="seed"
              values="0;100;0"
              dur="12s"
              repeatCount="indefinite"
            />
          </feTurbulence>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
