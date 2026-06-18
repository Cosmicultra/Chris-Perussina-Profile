"use client";

import { useEffect, useRef, useState } from "react";
import { getScrollSnapshot } from "@/lib/scroll-context";
import { registerScrollVisualEffect } from "@/lib/scroll-visual-effects";

export function useScrollThreshold(threshold: number) {
  const [isPastThreshold, setIsPastThreshold] = useState(false);
  const thresholdRef = useRef(threshold);
  const isPastRef = useRef(false);

  thresholdRef.current = threshold;

  useEffect(() => {
    const update = () => {
      const next = getScrollSnapshot().scrollY > thresholdRef.current;
      if (next === isPastRef.current) return;
      isPastRef.current = next;
      setIsPastThreshold(next);
    };

    update();
    return registerScrollVisualEffect(update);
  }, []);

  return isPastThreshold;
}
