import { getProfile } from '@/features/server/users';
import { notFound } from 'next/navigation';
import { ProfileHeader } from './_components/ProfileHeader';
import { ProfileNavbar } from './_components/ProfileNavbar';
import { ProfilePrivateAccountCard } from './_components/ProfilePrivateAccountCard';

export default async function UserLayout(
  props: {
    params: Promise<{
      lang: string,
      username: string
    }>;
    children: React.ReactNode;
  }
) {
  const params = await props.params;
  const user = await getProfile(params.username);
  if (!user) notFound();
  return (
    <>
      <ProfileHeader profile={user} />
      {user.visible ? (
        <div className="flex flex-col items-center p-4 gap-2">
          <ProfileNavbar profile={user} className='max-w-7xl'/>
          <div className="w-full max-w-7xl">
            {props.children}
          </div>
        </div>
      ) : (
        <ProfilePrivateAccountCard />
      )}
    </>
  );
}
