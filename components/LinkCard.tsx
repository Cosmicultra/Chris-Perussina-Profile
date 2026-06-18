"use client";

import { ArrowUpRight } from "lucide-react";
import type { ProfileLink } from "@/lib/profile";
import { getLinkIcon } from "@/lib/icons";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";

type LinkCardProps = {
  link: ProfileLink;
};

export function LinkCard({ link }: LinkCardProps) {
  const Icon = getLinkIcon(link.icon);
  const isFeatured = link.featured === true;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-card-shimmer group relative flex items-center gap-4 overflow-hidden rounded-xl border border-border border-white/5 bg-card p-4 max-sm:bg-card max-sm:backdrop-blur-none sm:backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-border-hover hover:bg-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-active)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-navy ${
        isFeatured ? "border-l-2 border-l-[var(--accent-active)] shadow-md shadow-black/15" : ""
      }`}
    >
      {link.image ? (
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg transition-all group-hover:shadow-[0_0_12px_2px_color-mix(in_srgb,var(--accent-active)_8%,transparent)] ${
            link.imageBackground === "white"
              ? "bg-white group-hover:bg-white"
              : "bg-slate/80 group-hover:bg-slate-light"
          }`}
        >
          <ImageWithSkeleton
            src={link.image}
            alt={link.title}
            width={40}
            height={40}
            className="h-full w-full object-contain p-1"
          />
        </div>
      ) : (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate/80 text-accent-light transition-all group-hover:bg-slate-light group-hover:text-foreground group-hover:shadow-[0_0_12px_2px_color-mix(in_srgb,var(--accent-active)_8%,transparent)]">
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </div>
      )}
      <div className="min-w-0 flex-1 text-left">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[15px] font-medium text-foreground">{link.title}</p>
          {link.badge ? (
            <span className="rounded-full border border-[var(--accent-active)]/30 bg-[var(--accent-active)]/10 px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-accent-light uppercase">
              {link.badge}
            </span>
          ) : null}
        </div>
        {link.description ? (
          <p className="mt-0.5 line-clamp-2 text-sm text-foreground-muted">{link.description}</p>
        ) : null}
      </div>
      <ArrowUpRight
        className="h-4 w-4 shrink-0 text-muted-dark opacity-60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-muted group-hover:opacity-100"
        strokeWidth={1.75}
      />
    </a>
  );
}
