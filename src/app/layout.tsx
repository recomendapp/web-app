import '@/styles/globals.css'
import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { cn } from "@/lib/utils"
import { fontSans } from "@/lib/fonts"

import { UserProvider, useUser } from '@/context/user'

import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from '@/components/sidebar'
import { Navbar } from '@/components/navbar'
import { Header } from '@/components/header'

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryProvider } from '@/utils/ReactQuery'
import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1380362797599640"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body
          className={cn(
            "h-screen w-screen flex flex-col bg-black font-sans antialiased",
            fontSans.variable
          )}
        >
          <UserProvider>
            <ReactQueryProvider>
              <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <div className="grid lg:p-2 lg:gap-2 lg:grid-cols-5 h-full">
                  <Sidebar className="" />
                  <div className="flex flex-col bg-background col-span-3 lg:col-span-4 overflow-y-auto rounded-md">
                    <Header />
                    <div className='flex-grow relative pb-[150px] lg:pb-0' >
                      {children}
                    </div>
                  </div>
                </div>
                <Navbar className=' z-[50] fixed w-full bottom-0 lg:hidden h-navbar'/>
                <ToastContainer 
                  position='top-center' 
                  theme='colored'
                  autoClose={3000} 
                  hideProgressBar={false} 
                  pauseOnHover={false}
                  draggable
                  closeOnClick
                />
              </ThemeProvider>
            </ReactQueryProvider>
          </UserProvider>
        </body>
    </html>
  )
}



/*
<html lang="en" suppressHydrationWarning>
      <head />
      <body
          className={cn(
            "h-screen w-screen flex flex-col bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <UserProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="grid lg:grid-cols-5 h-full overflow-hidden">
                <Sidebar className="hidden border-r lg:block" />
                <div className="col-span-3 lg:col-span-4 overflow-x-hidden overflow-y-auto">
                  <Header />
                  <div className=' bg-red-700 py-4 min-h-full  pb-navbar lg:pb-0' >
                    {children}
                  </div>
                </div>
              </div>
              <Navbar className='lg:hidden'/>
              <ToastContainer 
                position='top-center' 
                theme='colored'
                autoClose={3000} 
                hideProgressBar={false} 
                pauseOnHover={false}
                draggable
                closeOnClick
              />
            </ThemeProvider>
          </UserProvider>
          
        </body>
    </html>
    */
