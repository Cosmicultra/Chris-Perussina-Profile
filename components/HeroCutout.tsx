"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { getScrollSnapshot } from "@/lib/scroll-context";
import { registerScrollVisualEffect } from "@/lib/scroll-visual-effects";

type HeroCutoutProps = {
  src: string;
  alt: string;
  sizes: string;
};

export function HeroCutout({ src, alt, sizes }: HeroCutoutProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const parallaxRef = useRef<HTMLDivElement>(null);

  const applyParallax = useCallback(() => {
    if (!parallaxRef.current || prefersReducedMotion) return;

    const { scrollY } = getScrollSnapshot();
    const offsetY = Math.min(12, scrollY * 0.08);
    parallaxRef.current.style.transform = `translateY(${offsetY}px)`;
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    applyParallax();
    return registerScrollVisualEffect(applyParallax);
  }, [applyParallax, prefersReducedMotion]);

  return (
    <div className="relative h-full w-full -translate-x-3 sm:-translate-x-1">
      <div
        ref={parallaxRef}
        className="relative h-full w-full transform-gpu"
      >
        <div
          className={`relative h-full w-full ${prefersReducedMotion ? "" : "animate-hero-reveal"}`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            className="hero-cutout object-contain object-bottom"
            sizes={sizes}
          />
        </div>
      </div>
    </div>
  );
}
