import '@/styles/globals.css';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils/utils';
import { fontSans } from '@/lib/fonts';

// import { UserProvider } from '@/context/UserProvider';

import NextTopLoader from 'nextjs-toploader';

import { ThemeProvider } from '@/context/ThemeProvider/ThemeProvider';
import { Sidebar } from '@/components/modules/Sidebar/Sidebar';
import { Navbar } from '@/components/modules/Navbar/Navbar';
import { Header } from '@/components/modules/Header/Header';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import { ApolloClientProvider } from '@/context/ApolloClientProvider';
import { AuthProvider } from '@/context/AuthContext/AuthProvider';

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
        <ApolloClientProvider>
          <AuthProvider>
          {/* <UserProvider> */}
            <ReactQueryProvider>
              <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <NextTopLoader 
                  showSpinner={false}
                  easing='ease'
                  color='#FFE974'
                  height={2}
                />
                <div className="flex items-start h-full gap-2 lg:p-2">
                  <Sidebar />
                  <div className="flex flex-col bg-background col-span-3 lg:col-span-4 overflow-y-auto overflow-x-hidden rounded-md h-full w-full">
                    <Header />
                    <div className="flex-grow relative lg:pb-0 h-full">
                      {children}
                    </div>
                  </div>
                </div>
                {/* <Navbar className=" z-[50] fixed w-full bottom-0 lg:hidden h-navbar" /> */}
                <ToastContainer
                  position="top-center"
                  theme="dark"
                  autoClose={3000}
                  hideProgressBar={false}
                  pauseOnHover={false}
                  draggable
                  closeOnClick
                />
              </ThemeProvider>
            </ReactQueryProvider>
          </AuthProvider>
          {/* </UserProvider> */}
        </ApolloClientProvider>
      </body>
    </html>
  );
}