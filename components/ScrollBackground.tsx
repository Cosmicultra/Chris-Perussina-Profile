"use client";

import type { CSSProperties } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollProgress } from "@/lib/scroll-context";
import { useScrollNarrative } from "@/lib/scroll-narrative-context";

export function ScrollBackground() {
  const progress = useScrollProgress();
  const narrative = useScrollNarrative();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 639px)");

  const effectiveProgress = prefersReducedMotion ? 0.5 : progress;
  const awaBoost = narrative?.activeBrand === "awa" ? 0.15 : 0;
  const apBoost = narrative?.activeBrand === "advisorpilot" ? 0.15 : 0;
  const awaOpacity = Math.min(1, 0.5 * (1 - effectiveProgress) + awaBoost);
  const apOpacity = Math.min(1, 0.5 * effectiveProgress + apBoost);
  const vignetteOpacity = 0.2 + effectiveProgress * 0.25;

  const scaleBoost = isMobile ? 1.2 : 1;
  const parallaxMax = isMobile ? 12 : 24;
  const awaScale = (prefersReducedMotion ? 0.92 : 0.88 + awaOpacity * 0.07) * scaleBoost;
  // AP artwork sits inset inside the PNG; boost scale so it reads as large as AWA at the top.
  const apScale =
    (prefersReducedMotion ? 0.92 : 0.88 + apOpacity * 0.07) * 1.716 * scaleBoost;
  const awaParallax = prefersReducedMotion ? 0 : -effectiveProgress * parallaxMax;
  const apParallax = prefersReducedMotion ? 0 : effectiveProgress * parallaxMax;

  const isGold = narrative?.activeBrand === "advisorpilot";
  const bloomColor = isGold
    ? "rgba(139, 115, 85, 0.12)"
    : "rgba(61, 106, 148, 0.15)";
  const bloomOpacity = prefersReducedMotion ? 0.5 : 0.35 + (narrative?.activeBrand ? 0.25 : 0);
  const bloomGradient = isMobile
    ? `radial-gradient(ellipse 85% 55% at 50% 28%, ${bloomColor}, transparent)`
    : `radial-gradient(ellipse 70% 50% at 50% 30%, ${bloomColor}, transparent)`;
  const cornerGradients = isMobile
    ? "radial-gradient(ellipse 90% 45% at 50% -15%, rgba(61, 106, 148, 0.15), transparent), radial-gradient(ellipse 70% 35% at 100% 100%, rgba(26, 39, 68, 0.5), transparent)"
    : "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(61, 106, 148, 0.15), transparent), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(26, 39, 68, 0.5), transparent)";

  return (
    <div
      className="scroll-bg-root pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-navy"
      aria-hidden="true"
      style={{ "--scroll-progress": effectiveProgress } as CSSProperties}
    >
      <div
        className="scroll-bg-awa absolute inset-0 origin-center bg-contain bg-center bg-no-repeat transition-transform duration-300 ease-out"
        style={{
          backgroundImage: "url(/AWA.png)",
          transform: `scale(${awaScale}) translateY(${awaParallax}px)`,
          opacity: awaOpacity,
        }}
      />
      <div
        className="scroll-bg-ap absolute inset-0 origin-center bg-white bg-contain bg-center bg-no-repeat transition-transform duration-300 ease-out"
        style={{
          backgroundImage: "url(/AP.png)",
          transform: `scale(${apScale}) translateY(${apParallax}px)`,
          opacity: apOpacity,
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: bloomGradient,
          opacity: bloomOpacity,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: cornerGradients,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(11, 17, 32, 0.85) 100%)",
          opacity: vignetteOpacity,
        }}
      />
    </div>
  );
}
