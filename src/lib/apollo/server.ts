import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getSession } from '../supabase/server';

const httpLink = createHttpLink({
  uri: `${String(process.env.NEXT_PUBLIC_SUPABASE_URL)}/graphql/v1`,
});

const authLink = setContext(async (_, { headers }) => {
  const token = (await getSession())?.access_token;
  return {
    headers: {
      ...headers,
      apiKey: String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const apolloServer = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  ssrMode: true,
  connectToDevTools: true,
});

export default apolloServer;
