import { notFound } from 'next/navigation';
import ProfilePlaylists from './_components/ProfilePlaylists';
import { getProfile } from '@/features/server/users';

export default async function Playlists(
  props: {
    params: Promise<{ username: string }>;
  }
) {
  const params = await props.params;
  const user = await getProfile(params.username);
  if (!user?.id) return notFound();
  return <ProfilePlaylists userId={user?.id} />;
}
