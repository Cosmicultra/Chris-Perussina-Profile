"use client";

import Image from "next/image";
import { useLayoutEffect } from "react";
import { motion, type Variants } from "motion/react";
import type { Profile, ProfileLinkSection } from "@/lib/profile";
import { ACCENT_CSS_VARS } from "@/lib/accent-vars";
import { FeaturedCTA } from "@/components/FeaturedCTA";
import { LinkCard } from "@/components/LinkCard";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollNarrative } from "@/lib/scroll-narrative-context";

type LinkSectionProps = {
  section: ProfileLinkSection;
  sectionIndex: number;
  featuredCTA?: Profile["featuredCTA"];
  defaultAccent: Profile["theme"]["accent"];
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function LinkSection({
  section,
  sectionIndex,
  featuredCTA,
  defaultAccent,
}: LinkSectionProps) {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15, once: true });
  const narrative = useScrollNarrative();
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionAccent = section.accent ?? defaultAccent;
  const accentColor = ACCENT_CSS_VARS[sectionAccent].active;

  useLayoutEffect(() => {
    if (!narrative || !ref.current) return;
    return narrative.registerSection(section.brand, ref.current);
  }, [narrative, section.brand, ref]);

  return (
    <section
      ref={ref}
      data-brand={section.brand}
      className={`transition-all duration-700 ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
      style={{ transitionDelay: `${sectionIndex * 0.08}s` }}
      aria-labelledby={`section-${sectionIndex}`}
    >
      <h2
        id={`section-${sectionIndex}`}
        className="relative mb-3 flex items-center gap-2 pb-2 text-[11px] font-semibold tracking-[0.2em] text-muted uppercase"
      >
        {section.logo ? (
          <Image
            src={section.logo}
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 rounded object-contain"
            aria-hidden
          />
        ) : null}
        {section.title}
        <span
          className={`absolute bottom-0 left-0 h-px transition-all duration-700 ease-out ${
            isInView ? "w-full" : "w-0"
          }`}
          style={{ backgroundColor: accentColor, opacity: 0.5 }}
          aria-hidden
        />
      </h2>
      {featuredCTA && sectionIndex === 0 ? (
        <div className="mb-2.5">
          <FeaturedCTA cta={featuredCTA} accent={sectionAccent} />
        </div>
      ) : null}
      <motion.div
        className="flex flex-col gap-2.5"
        variants={prefersReducedMotion ? undefined : listVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        animate={isInView ? "visible" : "hidden"}
      >
        {section.links.map((link) => (
          <motion.div key={link.url} variants={prefersReducedMotion ? undefined : itemVariants}>
            <LinkCard link={link} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
