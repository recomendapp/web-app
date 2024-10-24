import ProfileFavoriteFilms from '@/app/[lang]/(app)/user/[username]/_components/ProfileFavoriteFilms';
import ProfileHeader from '@/app/[lang]/(app)/user/[username]/_components/ProfileHeader';
import ProfileNavbar from '@/app/[lang]/(app)/user/[username]/_components/ProfileNavbar';
import ProfileLastActivity from '@/app/[lang]/(app)/user/[username]/_components/ProfileLastActivity';
import ProfilePrivateAccountCard from '@/app/[lang]/(app)/user/[username]/_components/ProfilePrivateAccountCard';
import { createServerClient } from '@/lib/supabase/server';
import { GetUserByIdQuery, GetUserQuery } from '@/graphql/__generated__/graphql';

// import apolloServer from '@/lib/apollo/server';
// import GET_USER from '@/graphql/User/User/queries/GetUser';
import { notFound } from 'next/navigation';
import { LockIcon } from 'lucide-react';

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createServerClient();
  const { data: user } = await supabase
    .from('profile')
    .select('*')
    .eq('username', params.username)
    .single();

  if (!user) notFound();
  
  return (
    <main>
      <ProfileHeader profile={user} />
      {user.visible ? (
        <>
          <div className="px-4 pt-4 flex justify-center">
            <ProfileNavbar profile={user} />
          </div>
          <div className="p-4 flex flex-col gap-4">
            {/* <ProfileFavoriteFilms profile={user} /> */}
            <ProfileLastActivity profile={user} />
          </div>
        </>
      ) : (
        <ProfilePrivateAccountCard />
      )}
    </main>
  );
}
