"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function AtmosphericLayer() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 639px)");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let cancelled = false;
    let idleId: number | undefined;

    const frameId = requestAnimationFrame(() => {
      if (typeof requestIdleCallback !== "undefined") {
        idleId = requestIdleCallback(() => {
          if (!cancelled) setMounted(true);
        });
      } else {
        idleId = window.setTimeout(() => {
          if (!cancelled) setMounted(true);
        }, 1);
      }
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      if (idleId !== undefined) {
        if (typeof cancelIdleCallback !== "undefined") {
          cancelIdleCallback(idleId);
        } else {
          window.clearTimeout(idleId);
        }
      }
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || !mounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-overlay contain-strict"
      aria-hidden="true"
    >
      <svg className="h-full w-full animate-grain-drift" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves={isMobile ? 2 : 4}
            stitchTiles="stitch"
          >
            <animate
              attributeName="seed"
              values="0;100;0"
              dur={isMobile ? "18s" : "12s"}
              repeatCount="indefinite"
            />
          </feTurbulence>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
