import ProfileHeader from "@/components/modules/ProfileHeader/ProfileHeader";
import { getUserDetails } from "@/lib/appwrite";
import { notFound } from "next/navigation";
import GET_PROFILE_DETAILS_QUERY from '@/components/modules/ProfileDetails/queries/ProfileQuery'
import { getClient } from "@/lib/ApolloClient";
import { supabase } from "@/lib/supabase";


interface UserLayoutProps {
    params: { username: string };
    children: React.ReactNode;
  }
  

export default async function UserLayout({ params, children } : UserLayoutProps) {
    const { data: user } = await supabase.from('user').select('*').eq('username', params.username).single();


    if (!user) notFound();

    return (
        <main>
            <ProfileHeader username={user.username}/>
            <div className='p-4 flex flex-col gap-4'>
                {children}
            </div>
        </main>
    )
}