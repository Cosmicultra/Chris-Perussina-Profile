import type { AccentTheme } from "@/lib/profile";

const accentClasses: Record<AccentTheme, { cta: string; ring: string; badge: string }> = {
  "steel-blue": {
    cta: "bg-accent hover:bg-accent-hover",
    ring: "ring-accent/40",
    badge: "border-accent/30 text-accent-light",
  },
  "muted-gold": {
    cta: "bg-gold hover:bg-gold-hover",
    ring: "ring-gold/40",
    badge: "border-gold/30 text-gold-light",
  },
};

export function getAccentClasses(accent: AccentTheme) {
  return accentClasses[accent];
}
