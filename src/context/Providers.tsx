import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';
import deepmerge from 'deepmerge';

// PROVIDERS
import { ReactQueryProvider } from '@/context/react-query-context';
import { AuthProvider } from '@/context/auth-context';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/context/theme-context';
import { OneSignalContext } from '@/context/one-signal-context';
import { cookies } from 'next/headers';
import { MapContext } from './map-context';
import { getMessages } from 'next-intl/server';
import { getFallbackLanguage } from '@/lib/i18n/fallback';
import { SupabaseProvider } from './supabase-context';

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
  const cookiesStore = cookies();
  const layout = cookiesStore.get("ui:layout");
  const sidebarOpen = cookies().get("ui-sidebar:open");
  const rightPanelOpen = cookiesStore.get("ui-right-panel:open");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SupabaseProvider locale={locale}>
        <ReactQueryProvider>
          {/* <ApolloClientProvider locale={locale}> */}
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
                    cookieSidebarOpen={sidebarOpen ? JSON.parse(sidebarOpen.value) : undefined}
                    cookieRightPanelOpen={rightPanelOpen ? JSON.parse(rightPanelOpen.value) : undefined}
                  >
                    {children}
                  </ThemeProvider>
                </MapContext> 
              </OneSignalContext>
            </AuthProvider>
          {/* </ApolloClientProvider> */}
        </ReactQueryProvider>
      </SupabaseProvider>
    </NextIntlClientProvider>
  );
}
