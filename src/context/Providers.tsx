import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';
import deepmerge from 'deepmerge';

// PROVIDERS
import { ReactQueryProvider } from '@/context/react-query-context';
import { ApolloClientContext } from '@/context/apollo-client-context';
import { AuthProvider } from '@/context/auth-context';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/context/theme-context';
import { OneSignalContext } from '@/context/one-signal-context';
import { cookies } from 'next/headers';
import { UIProvider } from './ui-context';
import { MapContext } from './map-context';
import { getMessages } from 'next-intl/server';
import { getFallbackLanguage } from '@/lib/i18n/fallback';
import { SupabaseProvider } from './supabase-context';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ModalProvider } from './modal-context';

export default async function Provider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  // NEXT-INTL
  const userMessages = await getMessages({ locale });
  const fallbackMessages = await getMessages({ locale: getFallbackLanguage({ locale }) });
  const messages = deepmerge(fallbackMessages, userMessages);
  // UI
  const layout = cookies().get("ui:layout");
  const sidebarCollapsed = cookies().get("ui-sidebar:collapsed");
  const rightPanelCollapsed = cookies().get("ui-right-panel:collapsed");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const cookieSidebarCollapsed = sidebarCollapsed ? JSON.parse(sidebarCollapsed.value) : undefined
  const cookieRightPanelCollapsed = rightPanelCollapsed ? JSON.parse(rightPanelCollapsed.value) : undefined
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SupabaseProvider locale={locale}>
        <ReactQueryProvider>
          {/* <ApolloClientContext> */}
            <AuthProvider>
              <OneSignalContext>
                <MapContext>
                  <ThemeProvider
                    // NextThemesProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    // UIProvider
                    defaultLayout={defaultLayout}
                    cookieSidebarCollapsed={cookieSidebarCollapsed}
                    cookieRightPanelCollapsed={cookieRightPanelCollapsed}
                  >
                    {children}
                  </ThemeProvider>
                </MapContext> 
              </OneSignalContext>
            </AuthProvider>
          {/* </ApolloClientContext> */}
        </ReactQueryProvider>
      </SupabaseProvider>
    </NextIntlClientProvider>
  );
}
