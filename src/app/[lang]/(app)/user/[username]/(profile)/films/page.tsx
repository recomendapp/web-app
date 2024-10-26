import { notFound } from 'next/navigation';
import ProfileFilms from './_components/ProfileFilms';
import { getProfile } from '../../_components/getProfile';

export default async function Films({
  params,
}: {
  params: { username: string };
}) {
  const user = await getProfile(params.username);
  if (!user?.id) notFound();
  return <ProfileFilms userId={user?.id} />;
}
