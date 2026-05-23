/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Ashu Yadav | Full Stack Developer & AI Enthusiast",
  description:
    "Portfolio of Ashu Yadav — a passionate MERN Stack developer and BTech student building immersive web experiences, AI-powered products, and modern scalable applications.",
  keywords: [
    "Ashu Yadav",
    "Full Stack Developer",
    "MERN Stack",
    "React Developer",
    "Next.js",
    "AI Developer",
    "Portfolio",
    "BTech",
  ],
  authors: [{ name: "Ashu Yadav" }],
  creator: "Ashu Yadav",
  openGraph: {
    type: "website",
    title: "Ashu Yadav | Full Stack Developer",
    description: "Building the future, one commit at a time.",
    siteName: "Ashu Yadav Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashu Yadav | Full Stack Developer",
    description: "Building the future, one commit at a time.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-background text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}


