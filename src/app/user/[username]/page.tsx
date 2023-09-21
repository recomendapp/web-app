import { UserFollowButton } from '@/components/elements/ButtonFollowUser/UserFollowButton';
import ModalSettingsUser from '@/components/elements/ModalSettingsUser/ModalSettingsUser';
import UserAvatar from '@/components/elements/UserAvatar/UserAvatar';
import UserHeader from '@/components/modules/UserHeader/UserHeader';
import UserMovies from '@/components/modules/UserMovies/UserMovies';
import UserPlaylists from '@/components/modules/UserPlaylists/UserPlaylists';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getUserDetails } from '@/db/appwrite';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserDetails(params.username);
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
  const user = await getUserDetails(params.username);
  if (!user) notFound();

  return (
    <Fragment>
      <UserPlaylists user={user} horizontal />
      <UserMovies userId={user.$id} horizontal />
    </Fragment>
  );
}