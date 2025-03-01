'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, ThemeProviderProps as NextThemesProviderProps } from 'next-themes';
import { TooltipProvider } from '@/components/ui/tooltip';
import { UIProvider } from './ui-context';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';
import { ModalProvider } from './modal-context';

interface ThemeProviderProps extends NextThemesProviderProps {
  defaultLayout?: number[];
  cookieSidebarOpen?: boolean;
  cookieRightPanelOpen?: boolean;
}

export const ThemeProvider = ({
  children,
  defaultLayout,
  cookieSidebarOpen,
  cookieRightPanelOpen,
  ...props
} : ThemeProviderProps) => {
  return (
    <NextThemesProvider {...props}>
      <UIProvider
        defaultLayout={defaultLayout}
        cookieSidebarOpen={cookieSidebarOpen}
        cookieRightPanelOpen={cookieRightPanelOpen}
      >
        <TooltipProvider delayDuration={100}>
          <ModalProvider>
            <NextTopLoader
              showSpinner={false}
              easing="ease"
              color="#FFE974"
              height={2}
            />
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              }}
            />
            {children}
          </ModalProvider>
        </TooltipProvider>
      </UIProvider>
    </NextThemesProvider>
  );
}
