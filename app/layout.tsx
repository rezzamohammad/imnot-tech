import type { Metadata, Viewport } from "next";
import { Orbitron, JetBrains_Mono, Share_Tech_Mono, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "700", "900"],
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});
const shareTech = Share_Tech_Mono({
  subsets: ["latin"],
  variable: "--font-sharetech",
  weight: "400",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "imnot.tech // we don't know what we're building yet",
  description:
    "A mysterious, hyper-hyped technology company from the year 2077. Building something revolutionary. Status: unclear. ETA: forever.",
  keywords: [
    "imnot.tech",
    "vaporware",
    "AI startup",
    "cyberpunk",
    "coming soon forever",
  ],
  authors: [{ name: "imnot.tech" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "imnot.tech",
    description: "We don't know what we're building yet. But it will be revolutionary.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#04050a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${jetbrains.variable} ${shareTech.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
