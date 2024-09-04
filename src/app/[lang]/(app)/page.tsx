import Dashboard from '@/components/Dashboard/Dashboard';
import Welcome from '@/components/Widget/Welcome/Welcome';
import { createServerClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (user ? <Dashboard /> : <Welcome />);
}
