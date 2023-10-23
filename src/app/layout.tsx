import '@/styles/globals.css';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/lib/fonts';

// import { UserProvider } from '@/context/UserProvider';

import NextTopLoader from 'nextjs-toploader';

import { ThemeProvider } from '@/context/ThemeProvider/ThemeProvider';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Navbar } from '@/components/Navbar/Navbar';
import { Header } from '@/components/Header/Header';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import { ApolloClientProvider } from '@/context/ApolloClientProvider';
import { AuthProvider } from '@/context/AuthContext/AuthProvider';

import { cn } from "@/lib/utils/utils";
import { Box } from '@/components/Box/Box';
import Provider from '@/context/Provider';
import RightSidebar from '@/components/RightSidebar/RightSidebar';
import Layout from '@/components/Layout/Layout';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s • ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  manifest: '/manifest.webmanifest',
  icons: {
    apple: '/icons/icon-512x512.png',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'h-screen w-screen flex flex-col bg-background-border font-sans antialiased',
          fontSans.variable
        )}
      >
        <Provider>
          {/* <div className="flex items-start h-full gap-2 lg:p-2"> */}
          <div
            className={`
              flex
              h-[calc(100%-(var(--height-navbar)))]
              gap-2
              lg:p-2
              lg:h-full
            `}
          >
            <Layout>
              {children}
            </Layout>
          </div>
          <Navbar className=" z-[50] fixed w-full bottom-0 lg:hidden h-navbar" />
        </Provider>
      </body>
    </html>
  );
}