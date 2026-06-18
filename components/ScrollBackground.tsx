"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, type CSSProperties } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { getScrollSnapshot } from "@/lib/scroll-context";
import { useScrollNarrative } from "@/lib/scroll-narrative-context";
import { registerScrollVisualEffect } from "@/lib/scroll-visual-effects";

export function ScrollBackground() {
  const narrative = useScrollNarrative();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 639px)");

  const rootRef = useRef<HTMLDivElement>(null);
  const awaRef = useRef<HTMLDivElement>(null);
  const apRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);

  const configRef = useRef({ prefersReducedMotion, isMobile, narrative });
  configRef.current = { prefersReducedMotion, isMobile, narrative };

  const applyScrollVisuals = useCallback(() => {
    const { progress } = getScrollSnapshot();
    const { prefersReducedMotion: reduced, isMobile: mobile, narrative: currentNarrative } =
      configRef.current;

    const effectiveProgress = reduced ? 0.5 : progress;
    const awaBoost = currentNarrative?.activeBrand === "awa" ? 0.15 : 0;
    const apBoost = currentNarrative?.activeBrand === "advisorpilot" ? 0.15 : 0;
    const awaOpacity = Math.min(1, 0.5 * (1 - effectiveProgress) + awaBoost);
    const apOpacity = Math.min(1, 0.5 * effectiveProgress + apBoost);
    const vignetteOpacity = 0.2 + effectiveProgress * 0.25;

    const scaleBoost = mobile ? 1.2 : 1;
    const parallaxMax = mobile ? 12 : 24;
    const awaScale = (reduced ? 0.92 : 0.88 + awaOpacity * 0.07) * scaleBoost;
    const apScale = (reduced ? 0.92 : 0.88 + apOpacity * 0.07) * scaleBoost;
    const awaParallax = reduced ? 0 : -effectiveProgress * parallaxMax;
    const apParallax = reduced ? 0 : effectiveProgress * parallaxMax;

    const isGold = currentNarrative?.activeBrand === "advisorpilot";
    const bloomColor = isGold ? "rgba(139, 115, 85, 0.12)" : "rgba(61, 106, 148, 0.15)";
    const bloomOpacity = reduced ? 0.5 : 0.35 + (currentNarrative?.activeBrand ? 0.25 : 0);
    const bloomGradient = mobile
      ? `radial-gradient(ellipse 85% 55% at 50% 28%, ${bloomColor}, transparent)`
      : `radial-gradient(ellipse 70% 50% at 50% 30%, ${bloomColor}, transparent)`;

    if (rootRef.current) {
      rootRef.current.style.setProperty("--scroll-progress", String(effectiveProgress));
    }

    if (awaRef.current) {
      awaRef.current.style.transform = `scale(${awaScale}) translateY(${awaParallax}px)`;
      awaRef.current.style.opacity = String(awaOpacity);
    }

    if (apRef.current) {
      apRef.current.style.transform = `scale(${apScale}) translateY(${apParallax}px)`;
      apRef.current.style.opacity = String(apOpacity);
    }

    if (bloomRef.current) {
      bloomRef.current.style.backgroundImage = bloomGradient;
      bloomRef.current.style.opacity = String(bloomOpacity);
    }

    if (vignetteRef.current) {
      vignetteRef.current.style.opacity = String(vignetteOpacity);
    }
  }, []);

  useEffect(() => {
    applyScrollVisuals();
  }, [applyScrollVisuals, narrative?.activeBrand, prefersReducedMotion, isMobile]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    return registerScrollVisualEffect(applyScrollVisuals);
  }, [applyScrollVisuals, prefersReducedMotion]);

  const cornerGradients = isMobile
    ? "radial-gradient(ellipse 90% 45% at 50% -15%, rgba(61, 106, 148, 0.15), transparent), radial-gradient(ellipse 70% 35% at 100% 100%, rgba(26, 39, 68, 0.5), transparent)"
    : "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(61, 106, 148, 0.15), transparent), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(26, 39, 68, 0.5), transparent)";

  return (
    <div
      ref={rootRef}
      className="scroll-bg-root pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-navy"
      aria-hidden="true"
      style={{ "--scroll-progress": 0 } as CSSProperties}
    >
      <div
        ref={awaRef}
        className="scroll-bg-awa absolute inset-0 origin-center transform-gpu"
        style={{ opacity: 0.5 }}
      >
        <Image
          src="/AWA.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain object-center"
        />
      </div>
      <div
        ref={apRef}
        className="scroll-bg-ap absolute inset-0 origin-center bg-white transform-gpu"
        style={{ opacity: 0 }}
      >
        <Image
          src="/AP.png"
          alt=""
          fill
          sizes="100vw"
          className="object-contain object-center"
        />
      </div>
      <div ref={bloomRef} className="absolute inset-0 transition-opacity duration-500" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: cornerGradients,
        }}
      />
      <div
        ref={vignetteRef}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(11, 17, 32, 0.85) 100%)",
          opacity: 0.2,
        }}
      />
    </div>
  );
}
