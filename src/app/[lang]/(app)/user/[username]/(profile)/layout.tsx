import { notFound } from 'next/navigation';
import ProfileHeader from '../_components/ProfileHeader';
import ProfilePrivateAccountCard from '../_components/ProfilePrivateAccountCard';
import ProfileNavbar from '../_components/ProfileNavbar';
import { getProfile } from '@/features/server/users';

interface UserLayoutProps {
  params: Promise<{ username: string }>;
  children: React.ReactNode;
}

export default async function UserLayout(props: UserLayoutProps) {
  const params = await props.params;

  const {
    children
  } = props;

  const user = await getProfile(params.username);
  if (!user) notFound();
  if (!user.visible)
  {
    return (
      <>
        <ProfileHeader profile={user} />
        <ProfilePrivateAccountCard />
      </>
    )
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-center">
        <ProfileNavbar
          profile={user}
          withProfile
          className="w-full sticky top-0"
        />
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
