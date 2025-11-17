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
  
  const init = useCallback(async (userId: string) => {
    if (process.env.NODE_ENV === 'development') {
      Purchases.setLogLevel(LogLevel.Verbose);
    }
    if (!REVENUECAT_API_KEY) {
      throw new Error("RevenueCat API key missing");
    }
    const purchases = Purchases.configure({
      apiKey: REVENUECAT_API_KEY,
      appUserId: userId,
    });
    const customerInfo = await purchases.getCustomerInfo();
    setCustomerInfo(customerInfo);
  }, []);

  useEffect(() => {
    if (session?.user.id) {
      init(session?.user.id).catch(console.error);
    } else {
      queryClient.setQueryData(authKeys.customerInfo(), null);
      setCustomerInfo(undefined);
    }
  }, [session]);

  return { customerInfo };
};
