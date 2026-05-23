import type { Metadata } from "next";
import { Inter_Tight, Barlow_Condensed } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Incredibots — Build what's next.",
  description:
    "FTC Team #26336 — middle and high schoolers from Sammamish, WA competing at the highest level of robotics. 3× Worlds qualified. 20+ major awards.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23e63946'/><stop offset='1' stop-color='%233d9be9'/></linearGradient></defs><circle cx='16' cy='16' r='15' fill='url(%23g)'/><text x='16' y='21' text-anchor='middle' font-family='Arial' font-weight='bold' font-size='13' fill='white'>IB</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${interTight.variable} ${barlowCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
