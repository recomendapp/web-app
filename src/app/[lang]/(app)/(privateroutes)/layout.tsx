import { createServerClient } from '@/lib/supabase/supabase-server';
import { redirect } from 'next/navigation';
import { Fragment } from 'react';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const supabaseServer = createServerClient()
  const { data: { session } } = await supabaseServer.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <Fragment>
      {children}
    </Fragment>
  );
}
