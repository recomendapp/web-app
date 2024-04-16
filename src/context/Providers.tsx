import { notFound } from 'next/navigation';
import { SpeedInsights } from '@vercel/speed-insights/next';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';

// PROVIDERS
import { ReactQueryContext } from '@/context/react-query-context';
import { ApolloClientContext } from '@/context/apollo-client-context';
import { AuthContext } from '@/context/auth-context';
import { NextIntlClientProvider } from 'next-intl';
import { ModalProvider } from '@/context/modal-context';
import { ThemeContext } from '@/context/theme-context';
import { OneSignalContext } from '@/context/one-signal-context';
import { RightSidebarContext } from '@/context/right-sidebar-context';
import { cookies } from 'next/headers';
import { UiContext } from './ui-context';
import { MapContext } from './map-context';

export default async function Provider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  // NEXT-INTL
  let dictionary;
  try {
    dictionary = (await import(`@/dictionaries/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  // UI
  const layout = cookies().get("ui:layout");
  const sidebarCollapsed = cookies().get("ui-sidebar:collapsed");
  const rightPanelCollapsed = cookies().get("ui-right-panel:collapsed");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const cookieSidebarCollapsed = sidebarCollapsed ? JSON.parse(sidebarCollapsed.value) : undefined
  const cookieRightPanelCollapsed = rightPanelCollapsed ? JSON.parse(rightPanelCollapsed.value) : undefined
  return (
    <ReactQueryContext>
      <ApolloClientContext>
        <AuthContext>
          <NextIntlClientProvider locale={locale} messages={dictionary}>
            <ModalProvider>
              <ThemeContext attribute="class" defaultTheme="dark" enableSystem>
                <OneSignalContext>
                  <UiContext
                    defaultLayout={defaultLayout}
                    cookieSidebarCollapsed={cookieSidebarCollapsed}
                    cookieRightPanelCollapsed={cookieRightPanelCollapsed}
                  >
                    <MapContext>
                      <RightSidebarContext>
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
                        <SpeedInsights />
                        {children}
                      </RightSidebarContext>
                    </MapContext>
                  </UiContext>
                </OneSignalContext>
              </ThemeContext>
            </ModalProvider>
          </NextIntlClientProvider>
        </AuthContext>
      </ApolloClientContext>
    </ReactQueryContext>
  );
}
