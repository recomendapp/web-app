'use client';

import React, { useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';
import { useSupabaseClient } from './supabase-context';
import { createApolloClient } from '@/lib/apollo/client';

export function ApolloClientProvider({
  locale,
  children,
  ...props
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const supabase = useSupabaseClient();
  const apolloClient = useMemo(() => {
    return createApolloClient(supabase, locale);
  }, [supabase, locale]);
  return <ApolloProvider client={apolloClient} {...props}>{children}</ApolloProvider>;
}
