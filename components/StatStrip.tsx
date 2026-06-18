"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Profile } from "@/lib/profile";
import { AnimatedModal, useModalFocus } from "@/components/AnimatedModal";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type StatStripProps = {
  stats: Profile["stats"];
};

type StatCellProps = {
  stat: Profile["stats"][number];
  index: number;
  onSelect: (index: number) => void;
  inView: boolean;
};

function StatCell({ stat, index, onSelect, inView }: StatCellProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { display, isText } = useCountUp(stat.value, { enabled: inView });
  const textRevealClass =
    isText && inView && !prefersReducedMotion ? "animate-hero-text-reveal" : "";

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-label={`${stat.value} ${stat.label}. Tap for details.`}
      aria-haspopup="dialog"
      className="rounded-xl border border-border/60 bg-card/40 px-2 py-2.5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-border-hover hover:bg-card/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-active)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
    >
      <p
        className={`font-serif text-lg text-foreground sm:text-xl ${textRevealClass}`}
        style={isText && !inView && !prefersReducedMotion ? { opacity: 0 } : undefined}
      >
        {display}
      </p>
      <p className="mt-1 text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">
        {stat.label}
      </p>
    </button>
  );
}

export function StatStrip({ stats }: StatStripProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeStat = activeIndex !== null ? stats[activeIndex] : null;
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -5% 0px",
    once: true,
  });
  const closeButtonRef = useModalFocus(activeIndex !== null);

  return (
    <>
      <div
        ref={ref}
        className="animate-fade-in-delay-6 grid grid-cols-3 gap-2.5 text-center"
        aria-label="Career highlights"
      >
        {stats.map((stat, index) => (
          <StatCell
            key={`${stat.value}-${stat.label}`}
            stat={stat}
            index={index}
            onSelect={setActiveIndex}
            inView={isInView}
          />
        ))}
      </div>

      <AnimatedModal
        open={activeStat !== null}
        onClose={() => setActiveIndex(null)}
        ariaLabelledBy="stat-dialog-title"
      >
        {activeStat ? (
          <>
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p id="stat-dialog-title" className="font-serif text-2xl text-foreground">
                  {activeStat.value}
                </p>
                <p className="mt-0.5 text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">
                  {activeStat.label}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-active)]/40"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
            <p className="text-sm leading-relaxed text-foreground-muted">{activeStat.description}</p>
          </>
        ) : null}
      </AnimatedModal>
    </>
  );
}
