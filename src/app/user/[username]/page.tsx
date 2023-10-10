import { Fragment } from 'react';
import ProfilePlaylists from '@/components/Profile/ProfilePlaylists/ProfilePlaylists';
import ProfileFilms from '@/components/Profile/ProfileFilms/ProfileFilms';
import { createServerClient } from '@/lib/supabase/supabase-server';
import ProfileFavoriteFilms from '@/components/Profile/ProfileFavoriteFilms/ProfileFavoriteFilms';

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  const supabaseServer = createServerClient()

  const { data: user } = await supabaseServer.from('user').select('*').eq('username', params.username).single();
  if (!user) {
    return {
      title: 'Oups, utilisateur introuvable !',
    };
  }
  return {
    title: `${user.full_name} (@${user.username})`,
    description: `This is the page of @${user.username}`,
  };
}

export default async function UserPage({ params } : { params: { username: string } }) {
  const supabaseServer = createServerClient()

  const { data: user } = await supabaseServer.from('user').select('*').eq('username', params.username).single();

  return (
    <Fragment>
      <ProfileFavoriteFilms profile={user} />
      {/* <ProfilePlaylists profile={user} horizontal /> */}
      <ProfileFilms profile={user} horizontal />
    </Fragment>
  );
}