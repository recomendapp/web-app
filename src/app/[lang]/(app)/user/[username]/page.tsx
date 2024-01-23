import ProfileFavoriteFilms from '@/components/Profile/ProfileFavoriteFilms/ProfileFavoriteFilms';
import ProfileHeader from '@/components/Profile/ProfileHeader/ProfileHeader';
import ProfileNavbar from '@/components/Profile/ProfileNavbar/ProfileNavbar';
import ProfileLastActivity from '@/components/Profile/ProfileLastActivity/ProfileLastActivity';
import { createServerClient } from '@/lib/supabase/server';
import { GetUserByIdQuery, GetUserQuery } from '@/graphql/__generated__/graphql';

import apolloServer from '@/lib/apollo/server';
import GET_USER from '@/graphql/User/User/queries/GetUser';
import { notFound } from 'next/navigation';

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const { data: userQuery } = await apolloServer.query<GetUserQuery>({
    query: GET_USER,
    variables: {
      filter: {
        username: { eq: params.username },
      },
    },
  });
  const user = userQuery?.userCollection?.edges[0].user;

  if (!user) notFound();

  // const supabase = createServerClient();
  // const { data: user } = await supabase
  //   .from('user')
  //   .select('*')
  //   .eq('username', params.username)
  //   .single();
  
  return (
    <main>
      <ProfileHeader profile={user} />
      <div className="px-4 pt-4 flex justify-center">
        <ProfileNavbar profile={user} />
      </div>
      <div className="p-4 flex flex-col gap-4">
        {/* <ProfileFavoriteFilms profile={user} /> */}
        <ProfileLastActivity profile={user} />
      </div>
    </main>
  );
}
