import { notFound } from 'next/navigation';
import ProfileNavbar from '@/components/Profile/ProfileNavbar/ProfileNavbar';
import { createServerClient } from '@/lib/supabase/server';

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
    .from('user')
    .select('*')
    .eq('username', params.username)
    .single();
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
