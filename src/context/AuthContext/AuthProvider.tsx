'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { gql, useQuery } from '@apollo/client';
import { User } from '@/types/type.user';
import USER_FRAGMENT from './fragments/userFragment';

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
  userRefresh: () => Promise<void>;
}

const defaultState: UserState = {
  user: null,
  session: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
  userRefresh: async () => {},
};

const PROFILE_QUERY = gql`
  query ProfileQuery($id: UUID!) {
    userCollection(filter: { id: {eq: $id}}) {
      edges {
        node {
          ...User
        }
      }
    }
  }
  ${USER_FRAGMENT}
`

// create the context
const AuthContext = createContext<UserState>(defaultState);

// create the provider component
export const AuthProvider = ({ children } : { children: any }) => {
  // const [ user, setUser ] = useState<User | null | undefined>();
  const [ session, setSession ] = useState<Session | null>();
  const [ sessionLoading, setSessionLoading ] = useState(true);
  const [ loading, setLoading ] = useState(true);
  const { data, loading: userLoading } = useQuery(PROFILE_QUERY, {
    variables: { userId: session?.user?.id },
    skip: session == null
  });
  const user = data?.userCollection?.edges[0]?.node;

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
        // setUser(null);
        // setLoading(false);
        setSessionLoading(false);
      }
      // setSession(session);
      // setUser(session?.user);
      // setLoading(false);
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
      password
    })
    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setSession(null);
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
          data: {
            name: name,
            username: username,
          }
        }
      },
    )
    if (error) throw error;
  };

  const userRefresh = async () => {
    init();
    return;
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, login, logout, signup, userRefresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
