"use client"

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";

import {
    BatchHttpLink
} from "@apollo/client/link/batch-http";

const link = new BatchHttpLink({
    uri: `${String(process.env.NEXT_PUBLIC_APPWRITE_END_POINT)}/graphql/`,
    batchInterval: 10,
    headers: {
        "X-Appwrite-Project": String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    },
});

export const ApolloClientProvider = ({
    children,
} : {
    children: React.ReactNode;
}) => {
    const client = new ApolloClient({
        // uri: `${String(process.env.NEXT_PUBLIC_APPWRITE_END_POINT)}/graphql/`,
        // headers: {
        //     "X-Appwrite-Project": String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
        // },
        link: link,
        cache: new InMemoryCache(),
        
    });
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}