'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Provider, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import { gql, useQuery } from '@apollo/client';
import { User } from '@/types/type.user';
import USER_FRAGMENT from './fragments/userFragment';
import SUBSCRIPTION_FRAGMENT from '@/components/Subscription/fragments/subscriptionFragment';
import { useRouter } from 'next/navigation';

export interface UserState {
  user: User | null | undefined;
  session: Session | null | undefined;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (
    email: string,
    name: string,
    username: string,
    password: string
  ) => Promise<void>;
  loginOAuth2: (provider: Provider) => Promise<void>;
  userRefresh: () => Promise<void>;
}

const defaultState: UserState = {
  user: null,
  session: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
  loginOAuth2: async () => {},
  userRefresh: async () => {},
};

const USER_QUERY = gql`
  query UserQuery($userId: UUID!) {
    userCollection(
      filter: { id: { eq: $userId } }
      last: 1
    ) {
      edges {
        user: node {
          ...User
          subscription: subscriptionsCollection(
            filter: { user_id: { eq: $userId } }
            last: 1
          ) {
            edges {
              node {
                ...Subscription
              }
            }
          }
        }
      }
    }
  }
  ${USER_FRAGMENT}
  ${SUBSCRIPTION_FRAGMENT}
`

// create the context
const AuthProvider = createContext<UserState>(defaultState);

// create the provider component
export const AuthContext = ({
  children
} : {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  // const [ user, setUser ] = useState<User | null | undefined>();
  const [ session, setSession ] = useState<Session | null>();
  const [ sessionLoading, setSessionLoading ] = useState(true);
  const [ loading, setLoading ] = useState(true);
  const { data, loading: userLoading } = useQuery(USER_QUERY, {
    variables: {
      userId: session?.user.id
    },
    skip: !session?.user?.id
  });
  const user = data?.userCollection?.edges[0]?.user;

  const init = async () => {
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      // const { data: dataUser, error: errorUser } = await supabase.from('user').select('*').eq('id', session?.user?.id).single();
      
      if (error) throw error;
      setSession(session);
      // setUser(dataUser);
      // setLoading(false);
      setSessionLoading(false);
    };
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setData();
      } else {
        setSession(null);
        setSessionLoading(false);
      }
    });

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!userLoading && !sessionLoading)
      setLoading(false)
  }, [sessionLoading, userLoading])

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error;
    router.refresh();
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setSession(null);
    router.refresh();
  };

  const signup = async (
    email: string,
    name: string,
    username: string,
    password: string
  ) => {
    const { error } = await supabase.auth.signUp(
      {
        email: email,
        password: password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
          data: {
            full_name: name,
            username: username,
          }
        },
      },
    )
    if (error) throw error;
  };

  const loginOAuth2 = async (
    provider: Provider
  ) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      }
    })
    if (error) throw error;
  };

  const userRefresh = async () => {
    init();
    return;
  };

  return (
    <AuthProvider.Provider
      value={{ user, session, loading, login, logout, signup, loginOAuth2, userRefresh }}
    >
      {children}
    </AuthProvider.Provider>
  );
};

export const useAuth = () => useContext(AuthProvider);
