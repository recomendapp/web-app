import ProfileFilm from '@/app/[lang]/(app)/user/[username]/(profile)/films/_components/ProfileFilms';
import { createServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function Films({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createServerClient();
  const { data: user } = await supabase
    .from('user')
    .select('id')
    .eq('username', params.username)
    .single();
  
  if (!user) notFound();

  return <ProfileFilm userId={user?.id} />;
}
