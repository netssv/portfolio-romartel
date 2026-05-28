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
  openGraph: {
    title: siteData.metadata.title,
    description: siteData.metadata.description,
    url: 'https://romartel.vercel.app',
    siteName: siteData.metadata.title,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteData.metadata.title,
    description: siteData.metadata.description,
    creator: '@netssv',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteData.profile.name,
    jobTitle: siteData.profile.title,
    url: 'https://romartel.vercel.app',
    sameAs: [
      siteData.metadata.socialLinks.linkedin,
      siteData.metadata.socialLinks.github,
      siteData.metadata.socialLinks.twitter,
    ],
    alumniOf: '',
    worksFor: {
      '@type': 'Organization',
      name: siteData.experience[0].company
    }
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
        <script
          id="microsoft-clarity"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wxz1d7lj48");
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg-base text-text-secondary overflow-x-hidden relative">
        <DesignProvider>
          <NoiseOverlay />
          <SpotlightCursor />
          {children}
        </DesignProvider>
      </body>
    </html>
  );
}
