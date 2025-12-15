import { matchQuery, MutationCache, QueryClient, QueryKey } from '@tanstack/react-query';
import { cache } from 'react';

export const getQueryClient = cache(() => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				staleTime: 60_000,
			},
		},
		mutationCache: new MutationCache({
			onSuccess: (_data, _variables, _context, mutation) => {
				if (mutation.options.meta?.invalidates) {
					queryClient.invalidateQueries({
						predicate: (query) =>
							Array.isArray(mutation.options.meta?.invalidates) &&
							(mutation.options.meta?.invalidates as QueryKey[]).some((queryKey) =>
								matchQuery({ queryKey }, query),
							),
					});
				}
			}
		})
	});
	return queryClient;
});
