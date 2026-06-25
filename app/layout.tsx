import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const BASE_URL = 'https://rahmativaldy.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Rahmat Ivaldy | Frontend Developer & Mobile Developer',
  description:
    'Frontend Developer, Mobile Developer, and UI/UX Designer focused on Flutter, Next.js, TypeScript, and modern web experiences.',
  keywords: [
    'Flutter Developer',
    'Frontend Developer',
    'Next.js Developer',
    'React Developer',
    'Mobile Developer',
    'UI UX Designer',
    'Rahmat Ivaldy',
    'RahmatOS',
  ],
  authors: [{ name: 'Rahmat Ivaldy', url: BASE_URL }],
  creator: 'Rahmat Ivaldy',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Rahmat Ivaldy | Frontend Developer & Mobile Developer',
    description:
      'Frontend Developer, Mobile Developer, and UI/UX Designer focused on Flutter, Next.js, TypeScript, and modern web experiences.',
    url: BASE_URL,
    siteName: 'RahmatOS — Rahmat Ivaldy Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rahmat Ivaldy | Frontend & Mobile Developer',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rahmat Ivaldy | Frontend Developer & Mobile Developer',
    description:
      'Frontend Developer, Mobile Developer, and UI/UX Designer focused on Flutter, Next.js, TypeScript, and modern web experiences.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rahmat Ivaldy',
  jobTitle: 'Frontend Developer & Mobile Developer',
  url: BASE_URL,
  email: 'rahmativaldy65@gmail.com',
  knowsAbout: ['Flutter', 'Next.js', 'TypeScript', 'React', 'Firebase', 'UI/UX Design'],
  sameAs: [
    'https://github.com/rahmativaldy',
    'https://www.linkedin.com/in/rahmat-ivaldy',
  ],
};

// Google Analytics Measurement ID placeholder
// Set NEXT_PUBLIC_GA_ID in .env.local to activate
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Theme initializer — runs before paint to avoid FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';if(t==='dark')document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){}})()`,
          }}
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics (loads only when NEXT_PUBLIC_GA_ID is set) */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        {/* Vercel Analytics — zero-config, tree-shaken in non-Vercel environments */}
        <Analytics />
      </body>
    </html>
  );
}
