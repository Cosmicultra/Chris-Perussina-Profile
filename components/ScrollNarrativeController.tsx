"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { applyAccentCssVars, brandToAccent } from "@/lib/accent-vars";
import type { AccentTheme, Brand, Profile } from "@/lib/profile";
import { ScrollNarrativeProvider } from "@/lib/scroll-narrative-context";

type ScrollNarrativeControllerProps = {
  children: ReactNode;
  defaultAccent: AccentTheme;
};

type ObservedSection = {
  brand?: Brand;
  ratio: number;
};

export function ScrollNarrativeController({
  children,
  defaultAccent,
}: ScrollNarrativeControllerProps) {
  const sectionsRef = useRef<Map<HTMLElement, ObservedSection>>(new Map());
  const [activeBrand, setActiveBrand] = useState<Brand | null>(null);
  const [sectionProgress, setSectionProgress] = useState(0);

  const activeAccent = useMemo(
    () => (activeBrand ? brandToAccent(activeBrand) : defaultAccent),
    [activeBrand, defaultAccent],
  );

  useEffect(() => {
    applyAccentCssVars(activeAccent);
  }, [activeAccent]);

  const updateActiveSection = useCallback(() => {
    let bestBrand: Brand | null = null;
    let bestRatio = 0;
    let progressSum = 0;
    let progressCount = 0;

    sectionsRef.current.forEach((section) => {
      progressSum += section.ratio;
      progressCount += 1;

      if (section.brand && section.ratio > bestRatio) {
        bestRatio = section.ratio;
        bestBrand = section.brand;
      }
    });

    setActiveBrand(bestBrand);
    setSectionProgress(progressCount > 0 ? progressSum / progressCount : 0);
  }, []);

  const registerSection = useCallback(
    (brand: Brand | undefined, element: HTMLElement | null) => {
      if (!element) return () => {};

      sectionsRef.current.set(element, { brand, ratio: 0 });

      const observer = new IntersectionObserver(
        ([entry]) => {
          sectionsRef.current.set(element, { brand, ratio: entry.intersectionRatio });
          updateActiveSection();
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
      );

      observer.observe(element);

      return () => {
        observer.disconnect();
        sectionsRef.current.delete(element);
        updateActiveSection();
      };
    },
    [updateActiveSection],
  );

  const value = useMemo(
    () => ({
      activeBrand,
      activeAccent,
      sectionProgress,
      registerSection,
    }),
    [activeAccent, activeBrand, registerSection, sectionProgress],
  );

  return <ScrollNarrativeProvider value={value}>{children}</ScrollNarrativeProvider>;
}

export type { Profile };
