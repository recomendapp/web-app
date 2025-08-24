import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import Providers from '@/context/Providers';
import Script from 'next/script';
import { getLangDir } from 'rtl-detect';
import { routing, seoLocales } from '@/lib/i18n/routing';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} • ${siteConfig.tagline}`,
    template: `%s • ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  alternates: seoLocales(routing.defaultLocale, ''),
  manifest: '/manifest.webmanifest',
  icons: {
    apple: '/assets/icons/ios/512.png',
  },
  // itunes: {
  //   appId: '333903271',
  //   appArgument: 'myAppArgument',
  // },
  // appLinks: {
  //   ios: {
  //     app_name: siteConfig.name,
  //     app_store_id: '333903271',
  //     url: 'https://recomend.app/ios',
  //   },
  //   android: {
  //     package: 'com.example.android/package',
  //     app_name: 'app_name_android',
  //   },
  //   web: {
  //     url: 'https://recomend.app/',
  //     should_fallback: true,
  //   },
  // },
  appleWebApp: {
    title: siteConfig.name,
    statusBarStyle: 'default',
    startupImage: [
      '/assets/icons/ios/512.png',
      {
        url: '/assets/icons/ios/512.png',
        media: '(device-width: 768px) and (device-height: 1024px)',
      },
    ],
  },
  openGraph: {
    siteName: siteConfig.name,
    title: `${siteConfig.name} • ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
    ],
    type: 'website',
    url: siteConfig.url,
  },
  twitter: {
    site: `@${siteConfig.socials.twitter.username}`,
    creator: `@${siteConfig.by.twitter}`,
  }
};

export default async function LangLayout({
  children,
  params
} : {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const direction = getLangDir(lang);
  return (
    <html lang={lang} dir={direction} suppressHydrationWarning>
      <head>
        <link rel="search" type="application/opensearchdescription+xml" title="Recomend" href="/opensearch.xml" />
      </head>
      {process.env.NODE_ENV === 'production' ? (
        <Script
        defer
        src={process.env.ANAYLTICS_URL}
        data-website-id={process.env.ANALYTICS_ID}
      />) : null}
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <Providers locale={lang}>{children}</Providers>
      </body>
    </html>
  );
}
