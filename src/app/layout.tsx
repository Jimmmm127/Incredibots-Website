import type { Metadata, Viewport } from "next";
import { Inter_Tight, Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://incredibots26336.org";
const TITLE = "Incredibots — FTC Team #26336";
const DESCRIPTION =
  "FTC Team #26336 — middle and high schoolers from Sammamish, WA competing at the highest level of robotics. 3× Worlds qualified. 20+ major awards.";
const ICON_SVG =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23e63946'/><stop offset='1' stop-color='%233d9be9'/></linearGradient></defs><circle cx='16' cy='16' r='15' fill='url(%23g)'/><text x='16' y='21' text-anchor='middle' font-family='Arial' font-weight='bold' font-size='13' fill='white'>IB</text></svg>";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Incredibots FTC #26336",
  },
  description: DESCRIPTION,
  applicationName: "Incredibots",
  keywords: [
    "FTC",
    "FIRST Tech Challenge",
    "Team 26336",
    "Incredibots",
    "robotics",
    "Sammamish",
    "Washington",
    "STEM",
    "high school robotics",
  ],
  authors: [{ name: "Incredibots FTC Team #26336" }],
  creator: "Incredibots FTC Team #26336",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Incredibots",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: ICON_SVG },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f1521",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${interTight.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
