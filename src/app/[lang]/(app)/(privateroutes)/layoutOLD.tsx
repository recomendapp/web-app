import { createServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Fragment } from 'react';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/login');
  }

  return <Fragment>{children}</Fragment>;
}
