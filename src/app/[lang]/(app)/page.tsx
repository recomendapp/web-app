import { createServerClient } from '@/lib/supabase/server';
import { Dashboard } from '@/components/Dashboard/Dashboard';

export default async function Home() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <Dashboard isLogged={!!user} />;
}
