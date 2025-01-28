import { notFound } from 'next/navigation';
import ProfileHeader from './_components/ProfileHeader';
import ProfileNavbar from './_components/ProfileNavbar';
import ProfileLastActivity from './_components/ProfileLastActivity';
import ProfilePrivateAccountCard from './_components/ProfilePrivateAccountCard';
import { getProfile } from '@/features/server/users';

export default async function UserPage(
  props: {
    params: Promise<{ username: string }>;
  }
) {
  const params = await props.params;
  const user = await getProfile(params.username);
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
            <ProfileLastActivity profile={user} />
          </div>
        </>
      ) : (
        <ProfilePrivateAccountCard />
      )}
    </main>
  );
}
