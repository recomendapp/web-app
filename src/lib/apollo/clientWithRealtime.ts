import { supabase } from '@/lib/supabase/client';
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const isServer = typeof window === 'undefined';

// Créez le lien HTTP
const httpLink = new HttpLink({
  uri: `${String(process.env.NEXT_PUBLIC_SUPABASE_URL)}/graphql/v1`,
});

const wsLink = new WebSocketLink(
  new SubscriptionClient(`ws://api.recomend.app/realtime/v1`, {
    reconnect: true,
    connectionParams: async () => {
      const token = (await supabase.auth.getSession()).data.session?.access_token;
      return {
        headers: {
          apiKey: String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
          Authorization: token ? `Bearer ${token}` : '',
        },
      };
    },
  }),
);

// Créez le lien d'authentification
const authLink = setContext(async (_, { headers }) => {
  const token = (await supabase.auth.getSession()).data.session?.access_token;
  return {
    headers: {
      ...headers,
      apiKey: String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Composez les liens en fonction du type d'opération (query, mutation, subscription)
const splitLink = split(
      // Divisez les liens en fonction du type d'opération (query, mutation, subscription)
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      authLink.concat(httpLink),
    );

// Créez l'instance Apollo Client
const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  ssrMode: isServer,
  connectToDevTools: true,
});

export default apolloClient;
