'use client';

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";

const link = new BatchHttpLink({
    uri: `${String(process.env.NEXT_PUBLIC_SUPABASE_URL)}/graphql/v1`,
    headers: {
        "apiKey": String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    },
    batchInterval: 10,
});

export function ApolloClientContext ({
    children,
} : {
    children: React.ReactNode;
}) {
    const [header, setHeader] = useState<any>({
        "apiKey": String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    })

    useEffect(() => {
        supabase.auth.getSession()
            .then(({data: { session }}) => {
                if (session?.access_token)
                {
                    setHeader({
                        ...header,
                        "authorization": `Bearer ${session.access_token}`,
                    })
                }
            })
    }, [])

    const client = new ApolloClient({
        // link,
        uri: `${String(process.env.NEXT_PUBLIC_SUPABASE_URL)}/graphql/v1`,
        headers: header,
        cache: new InMemoryCache(),
        connectToDevTools: true,
    })

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}