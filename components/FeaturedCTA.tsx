import { Phone } from "lucide-react";
import type { Profile } from "@/lib/profile";

type FeaturedCTAProps = {
  cta: Profile["featuredCTA"];
  accent: Profile["theme"]["accent"];
};

export function FeaturedCTA({ cta }: FeaturedCTAProps) {
  return (
    <a
      href={cta.url}
      target="_blank"
      rel="noopener noreferrer"
      className="animate-cta-ambient-breathe group flex w-full items-center gap-4 rounded-xl border border-white/10 px-5 py-4 text-foreground shadow-lg shadow-black/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-xl hover:shadow-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-active)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
      style={{ backgroundColor: "var(--accent-active)" }}
    >
      <div className="animate-cta-icon-breathe flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
        <Phone className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1 text-left">
        <p className="text-base font-semibold">{cta.label}</p>
        <p className="mt-0.5 text-sm text-white/75">{cta.description}</p>
      </div>
      <span className="text-sm font-medium text-white/80 transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </a>
  );
}
