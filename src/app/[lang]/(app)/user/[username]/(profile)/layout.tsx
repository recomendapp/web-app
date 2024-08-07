import { notFound } from 'next/navigation';
import ProfileNavbar from '@/app/[lang]/(app)/user/[username]/_components/ProfileNavbar';
import { createServerClient } from '@/lib/supabase/server';
import ProfileHeader from '../_components/ProfileHeader';
import ProfilePrivateAccountCard from '../_components/ProfilePrivateAccountCard';

interface UserLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}

export default async function UserLayout({
  params,
  children,
}: UserLayoutProps) {
  const supabase = createServerClient();
  const { data: user } = await supabase
    .from('user_profile')
    .select('*')
    .eq('username', params.username)
    .single();

  if (!user) notFound();
  
  if (!user.visible)
  {
    return (
      <main>
        <ProfileHeader profile={user} />
        <ProfilePrivateAccountCard />
      </main>
    )
  }

  return (
    <main className="p-4 space-y-4">
      <div className="flex justify-center">
        <ProfileNavbar
          profile={user}
          withProfile
          className="w-full sticky top-0"
        />
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </main>
  );
}
