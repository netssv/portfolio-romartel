import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import siteData from "@/src/data/siteData.json";
import { NoiseOverlay } from "@/src/components/animations/NoiseOverlay";
import { SpotlightCursor } from "@/src/components/animations/SpotlightCursor";
import { DesignProvider } from "@/src/context/DesignContext";
import { LanguageProvider } from "@/src/context/LanguageContext";
import { ChatBot } from "@/src/components/ui/chatbot/ChatBotClient";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://romartel.vercel.app"),
  title: siteData.metadata.title,
  description: siteData.metadata.description,
  keywords: siteData.metadata.keywords,
  authors: [{ name: siteData.metadata.author }],
  alternates: {
    canonical: "https://romartel.vercel.app",
  },
  openGraph: {
    title: siteData.metadata.title,
    description: siteData.metadata.description,
    url: "https://romartel.vercel.app",
    siteName: siteData.metadata.title,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/avatar.webp",
        width: 800,
        height: 800,
        alt: siteData.metadata.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteData.metadata.title,
    description: siteData.metadata.description,
    creator: "@netssv",
    images: ["/avatar.webp"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://romartel.vercel.app/#person",
        name: siteData.profile.name,
        jobTitle: siteData.profile.title,
        url: "https://romartel.vercel.app",
        image: "https://romartel.vercel.app/avatar.webp",
        email: `mailto:${siteData.metadata.email}`,
        sameAs: [
          siteData.metadata.socialLinks.linkedin,
          siteData.metadata.socialLinks.github,
          siteData.metadata.socialLinks.twitter,
          "https://pypi.org/project/caniarun/",
          "https://pypi.org/project/Btkey-Sync/",
          "https://chromewebstore.google.com/detail/whathappened/jkohefabbnobompohkedfaodcnfdplom",
          "https://cal.com/rodrigo-martel/30min?overlayCalendar=true"
        ],
        worksFor: {
          "@type": "Organization",
          name: siteData.experience[0].company,
        },
        knowsAbout: [
          "Marketing Operations",
          "Workflow Automation",
          "CRM Integrations",
          "Make.com",
          "Zapier",
          "Python Scripting",
          "Power BI",
          "Next.js",
          "Search Engine Optimization",
          "Conversion Rate Optimization"
        ]
      },
      {
        "@type": "ProfilePage",
        "@id": "https://romartel.vercel.app/#webpage",
        url: "https://romartel.vercel.app",
        name: siteData.metadata.title,
        about: { "@id": "https://romartel.vercel.app/#person" },
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://romartel.vercel.app/#website",
          name: "Rodrigo Martel Systems Hub",
          url: "https://romartel.vercel.app",
        },
      },
    ],
  };

  return (

    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg-base text-text-secondary overflow-x-hidden relative">
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Theme detection — runs before paint to prevent FOUC */}
        <Script id="theme-override" strategy="beforeInteractive">
          {`
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
          `}
        </Script>

        {/* Third-Party Analytics — Only loaded in production to keep local dev fast & clean */}
        {process.env.NODE_ENV === "production" && (
          <>
            {/* Microsoft Clarity */}
            <Script
              id="microsoft-clarity"
              strategy="afterInteractive"
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

            {/* Google Analytics 4 */}
            <Script
              id="ga4-loader"
              strategy="afterInteractive"
              src="https://www.googletagmanager.com/gtag/js?id=G-J2MMB7MF32"
            />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-J2MMB7MF32');
                `,
              }}
            />
          </>
        )}

        <LanguageProvider>
          <DesignProvider>
            <NoiseOverlay />
            <SpotlightCursor />
            {children}
            <ChatBot />
          </DesignProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
