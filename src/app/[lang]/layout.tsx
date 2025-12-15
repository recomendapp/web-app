import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Providers } from '@/context/Providers';
import Script from 'next/script';
import { languages } from '@/lib/i18n/settings';

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
  // alternates: seoLocales(routing.defaultLocale, ''),
  manifest: '/manifest.webmanifest',
  icons: {
    apple: '/assets/icons/ios/512.png',
  },
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

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function LangLayout({
  children,
  params
} : {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  // Disable for RTL languages for now
  // const direction = getLangDir(lang);
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link rel="search" type="application/opensearchdescription+xml" title="Recomend" href="/opensearch.xml" />
      </head>
      {process.env.NODE_ENV === 'production' && (
        <Script
        defer
        src={process.env.ANALYTICS_URL}
        data-website-id={process.env.ANALYTICS_ID}
        />
      )}
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
