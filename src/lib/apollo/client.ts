import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { setContext } from '@apollo/client/link/context';
import { SupabaseClient } from '@supabase/supabase-js';
import { routing } from '../i18n/routing';

const isServer = typeof window === 'undefined';

const httpLink = new HttpLink({
  uri: `${String(process.env.NEXT_PUBLIC_SUPABASE_URL)}/graphql/v1`,
});

const batchHttpLink = new BatchHttpLink({
  uri: `${String(process.env.NEXT_PUBLIC_SUPABASE_URL)}/graphql/v1`,
  batchMax: 10,
  batchInterval: 5,
});

// const authLink = setContext(async (_, { headers }) => {
//   const token = (await supabase.auth.getSession()).data.session?.access_token;
//   return {
//     headers: {
//       ...headers,
//       apiKey: String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
//       Authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

const authLink = (supabase: SupabaseClient<Database>, locale?: string) => setContext(async (_, { headers }) => {
  const token = (await supabase.auth.getSession()).data.session?.access_token;
  return {
    headers: {
      ...headers,
      apiKey: String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      Authorization: token ? `Bearer ${token}` : '',
      'language': locale ?? routing.defaultLocale,
    },
  };
});

export const createApolloClient = (supabase: SupabaseClient<Database>, locale?: string) => {
  return new ApolloClient({
    link: authLink(supabase, locale).concat(httpLink),
    cache: new InMemoryCache(),
    ssrMode: isServer,
    connectToDevTools: true,
  });
}

