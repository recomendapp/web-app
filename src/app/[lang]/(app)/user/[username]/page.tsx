import ProfileFavoriteFilms from '@/components/Profile/ProfileFavoriteFilms/ProfileFavoriteFilms';
import ProfileHeader from '@/components/Profile/ProfileHeader/ProfileHeader';
import ProfileNavbar from '@/components/Profile/ProfileNavbar/ProfileNavbar';
import ProfileLastActivity from '@/components/Profile/ProfileLastActivity/ProfileLastActivity';
import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';

export default async function UserPage({ params } : { params: { username: string } }) {
  const supabase = createServerClient();
  const { data: user } = await supabase.from('user').select('*').eq('username', params.username).single();
  
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