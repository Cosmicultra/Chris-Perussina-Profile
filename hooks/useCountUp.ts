"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ParsedStat =
  | { type: "numeric"; target: number; suffix: string }
  | { type: "text"; value: string };

export function parseStatValue(value: string): ParsedStat {
  const match = value.match(/^(\d+)(.*)$/);
  if (match) {
    return { type: "numeric", target: parseInt(match[1], 10), suffix: match[2] };
  }
  return { type: "text", value };
}

type UseCountUpOptions = {
  enabled: boolean;
  duration?: number;
};

export function useCountUp(value: string, { enabled, duration = 1200 }: UseCountUpOptions) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const parsed = useMemo(() => parseStatValue(value), [value]);
  const rafRef = useRef(0);
  const hasAnimatedRef = useRef(false);

  const numericTarget = parsed.type === "numeric" ? parsed.target : 0;
  const numericSuffix = parsed.type === "numeric" ? parsed.suffix : "";
  const textValue = parsed.type === "text" ? parsed.value : "";
  const finalDisplay =
    parsed.type === "numeric" ? `${numericTarget}${numericSuffix}` : textValue;

  const [display, setDisplay] = useState(finalDisplay);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);

    if (parsed.type === "text") {
      setDisplay(textValue);
      return;
    }

    if (prefersReducedMotion || !enabled) {
      setDisplay(finalDisplay);
      return;
    }

    if (hasAnimatedRef.current) {
      setDisplay(finalDisplay);
      return;
    }

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - (1 - progress) ** 3;
      const current = Math.round(eased * numericTarget);
      setDisplay(`${current}${numericSuffix}`);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        hasAnimatedRef.current = true;
        setDisplay(finalDisplay);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [
    duration,
    enabled,
    prefersReducedMotion,
    parsed.type,
    numericTarget,
    numericSuffix,
    textValue,
    finalDisplay,
  ]);

  return { display, isNumeric: parsed.type === "numeric", isText: parsed.type === "text" };
}
