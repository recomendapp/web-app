'use client';

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryNormalizerProvider } from '@normy/react-query';
import { getType } from '@/lib/react-query/getType';
import queryClient from '@/lib/react-query/queryClient';

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
