import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import ProfileMovieActivity from '@/app/[lang]/(app)/user/[username]/(filmActivity)/film/[film]/_components/ProfileMovieActivity';

export default async function Review({
  params,
}: {
  params: {
    lang: string;
    username: string;
    film: string;
  };
}) {

  const supabase = createServerClient();

  const { data: user } = await supabase
    .from('user')
    .select('id')
    .eq('username', params.username)
    .single();

  if (!user) return notFound();

  return (<ProfileMovieActivity movieId={params.film} userId={user.id} />)
}
