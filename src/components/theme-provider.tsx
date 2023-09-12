'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  consoleMessage();
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

function consoleMessage() {
  const v = process.env.NEXT_PUBLIC_APP_VERSION ? `v${process.env.NEXT_PUBLIC_APP_VERSION}` : '';
  console.log(`\n%cRECOMEND ${v} 🎥`, 'color:#FFE974; background:#000; font-size:1.5rem; padding:0.15rem 0.25rem; margin: 1rem auto; font-family: Rockwell; border: 2px solid #FFE974; border-radius: 4px;font-weight: bold; text-shadow: 1px 1px 1px #948951;');

}