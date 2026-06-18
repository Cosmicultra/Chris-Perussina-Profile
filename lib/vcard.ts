import type { Profile } from "@/lib/profile";

function escapeVCard(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function getSocialValue(profile: Profile, platform: "email" | "sms") {
  const link = profile.social.find((item) => item.platform === platform);
  if (!link) return undefined;

  if (platform === "email") {
    return link.url.replace(/^mailto:/i, "");
  }

  return link.url.replace(/^sms:/i, "");
}

export function buildVCard(profile: Profile): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVCard(profile.name)}`,
    `TITLE:${escapeVCard(profile.title)}`,
  ];

  const email = getSocialValue(profile, "email");
  const phone = getSocialValue(profile, "sms");

  if (email) {
    lines.push(`EMAIL;TYPE=INTERNET:${email}`);
  }

  if (phone) {
    lines.push(`TEL;TYPE=CELL:${phone}`);
  }

  if (profile.siteUrl) {
    lines.push(`URL:${profile.siteUrl}`);
  }

  const linkedin = profile.social.find((item) => item.platform === "linkedin");
  if (linkedin) {
    lines.push(`URL;TYPE=LinkedIn:${linkedin.url}`);
  }

  lines.push("END:VCARD");

  return lines.join("\r\n");
}

export function downloadVCard(profile: Profile) {
  const vcard = buildVCard(profile);
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "christopher-perussina.vcf";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function getPhoneFromProfile(profile: Profile) {
  return getSocialValue(profile, "sms");
}

export function getEmailFromProfile(profile: Profile) {
  return getSocialValue(profile, "email");
}
