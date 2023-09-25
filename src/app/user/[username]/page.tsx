import ProfilePlaylists from '@/components/modules/ProfilePlaylists/ProfilePlaylists';
import UserMovies from '@/components/modules/UserMovies/UserMovies';
import { getClient } from '@/lib/ApolloClient';
// import { getUserDetails } from '@/lib/appwrite';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import PROFILE_DETAILS_QUERY from '@/components/modules/ProfileDetails/queries/ProfileQuery'
import { supabase } from '@/lib/supabase';

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  const { data: user } = await supabase.from('user').select('*').eq('username', params.username).single();

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
  const { data: user } = await supabase.from('user').select('*').eq('username', params.username).single();

  if (!user) notFound();

  return (
    <Fragment>
      <ProfilePlaylists user={user} horizontal />
      {/* <UserMovies userId={user.$id} horizontal /> */}
    </Fragment>
  );
}