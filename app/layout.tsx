import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { AtmosphericLayer } from "@/components/AtmosphericLayer";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { ScrollProvider } from "@/components/ScrollProvider";
import { ToastProvider } from "@/components/ToastProvider";
import { getProfile } from "@/lib/get-profile";
import { buildPersonSchema } from "@/lib/schema";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const profile = getProfile();
const siteUrl = profile.siteUrl ?? "https://chrisperussina.com";
const description = profile.bio ?? profile.title;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} | ${profile.title}`,
  description,
  openGraph: {
    title: profile.name,
    description,
    url: siteUrl,
    siteName: profile.name,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: profile.name,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = buildPersonSchema(profile, siteUrl);

  return (
    <html lang="en" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-dvh">
        <ScrollProvider>
          <ToastProvider>
            <AtmosphericLayer />
            <CursorSpotlight />
            {children}
          </ToastProvider>
        </ScrollProvider>
      </body>
    </html>
  );
}
