import { supabase } from "@/lib/supabase/client";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const isServer = typeof window === "undefined";

const httpLink = createHttpLink({
  uri: `${String(process.env.NEXT_PUBLIC_SUPABASE_URL)}/graphql/v1`,
})
  
const authLink = setContext(async (_, { headers }) => {
  const token = (await supabase.auth.getSession()).data.session?.access_token
  return {
    headers: {
      ...headers,
      "apiKey": String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    ssrMode: isServer,
    connectToDevTools: true,
})

export default apolloClient