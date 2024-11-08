'use client';

import { useEffect, useState } from 'react';
import OneSignal from 'react-onesignal';
import { useAuth } from './auth-context';
import Script from 'next/script';

export const OneSignalContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();

  const [oneSignalInitialized, setOneSignalInitialized] =
    useState<boolean>(false);

  /**
   * Initializes OneSignal SDK for a given Supabase User ID
   * @param uid Supabase User ID
   */
  const initializeOneSignal = async (uid: string) => {
    if (oneSignalInitialized) {
      return;
    }
    await OneSignal.init({
      appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!,
      safari_web_id: process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_WEB_ID,
      // notifyButton: {
        //     enable: true,
        // },
        allowLocalhostAsSecureOrigin: true,
      });
      await OneSignal.login(uid);
      setOneSignalInitialized(true);
  };

  useEffect(() => {
    user && initializeOneSignal(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      {/* <Script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer /> */}
      {children}
    </>
  );
};
