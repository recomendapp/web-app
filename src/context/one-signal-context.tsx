'use client';

import { useEffect, useState } from 'react';
import OneSignal from 'react-onesignal';
import { useAuth } from './AuthContext/auth-context';
import Script from 'next/script';

const oneSignalAppId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!;

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
    setOneSignalInitialized(true);
    await OneSignal.init({
      appId: oneSignalAppId,
      // notifyButton: {
      //     enable: true,
      // },
      allowLocalhostAsSecureOrigin: true,
    });
    await OneSignal.login(uid);
    OneSignal.Slidedown.promptPush();
  };

  useEffect(() => {
    user && initializeOneSignal(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      {/* <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer /> */}
      {/* <Script async src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" /> */}
      {children}
    </>
  );
};
