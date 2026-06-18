"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import {
  Contact,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MessageSquare,
  QrCode,
  Youtube,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { XIcon } from "@/components/XIcon";
import { QRModal } from "@/components/QRModal";
import type { Profile, SocialPlatform } from "@/lib/profile";
import { useToast } from "@/lib/toast-context";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { downloadVCard } from "@/lib/vcard";

const socialIcons: Record<SocialPlatform, LucideIcon | typeof XIcon> = {
  linkedin: Linkedin,
  x: XIcon,
  github: Github,
  youtube: Youtube,
  instagram: Instagram,
  email: Mail,
  sms: MessageSquare,
  website: Globe,
};

const socialLabels: Record<SocialPlatform, string> = {
  linkedin: "LinkedIn",
  x: "X",
  github: "GitHub",
  youtube: "YouTube",
  instagram: "Instagram",
  email: "Email",
  sms: "Text",
  website: "Website",
};

type SocialRowProps = {
  profile: Profile;
  pageUrl: string;
};

const iconButtonClass =
  "social-tap-ripple relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-card text-muted transition-all duration-200 hover:border-border-hover hover:bg-card-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-active)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 1.45 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

async function copyFromUrl(platform: SocialPlatform, url: string) {
  const value =
    platform === "email"
      ? url.replace(/^mailto:/i, "")
      : platform === "sms"
        ? url.replace(/^sms:/i, "")
        : url;

  await navigator.clipboard.writeText(value);
}

function SocialIconWrapper({
  children,
  prefersReducedMotion,
  className,
}: {
  children: ReactNode;
  prefersReducedMotion: boolean;
  className: string;
}) {
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

export function SocialRow({ profile, pageUrl }: SocialRowProps) {
  const { social } = profile;
  const { showToast } = useToast();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [qrOpen, setQrOpen] = useState(false);

  const qrUrl =
    profile.meetingMode.qrTarget === "calendly" ? profile.featuredCTA.url : pageUrl;

  const hoverScale = prefersReducedMotion ? "" : "hover:scale-105";

  const handleSocialClick = async (
    event: MouseEvent<HTMLAnchorElement>,
    platform: SocialPlatform,
    url: string,
  ) => {
    if (platform !== "email" && platform !== "sms") return;

    event.preventDefault();
    try {
      await copyFromUrl(platform, url);
      showToast(platform === "email" ? "Email copied" : "Phone number copied");
    } catch {
      showToast("Could not copy to clipboard");
    }
  };

  const NavWrapper = prefersReducedMotion ? "nav" : motion.nav;
  const navProps = prefersReducedMotion
    ? { className: "animate-fade-in-delay-5 flex flex-wrap justify-center gap-3" }
    : {
        className: "flex flex-wrap justify-center gap-3",
        variants: containerVariants,
        initial: "hidden",
        animate: "visible",
      };

  return (
    <>
      <NavWrapper {...navProps} aria-label="Social and contact links">
        {social.map((item) => {
          const Icon = socialIcons[item.platform];
          const isX = item.platform === "x";
          const opensInApp = item.platform === "email" || item.platform === "sms";
          const isCopyAction = item.platform === "email" || item.platform === "sms";

          return (
            <SocialIconWrapper
              key={item.url}
              prefersReducedMotion={prefersReducedMotion}
              className={`${iconButtonClass} ${hoverScale}`}
            >
              <a
                href={item.url}
                onClick={(event) => {
                  if (isCopyAction) void handleSocialClick(event, item.platform, item.url);
                }}
                {...(opensInApp ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                aria-label={
                  isCopyAction
                    ? `${socialLabels[item.platform]} (copy to clipboard)`
                    : socialLabels[item.platform]
                }
                className="flex h-full w-full items-center justify-center"
              >
                {isX ? (
                  <XIcon className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                )}
              </a>
            </SocialIconWrapper>
          );
        })}

        <SocialIconWrapper
          prefersReducedMotion={prefersReducedMotion}
          className={`${iconButtonClass} ${hoverScale}`}
        >
          <button
            type="button"
            onClick={() => downloadVCard(profile)}
            aria-label="Save contact"
            className="flex h-full w-full items-center justify-center"
          >
            <Contact className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </SocialIconWrapper>

        <SocialIconWrapper
          prefersReducedMotion={prefersReducedMotion}
          className={`${iconButtonClass} ${hoverScale}`}
        >
          <button
            type="button"
            onClick={() => setQrOpen(true)}
            aria-label="Show QR code"
            className="flex h-full w-full items-center justify-center"
          >
            <QrCode className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </SocialIconWrapper>
      </NavWrapper>

      <QRModal open={qrOpen} onClose={() => setQrOpen(false)} url={qrUrl} />
    </>
  );
}
