'use client';

import { matchQuery, MutationCache, QueryClient, QueryClientProvider, QueryKey } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryNormalizerProvider } from '@normy/react-query';
import { getType } from '@/lib/react-query/getType';
// import { broadcastQueryClient } from '@tanstack/query-broadcast-client-experimental'

export const ReactQueryProvider = ({
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
    mutationCache: new MutationCache({
      onSuccess: (_data, _variables, _context, mutation) => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            Array.isArray(mutation.options.meta?.invalidates) &&
            (mutation.options.meta?.invalidates as QueryKey[]).some((queryKey) =>
              matchQuery({ queryKey }, query),
            ),
        })
      }
    })
  })
  // broadcastQueryClient({
  //   queryClient: queryClient as any,
  //   broadcastChannel: 'recomend'
  // })
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
        devLogging: true,
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </QueryNormalizerProvider>
  );
};
