import { notFound } from 'next/navigation';
import ProfileCollection from './_components/ProfileCollection';
import { getProfile } from '@/features/server/users';

export default async function Collection(
  props: {
    params: Promise<{ username: string }>;
  }
) {
  const params = await props.params;
  const user = await getProfile(params.username);
  if (!user?.id) notFound();
  return <ProfileCollection userId={user?.id} />;
}
