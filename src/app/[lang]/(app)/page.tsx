import Dashboard from '@/components/Dashboard/Dashboard';
import Welcome from '@/components/Welcome/Welcome';
import { createServerClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return <>{session ? <Dashboard /> : <Welcome />}</>;
}
