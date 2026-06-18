"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { AccentTheme, Brand } from "@/lib/profile";

export type ScrollNarrativeState = {
  activeBrand: Brand | null;
  activeAccent: AccentTheme;
  sectionProgress: number;
  registerSection: (brand: Brand | undefined, element: HTMLElement | null) => () => void;
};

const ScrollNarrativeContext = createContext<ScrollNarrativeState | null>(null);

export function ScrollNarrativeProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: ScrollNarrativeState;
}) {
  return (
    <ScrollNarrativeContext.Provider value={value}>{children}</ScrollNarrativeContext.Provider>
  );
}

export function useScrollNarrative() {
  return useContext(ScrollNarrativeContext);
}
