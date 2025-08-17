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
import { getNovuSubscriberHash } from '@/lib/novu/novu';
import { Icons } from '@/config/icons';

export default async function Provider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const supabase = await createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  const { data: is_maintenance } = await supabase.rpc('is_maintenance').single();
  const isMaintenanceMode = is_maintenance // && process.env.NODE_ENV !== 'development';
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
                {isMaintenanceMode ? <MaintenancePage /> : children}
                </ThemeProvider>
              </MapContext> 
            </NotificationsProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </SupabaseProvider>
    </NextIntlClientProvider>
  );
};

const MaintenancePage: React.FC = () => {
  return (
    <div className='h-screen w-screen p-4'>
      <div className='w-full h-full bg-background p-4 rounded-md flex flex-col items-center justify-center'>
        <Icons.site.logo className="fill-accent-yellow w-96" />
        <h1 className=' text-muted-foreground text-2xl'>Maintenance Mode</h1>
      </div>
    </div>
  );
};