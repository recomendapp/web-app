import { notFound } from "next/navigation";
import ProfileNavbar from "@/components/Profile/ProfileNavbar/ProfileNavbar";
import { createServerClient } from "@/lib/supabase/server";


interface UserLayoutProps {
    params: { username: string };
    children: React.ReactNode;
}

export default async function UserLayout({
    params,
    children
} : UserLayoutProps) {
    const supabase = createServerClient();
    const { data: user } = await supabase.from('user').select('*').eq('username', params.username).single();
    return (
        <main>
            <div className='px-4 pt-4 lg:pt-0 flex justify-center'><ProfileNavbar profile={user} withProfile className="w-full sticky top-0"/></div>
            <div className='p-4 flex flex-col gap-4'>
                {children}
            </div>
        </main>
    )
}