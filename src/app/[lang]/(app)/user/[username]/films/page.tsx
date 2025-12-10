import { notFound } from 'next/navigation';
import { getProfile } from '@/features/server/users';
import ProfileFilms from './_components/ProfileFilms';

export default async function Films(
  props: {
	params: Promise<{ username: string }>;
  }
) {
  const params = await props.params;
  const user = await getProfile(params.username);
  if (!user?.id) return notFound();
  return <ProfileFilms userId={user?.id} />;
}
