import { supabaseServer } from '@/lib/supabase/supabase-server';
import { redirect } from 'next/navigation';
import { Fragment } from 'react';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { data: { session } } = await supabaseServer.auth.getSession();

  if (session) {
    redirect('/');
  }

  return (
    <Fragment>
      {children}
    </Fragment>
  );
}
