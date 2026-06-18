"use client";

import { useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import {
  ScrollContextProvider,
  computeScrollProgress,
  setScrollSnapshot,
} from "@/lib/scroll-context";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ScrollProviderProps = {
  children: ReactNode;
};

export function ScrollProvider({ children }: ScrollProviderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [lenisEnabled, setLenisEnabled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setLenisEnabled(false);

      const update = () => {
        setScrollSnapshot({
          scrollY: window.scrollY,
          progress: computeScrollProgress(window.scrollY),
        });
      };

      update();
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update, { passive: true });

      return () => {
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
      };
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    setLenisEnabled(true);

    const onScroll = ({ scroll }: { scroll: number }) => {
      setScrollSnapshot({
        scrollY: scroll,
        progress: computeScrollProgress(scroll),
      });
    };

    lenis.on("scroll", onScroll);
    onScroll({ scroll: lenis.scroll });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onResize = () => onScroll({ scroll: lenis.scroll });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      lenis.destroy();
      setLenisEnabled(false);
    };
  }, [prefersReducedMotion]);

  return <ScrollContextProvider enabled={lenisEnabled}>{children}</ScrollContextProvider>;
}
