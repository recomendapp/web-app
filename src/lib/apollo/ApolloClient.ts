import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
    uri: `${String(process.env.NEXT_PUBLIC_SUPABASE_URL)}/graphql/v1`,
      headers: {
        "apiKey": String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      }
    }),
    connectToDevTools: true,
  });
});