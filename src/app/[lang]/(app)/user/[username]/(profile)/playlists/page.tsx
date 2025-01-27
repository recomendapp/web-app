import { notFound } from 'next/navigation';
import ProfilePlaylists from './_components/ProfilePlaylists';
import { getProfile } from '@/features/server/users';

export default async function Playlists({
  params,
}: {
  params: { username: string };
}) {
  const user = await getProfile(params.username);
  if (!user?.id) notFound();
  return <ProfilePlaylists userId={user?.id} />;
}
