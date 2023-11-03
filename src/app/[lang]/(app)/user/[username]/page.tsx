import { Fragment } from 'react';
import ProfilePlaylists from '@/components/Profile/ProfilePlaylists/ProfilePlaylists';
import ProfileFilms from '@/components/Profile/ProfileFilms/ProfileFilms';
import { createServerClient } from '@/lib/supabase/supabase-server';
import ProfileFavoriteFilms from '@/components/Profile/ProfileFavoriteFilms/ProfileFavoriteFilms';
import ProfileHeader from '@/components/Profile/ProfileHeader/ProfileHeader';
import ProfileNavbar from '@/components/Profile/ProfileNavbar/ProfileNavbar';
import ProfileLastActivity from '@/components/Profile/ProfileLastActivity/ProfileLastActivity';
import { notFound } from 'next/navigation';

export default async function UserPage({ params } : { params: { username: string } }) {
  const supabaseServer = createServerClient()

  const { data: user } = await supabaseServer.from('user').select('*').eq('username', params.username).single();
  
  if (!user) notFound();

  return (
    <main>
        <ProfileHeader profile={user}/>
        <div className='px-4 flex justify-center'><ProfileNavbar profile={user} /></div>
        <div className='p-4 flex flex-col gap-4'>
          <ProfileFavoriteFilms profile={user} />
          <ProfileLastActivity profile={user} />
        </div>
    </main>
  );
}