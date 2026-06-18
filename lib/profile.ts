import { z } from "zod";

const urlSchema = z.string().url("Must be a valid URL");

const socialPlatformSchema = z.enum([
  "linkedin",
  "x",
  "github",
  "youtube",
  "instagram",
  "email",
  "sms",
  "website",
]);

const iconSchema = z.enum([
  "globe",
  "file-text",
  "calendar",
  "mail",
  "phone",
  "briefcase",
  "book-open",
  "newspaper",
  "mic",
  "monitor-play",
  "video",
  "podcast",
  "chart-line",
  "building",
  "users",
  "link",
  "external-link",
  "chart-step-up",
]);

const accentSchema = z.enum(["steel-blue", "muted-gold"]);

const brandSchema = z.enum(["awa", "advisorpilot"]);

const linkSchema = z.object({
  title: z.string().min(1, "Link title is required"),
  description: z.string().min(1, "Link description is required").optional(),
  url: urlSchema,
  icon: iconSchema,
  image: z.string().min(1, "Image path is required").optional(),
  imageBackground: z.literal("white").optional(),
  featured: z.boolean().optional(),
  badge: z.string().min(1).optional(),
});

const linkSectionSchema = z.object({
  title: z.string().min(1, "Section title is required"),
  links: z.array(linkSchema).min(1, "Each section needs at least one link"),
  brand: brandSchema.optional(),
  logo: z.string().min(1).optional(),
  accent: accentSchema.optional(),
});

const featuredCTASchema = z.object({
  label: z.string().min(1, "CTA label is required"),
  url: urlSchema,
  description: z.string().min(1, "CTA description is required"),
});

const socialLinkSchema = z.object({
  platform: socialPlatformSchema,
  url: urlSchema,
});

const themeSchema = z.object({
  accent: accentSchema,
});

const statSchema = z.object({
  value: z.string().min(1, "Stat value is required"),
  label: z.string().min(1, "Stat label is required"),
  description: z.string().min(1, "Stat description is required"),
});

const meetingModeSchema = z.object({
  qrTarget: z.enum(["page", "calendly"]),
});

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  bio: z.string().optional(),
  profileImage: z.string().min(1, "Profile image path is required"),
  siteUrl: urlSchema.optional(),
  featuredCTA: featuredCTASchema,
  credentials: z.array(z.string()).optional(),
  social: z.array(socialLinkSchema),
  linkSections: z.array(linkSectionSchema).min(1, "At least one link section is required"),
  theme: themeSchema,
  compliance: z.string().min(1, "Compliance disclaimer is required"),
  stats: z.array(statSchema).min(1, "At least one stat is required"),
  meetingMode: meetingModeSchema,
});

export type Profile = z.infer<typeof profileSchema>;
export type ProfileLink = z.infer<typeof linkSchema>;
export type ProfileLinkSection = z.infer<typeof linkSectionSchema>;
export type SocialPlatform = z.infer<typeof socialPlatformSchema>;
export type LinkIcon = z.infer<typeof iconSchema>;
export type AccentTheme = z.infer<typeof accentSchema>;
export type Brand = z.infer<typeof brandSchema>;
