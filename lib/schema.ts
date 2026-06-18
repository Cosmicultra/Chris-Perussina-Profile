import type { Profile } from "@/lib/profile";

export function buildPersonSchema(profile: Profile, pageUrl: string) {
  const sameAs = profile.social.map((item) => item.url);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    ...(profile.bio ? { description: profile.bio } : {}),
    image: pageUrl ? new URL(profile.profileImage, pageUrl).toString() : profile.profileImage,
    url: profile.siteUrl ?? pageUrl,
    sameAs,
  };
}
