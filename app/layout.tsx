import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import siteData from "@/src/data/siteData.json";
import { NoiseOverlay } from "@/src/components/animations/NoiseOverlay";
import { SpotlightCursor } from "@/src/components/animations/SpotlightCursor";
import { DesignProvider } from "@/src/context/DesignContext";
import { ClarityTracker } from "@/src/components/analytics/ClarityTracker";



const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: siteData.metadata.title,
  description: siteData.metadata.description,
  keywords: siteData.metadata.keywords,
  authors: [{ name: siteData.metadata.author }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg-base text-text-secondary overflow-x-hidden relative">
        <script
          id="theme-override"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var override = localStorage.getItem('theme-override');
                if (override === 'night' || override === 'dark') {
                  document.documentElement.classList.add('theme-dark');
                } else if (override === 'day' || override === 'light') {
                  document.documentElement.classList.remove('theme-dark');
                } else {
                  var hour = new Date().getHours();
                  if (hour >= 6 && hour < 18) {
                    document.documentElement.classList.remove('theme-dark');
                  } else {
                    document.documentElement.classList.add('theme-dark');
                  }
                }
              })();
            `,
          }}
        />
        <ClarityTracker projectId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || ""} />
        <DesignProvider>
          <NoiseOverlay />
          <SpotlightCursor />
          {children}
        </DesignProvider>
      </body>
    </html>
  );
}
