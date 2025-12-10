import { notFound } from 'next/navigation';
import { getProfile } from '@/features/server/users';
import ProfileTvSeries from './_components/ProfileTvSeries';

export default async function TvSeries(
  props: {
	params: Promise<{ username: string }>;
  }
) {
  const params = await props.params;
  const user = await getProfile(params.username);
  if (!user?.id) return notFound();
  return <ProfileTvSeries userId={user?.id} />;
}
