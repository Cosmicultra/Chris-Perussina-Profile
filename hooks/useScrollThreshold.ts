"use client";

import { useScrollY } from "@/lib/scroll-context";

export function useScrollThreshold(threshold: number) {
  const scrollY = useScrollY();
  return scrollY > threshold;
}
