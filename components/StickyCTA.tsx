"use client";

import { Phone, X } from "lucide-react";
import type { Profile } from "@/lib/profile";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useEffect, useState } from "react";

type StickyCTAProps = {
  cta: Profile["featuredCTA"];
};

const DISMISS_KEY = "sticky-cta-dismissed";

export function StickyCTA({ cta }: StickyCTAProps) {
  const isPastThreshold = useScrollThreshold(320);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === "true");
  }, []);

  const visible = isPastThreshold && !dismissed;

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "true");
    setDismissed(true);
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      } ${prefersReducedMotion ? "duration-0" : ""}`}
    >
      <div className="mx-auto flex max-w-[480px] items-center gap-2">
        <a
          href={cta.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-w-0 flex-1 items-center gap-3 rounded-full border border-white/10 bg-card/90 px-4 py-3 text-foreground shadow-lg shadow-black/30 backdrop-blur-md transition-colors hover:bg-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-active)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-navy sm:mx-auto sm:max-w-sm"
          style={{ backgroundColor: "color-mix(in srgb, var(--accent-active) 88%, transparent)" }}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
            <Phone className="h-4 w-4" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-semibold">{cta.label}</p>
            <p className="truncate text-xs text-white/75">{cta.description}</p>
          </div>
          <span className="text-sm font-medium text-white/80 group-hover:translate-x-0.5">
            →
          </span>
        </a>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss schedule prompt"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card/90 text-muted backdrop-blur-md transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-active)]/40 sm:hidden"
        >
          <X className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
