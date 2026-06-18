"use client";

import Image from "next/image";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollY } from "@/lib/scroll-context";

type HeroCutoutProps = {
  src: string;
  alt: string;
  sizes: string;
};

export function HeroCutout({ src, alt, sizes }: HeroCutoutProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const scrollY = useScrollY();
  const offsetY = prefersReducedMotion ? 0 : Math.min(12, scrollY * 0.08);

  return (
    <div className="relative h-full w-full -translate-x-3 sm:-translate-x-1">
      <div
        className={`relative h-full w-full ${prefersReducedMotion ? "" : "animate-hero-reveal"}`}
        style={prefersReducedMotion ? undefined : { transform: `translateY(${offsetY}px)` }}
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
  );
}
