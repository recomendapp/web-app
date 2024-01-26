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

export default async function Provider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  let dictionary;
  try {
    dictionary = (await import(`@/dictionaries/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <ReactQueryContext>
      <ApolloClientContext>
        <AuthContext>
          <NextIntlClientProvider locale={locale} messages={dictionary}>
            <ModalProvider>
              <ThemeContext attribute="class" defaultTheme="dark" enableSystem>
                <OneSignalContext>
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
                </OneSignalContext>
              </ThemeContext>
            </ModalProvider>
          </NextIntlClientProvider>
        </AuthContext>
      </ApolloClientContext>
    </ReactQueryContext>
  );
}
