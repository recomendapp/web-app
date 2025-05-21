import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/lib/fonts';

import { cn } from '@/lib/utils';
import Providers from '@/context/Providers';
import Script from 'next/script';
import { getLangDir } from 'rtl-detect';

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
    default: siteConfig.name,
    template: `%s • ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
  manifest: '/manifest.webmanifest',
  icons: {
    apple: '/icons/icon-512x512.png',
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
      '/icons/icon-512x512.png',
      {
        url: '/icons/icon-512x512.png',
        media: '(device-width: 768px) and (device-height: 1024px)',
      },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout(props: RootLayoutProps) {
  const params = await props.params;

  const {
    lang
  } = params;

  const {
    children
  } = props;

  const direction = getLangDir(lang);
  return (
    <html lang={lang} dir={direction} suppressHydrationWarning>
      {process.env.NODE_ENV === 'production' ? (
        <Script
        defer
        src={process.env.NEXT_PUBLIC_ANAYLTICS_URL}
        data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_ID}
      />) : null}
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <Providers locale={lang}>{children}</Providers>
      </body>
    </html>
  );
}
