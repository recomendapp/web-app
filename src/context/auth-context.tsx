'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Provider, Session } from '@supabase/supabase-js';

import { User } from '@/types/type.db';
import { useUserDetails } from '@/features/user/userQueries';
import { useSupabaseClient } from '@/context/supabase-context';
import { userKeys } from '@/features/user/userKeys';
import { useQuery } from '@tanstack/react-query';

export interface UserState {
  user: User | null | undefined;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string, redirect?: string | null) => Promise<void>;
  logout: () => Promise<void>;
  signup: ({
      email,
      name,
      username,
      password,
      language,
      redirectTo,
  } : {
      email: string,
      name: string,
      username: string,
      password: string,
      language: string,
      redirectTo?: string | null,
  }) => Promise<void>;
  loginOAuth2: (provider: Provider, redirectTo?: string | null) => Promise<void>;
  loginWithOtp: (email: string, redirectTo?: string | null) => Promise<void>;
  userRefresh: () => Promise<void>;
}

// create the context
const AuthContext = createContext<UserState | undefined>(undefined);

interface AuthProviderProps {
  session: Session | null;
  children: React.ReactNode;
}

// create the provider component
export const AuthProvider = ({ session: initialSession, children }: AuthProviderProps) => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [session, setSession] = useState<Session | null>(initialSession);
  const [loading, setLoading] = useState(true);
  const {
    data: user,
    isLoading: userLoading,
  } = useQuery({
    queryKey: userKeys.detail(session?.user?.id as string),
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

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, updatedSession) => {
      setSession(updatedSession);
      if (!updatedSession) router.refresh();
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase, router]);

  useEffect(() => {
    if (!userLoading) setLoading(false);
  }, [userLoading]);

  const login = async (email: string, password: string, redirect?: string | null) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    if (redirect) router.push(redirect);
    router.refresh();
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setSession(null);
    router.refresh();
  };

  const signup = async ({
    email,
    name,
    username,
    password,
    language,
    redirectTo,
  } : {
    email: string,
    name: string,
    username: string,
    password: string,
    language: string,
    redirectTo?: string | null,
  }) => {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback${redirectTo ? `?redirect=${redirectTo}` : ''}`,
        data: {
          full_name: name,
          username: username,
          language: language,
        },
      },
    });
    if (error) throw error;
  };

  const loginOAuth2 = async (provider: Provider, redirectTo?: string | null) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback${redirectTo ? `?redirect=${redirectTo}` : ''}`,
      },
    });
    if (error) throw error;
  };

  const loginWithOtp = async (email: string, redirectTo?: string | null) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback${redirectTo ? `?redirect=${redirectTo}` : ''}`,
      } 
    });
    if (error) throw error;
  }

  const userRefresh = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    setSession(session);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        login,
        logout,
        signup,
        loginOAuth2,
        loginWithOtp,
        userRefresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContext');
  }
  return context;
};
