import { createServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function Stats({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createServerClient();
  const { data: user } = await supabase
    .from('user')
    .select('*')
    .eq('username', params.username)
    .single();
  return <div>Des stats</div>;
}
