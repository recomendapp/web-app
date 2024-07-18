'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryNormalizerProvider } from '@normy/react-query';
import { getType } from '@/lib/react-query/getType';
import { broadcastQueryClient } from '@tanstack/query-broadcast-client-experimental'

export const ReactQueryContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 60_000,
      },
    },
  });
  broadcastQueryClient({
    queryClient: queryClient as any,
    broadcastChannel: 'recomend'
  })
  return (
    <QueryNormalizerProvider
      queryClient={queryClient}
      normalizerConfig={{
        getNormalizationObjectKey: obj => {
          if (obj.id && getType(obj)) {
            return `${getType(obj)}:${obj.id}`
          } else if (obj.id) {
            return `${obj.id}`
          }
        },
        devLogging: true
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </QueryNormalizerProvider>
  );
};
