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
                {/* <div className="flex items-start h-full gap-2 lg:p-2"> */}
                <div
                  className={`
                    flex
                    h-[calc(100%-135px)]
                    gap-2
                    lg:p-2
                    lg:h-full
                  `}
                >
                  <Sidebar />
                  <Box className='h-full overflow-y-auto'>
                    <Header />
                    <div className="flex-grow relative lg:pb-0 h-full">
                      {children}
                    </div>
                  </Box>
                </div>
                <Navbar className=" z-[50] fixed w-full bottom-0 lg:hidden h-navbar" />
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