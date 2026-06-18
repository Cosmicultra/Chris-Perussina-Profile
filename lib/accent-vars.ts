import type { AccentTheme, Brand } from "@/lib/profile";

export const ACCENT_CSS_VARS: Record<
  AccentTheme,
  { active: string; activeHover: string }
> = {
  "steel-blue": {
    active: "#3d6a94",
    activeHover: "#4a7cab",
  },
  "muted-gold": {
    active: "#8b7355",
    activeHover: "#a08668",
  },
};

export function brandToAccent(brand: Brand | null): AccentTheme {
  if (brand === "advisorpilot") return "muted-gold";
  return "steel-blue";
}

export function applyAccentCssVars(accent: AccentTheme) {
  const vars = ACCENT_CSS_VARS[accent];
  document.documentElement.style.setProperty("--accent-active", vars.active);
  document.documentElement.style.setProperty("--accent-active-hover", vars.activeHover);
}
