import ProfilePlaylists from '@/components/modules/ProfilePlaylists/ProfilePlaylists';
import ProfileFilms from '@/components/modules/ProfileFilms/ProfileFilms';
import { Fragment } from 'react';
import { supabase } from '@/lib/supabase/supabase';
import { getUserDetails } from '@/lib/appwrite';
import { supabaseServer } from '@/lib/supabase/supabase-server';

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  const { data: user } = await supabaseServer.from('user').select('*').eq('username', params.username).single();
  // const user = await getUserDetails(params.username);
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
  const { data: user } = await supabaseServer.from('user').select('*').eq('username', params.username).single();

  return (
    <Fragment>
      <ProfilePlaylists profile={user} horizontal />
      <ProfileFilms profile={user} horizontal />
    </Fragment>
  );
}