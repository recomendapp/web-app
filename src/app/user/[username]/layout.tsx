import ProfileHeader from "@/components/modules/ProfileHeader/ProfileHeader";
import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/supabase-server";


interface UserLayoutProps {
    params: { username: string };
    children: React.ReactNode;
}

export default async function UserLayout({ params, children } : UserLayoutProps) {
    const { data: user } = await supabaseServer.from('user').select('*').eq('username', params.username).single();

    if (!user) notFound();

    return (
        <main>
            <ProfileHeader profile={user}/>
            <div className='p-4 flex flex-col gap-4'>
                {children}
            </div>
        </main>
    )
}