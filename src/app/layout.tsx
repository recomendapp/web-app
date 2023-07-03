import '@/styles/globals.css'
import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { cn } from "@/lib/utils"
import { fontSans } from "@/lib/fonts"

import { UserProvider, useUser } from '@/hooks/user'

import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from '@/components/sidebar'
import { Navbar } from '@/components/navbar'
import { Header } from '@/components/header'

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
      <head />
      <body
          className={cn(
            "h-screen w-screen flex flex-col bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <UserProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <div className="grid lg:grid-cols-5 h-full">
                <Sidebar className="hidden border-r lg:block  " />
                <div className="flex flex-col col-span-3 lg:col-span-4 overflow-y-auto">
                  <Header />
                  <div className='flex-grow relative pb-navbar lg:pb-0' >
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
