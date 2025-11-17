'use client'

import { CustomerInfo, LogLevel, Purchases } from "@revenuecat/purchases-js";
import { Session } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { REVENUECAT_API_KEY } from ".";
import { authKeys } from "@/features/client/auth/authKeys";

export const useRevenueCat = (session: Session | null | undefined) => {
  const queryClient = useQueryClient();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | undefined>(undefined);
  
  const init = useCallback(async (session: Session) => {
    if (process.env.NODE_ENV === 'development') {
      Purchases.setLogLevel(LogLevel.Verbose);
    }
    if (!REVENUECAT_API_KEY) {
      throw new Error("RevenueCat API key missing");
    }
    const purchases = Purchases.configure({
      apiKey: REVENUECAT_API_KEY,
      appUserId: session.user.id,
    });
    const customerInfo = await purchases.getCustomerInfo();
    await purchases.setAttributes({
      $email: session.user.email || null,
    })
    setCustomerInfo(customerInfo);
  }, []);

  useEffect(() => {
    if (session?.user.id) {
      init(session).catch(console.error);
    } else {
      queryClient.setQueryData(authKeys.customerInfo(), null);
      setCustomerInfo(undefined);
    }
  }, [session]);

  return { customerInfo };
};
