'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { Provider, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

import { useQuery } from '@tanstack/react-query';
import { User } from '@/types/type.db';
import { headers } from 'next/headers';

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
  user: undefined,
  session: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
  loginOAuth2: async () => {},
  userRefresh: async () => {},
};

// create the context
const AuthProvider = createContext<UserState>(defaultState);

// create the provider component
export const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  // const [ user, setUser ] = useState<User | null | undefined>();
  const [session, setSession] = useState<Session | null>();
  const [sessionLoading, setSessionLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const {
    data: user,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ['user', session?.user?.id],
    queryFn: async () => {
      if (session === null || !session?.user.id) return (null);
      const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('id', session.user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: session !== undefined,
  })

  const init = async () => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      // const { data: dataUser, error: errorUser } = await supabase.from('user').select('*').eq('id', session?.user?.id).single();

      if (error) throw error;
      setSession(session);
      // setUser(dataUser);
      // setLoading(false);
      setSessionLoading(false);
    };
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setData();
        } else {
          setSession(null);
          setSessionLoading(false);
        }
      }
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!userLoading && !sessionLoading) setLoading(false);
  }, [sessionLoading, userLoading]);

  const login = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
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
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          full_name: name,
          username: username,
        },
      },
    });
    if (error) throw error;
  };

  const loginOAuth2 = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
    // if (error) {
    //   console.log(error);
    // } else {
    //   return redirect(data.url);
    // }
  };

  const userRefresh = async () => {
    init();
    return;
  };

  return (
    <AuthProvider.Provider
      value={{
        user,
        session,
        loading,
        login,
        logout,
        signup,
        loginOAuth2,
        userRefresh,
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
};

export const useAuth = () => useContext(AuthProvider);
