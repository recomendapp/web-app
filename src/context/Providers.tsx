import deepmerge from 'deepmerge';

// PROVIDERS
import { ReactQueryProvider } from '@/context/react-query-context';
import { AuthProvider } from '@/context/auth-context';
import { MapContext } from '@/context/map-context';
import { ThemeProvider } from '@/context/theme-context';
import { NextIntlClientProvider } from 'next-intl';
import { SupabaseProvider } from '@/context/supabase-context';
import { NotificationsProvider } from '@/context/notifications-context';
import { cookies } from 'next/headers';
import { getMessages } from 'next-intl/server';
import { getFallbackLanguage } from '@/lib/i18n/fallback';
import { createServerClient } from '@/lib/supabase/server';

export default async function Provider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const supabase = await createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  // NEXT-INTL
  const userMessages = await getMessages({ locale });
  const fallbackMessages = await getMessages({ locale: getFallbackLanguage({ locale }) });
  const messages = deepmerge(fallbackMessages, userMessages);
  // UI
  const cookiesStore = await cookies();
  const layout = cookiesStore.get("ui:layout");
  const sidebarOpen = (await cookies()).get("ui-sidebar:open");
  const rightPanelOpen = cookiesStore.get("ui-right-panel:open");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SupabaseProvider locale={locale}>
        <ReactQueryProvider>
          <AuthProvider session={session}>
            <NotificationsProvider>
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
            </NotificationsProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </SupabaseProvider>
    </NextIntlClientProvider>
  );
}
