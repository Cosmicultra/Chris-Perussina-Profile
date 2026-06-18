import { HeroCutout } from "@/components/HeroCutout";
import { HeroName } from "@/components/HeroName";
import type { Profile } from "@/lib/profile";
type ProfileHeaderProps = {
  profile: Profile;
};

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const imageSrc = encodeURI(profile.profileImage);

  return (
    <header className="relative w-full overflow-visible">
      <div className="mx-auto w-full max-w-[480px] overflow-visible px-5 sm:px-6">
        <div className="relative h-[min(95vw,460px)] overflow-visible sm:h-[480px]">
          <div className="absolute inset-0 flex items-end justify-center overflow-visible">
            <HeroCutout
              src={imageSrc}
              alt={`${profile.name} portrait`}
              sizes="(max-width: 480px) calc(100vw - 2.5rem), 432px"
            />
          </div>
        </div>

        <div className="relative z-10 -mt-16 pb-1 text-center sm:-mt-24">
          <h1 className="hero-text-shadow text-[26px] font-bold tracking-tight text-foreground sm:text-[30px]">
            <HeroName name={profile.name} />
          </h1>
          <p className="hero-text-shadow animate-hero-text-delay-title mt-1.5 font-serif text-[15px] italic text-foreground-muted sm:text-[16px]">
            {profile.title}
          </p>
          {profile.bio ? (
            <p className="hero-text-shadow animate-hero-text-delay-bio mx-auto mt-2 max-w-[320px] text-[14px] leading-relaxed text-foreground-muted sm:text-[15px]">
              {profile.bio}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
