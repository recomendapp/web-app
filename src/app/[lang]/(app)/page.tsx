import Dashboard from '@/components/Dashboard/Dashboard';
import Welcome from '@/components/Welcome/Welcome';
import { createServerClient } from '@/lib/supabase/server';
import { Fragment } from 'react';

export default async function Home() {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return <Fragment>{session ? <Dashboard /> : <Welcome />}</Fragment>;
}
