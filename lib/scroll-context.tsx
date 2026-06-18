"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";

type ScrollSnapshot = {
  scrollY: number;
  progress: number;
};

const defaultSnapshot: ScrollSnapshot = { scrollY: 0, progress: 0 };

let snapshot: ScrollSnapshot = defaultSnapshot;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function setScrollSnapshot(next: ScrollSnapshot) {
  snapshot = next;
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return defaultSnapshot;
}

const ScrollContext = createContext<boolean>(false);

export function ScrollContextProvider({
  children,
  enabled,
}: {
  children: ReactNode;
  enabled: boolean;
}) {
  return <ScrollContext.Provider value={enabled}>{children}</ScrollContext.Provider>;
}

export function useScrollContext() {
  return useContext(ScrollContext);
}

export function useScrollY() {
  return useSyncExternalStore(subscribe, () => getSnapshot().scrollY, () => 0);
}

export function useScrollProgress() {
  return useSyncExternalStore(subscribe, () => getSnapshot().progress, () => 0);
}

export function useScrollSnapshot() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function computeScrollProgress(scrollY: number) {
  if (typeof window === "undefined") return 0;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  return scrollable > 0 ? Math.min(1, Math.max(0, scrollY / scrollable)) : 0;
}
