'use client';

import React from "react";
import apolloClient from "@/lib/apollo/client";
import { ApolloProvider } from "@apollo/client";

export function ApolloClientContext ({
  children,
} : {
  children: React.ReactNode;
}) {
  return (
      <ApolloProvider client={apolloClient}>
          {children}
      </ApolloProvider>
  );
}