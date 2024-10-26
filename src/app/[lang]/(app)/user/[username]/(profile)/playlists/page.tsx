import { getProfile } from '../../_components/getProfile';
import ProfilePlaylists from './_components/ProfilePlaylists';

export default async function Playlists({
  params,
}: {
  params: { username: string };
}) {
  const user = await getProfile(params.username);
  return <ProfilePlaylists profile={user} />;
}
