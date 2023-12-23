import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/lib/fonts';

import { cn } from "@/lib/utils";
import Providers from '@/context/Providers';
import HelloNerd from '@/components/Console/HelloNerd';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  // viewportFit: 'cover'
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s • ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
  params: { lang: string }
}

export default async function LangLayout({ children, params: { lang } }: RootLayoutProps) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased',
          fontSans.variable
        )}
      >
        <HelloNerd />
        <Providers locale={lang}>
          {children}
        </Providers>
      </body>
    </html>
  );
}