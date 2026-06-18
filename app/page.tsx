import { ComplianceFooter } from "@/components/ComplianceFooter";
import { LinkSection } from "@/components/LinkSection";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ScrollBackground } from "@/components/ScrollBackground";
import { ScrollNarrativeController } from "@/components/ScrollNarrativeController";
import { SocialRow } from "@/components/SocialRow";
import { StatStrip } from "@/components/StatStrip";
import { StickyCTA } from "@/components/StickyCTA";
import { StorySpine } from "@/components/StorySpine";
import { getProfile } from "@/lib/get-profile";

export default function HomePage() {
  const profile = getProfile();
  const pageUrl = profile.siteUrl ?? "https://chrisperussina.com";

  return (
    <main className="flex min-h-dvh flex-col pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <ProfileHeader profile={profile} />

      <ScrollNarrativeController defaultAccent={profile.theme.accent}>
        <ScrollBackground />

        <article className="relative mx-auto flex w-full max-w-[480px] flex-1 flex-col gap-6 px-5 pt-1 pb-24 sm:px-6 sm:pt-2">
          <StorySpine />

          <SocialRow profile={profile} pageUrl={pageUrl} />

          <StatStrip stats={profile.stats} />

          <div className="flex flex-col gap-8">
            {profile.linkSections.map((section, index) => (
              <div key={section.title} className="flex flex-col gap-8">
                <LinkSection
                  section={section}
                  sectionIndex={index}
                  featuredCTA={index === 0 ? profile.featuredCTA : undefined}
                  defaultAccent={profile.theme.accent}
                />
              </div>
            ))}
          </div>

          <ComplianceFooter compliance={profile.compliance} />
        </article>

        <StickyCTA cta={profile.featuredCTA} />
      </ScrollNarrativeController>
    </main>
  );
}
