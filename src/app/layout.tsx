import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import localFont from 'next/font/local';

// ✅ دامنه‌ی اصلی سایتت
const SITE_URL = "https://www.webdesignwithsina.ir";

// Configure the font with its source files, weights, and styles
const danaFont = localFont({
  src: [
    {
      path: '../../public/fonts/dana-regular.woff',
      weight: '400', // Specify weight for regular font
      style: 'normal',
    },
    {
      path: '../../public/fonts/dana-regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-dana',
  
});
const yekanFont = localFont({
  src: [
    {
      path: '../../public/fonts/YekanBakh-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/YekanBakh-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-yekan',
  
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "WebDesignWithSina",
    template: "%s | WebDesignWithSina",
  },
  
  description:
    "We design & develop SEO-first websites using Next.js and Django. GEO marketing, performance, accessibility—done right.",
  
  keywords: [
    "Next.js web design",
    "Django backend",
    "SEO",
    "GEO marketing",
    "طراحی سایت",
    "سئو",
  ],
  authors: [{ name: "WebDesignWithSina", url: SITE_URL }],
  creator: "WebDesignWithSina",
  publisher: "WebDesignWithSina",
  category: "technology",
  alternates: {
    canonical: "/",
    languages: { "fa-IR": "/"}, // اگر زبان انگلیسی نداری، این خط رو بردار languages: { "fa-IR": "/", "en-US": "/en" },
  },
  // og:
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "WebDesignWithSina",
    title: "WebDesignWithSina — Next.js & Django Web Design",
    description:
      "SEO-first websites with Next.js + Django. Fast, accessible, and optimized for growth.",
    locale: "fa_IR",
    images: [
      {
        url: "/og/cover.jpg", // ← تصویر OG واقعی بذار (1200×630)
        width: 1200,
        height: 630,
        alt: "WebDesignWithSina — SEO-first web design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@WebDesignWithSina",   // اگر ندارید حذفش کنید
    creator: "@WebDesignWithSina",// اگر ندارید حذفش کنید
    title: "WebDesignWithSina — Next.js & Django Web Design",
    description:
      "SEO-first websites with Next.js + Django. Fast, accessible, and optimized for growth.",
    images: ["/og/cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icons/favicon.ico" },
      { url: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/icons/safari-pinned-tab.svg", color: "#000000" }],
  },
  manifest: "/site.webmanifest", // اگر داری
  verification: {
    google: "GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE", // اگر داری
    yandex: "",
    me: ["mailto:sina47822@gmail.com"], // راه‌های ارتباطی
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <html lang="fa" dir="rtl" suppressHydrationWarning className={`${danaFont.variable} ${yekanFont.variable}`}>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
  );
}
