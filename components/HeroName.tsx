"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type HeroNameProps = {
  name: string;
  className?: string;
};

export function HeroName({ name, className }: HeroNameProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const words = name.split(/\s+/);

  if (prefersReducedMotion) {
    return <span className={className}>{name}</span>;
  }

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block animate-hero-word-reveal"
          style={{ animationDelay: `${0.9 + index * 0.12}s` }}
        >
          {word}
          {index < words.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </span>
  );
}
