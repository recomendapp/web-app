import { notFound } from "next/navigation";
import ProfileHeader from "@/components/Profile/ProfileHeader/ProfileHeader";
import { createServerClient } from "@/lib/supabase/supabase-server";
import { Fragment } from "react";

export async function generateMetadata({
    params,
  }: {
    params: { username: string };
  }) {
    const supabaseServer = createServerClient()
  
    const { data: user } = await supabaseServer.from('user').select('*').eq('username', params.username).single();
    if (!user) {
      return {
        title: 'Oups, utilisateur introuvable !',
      };
    }
    return {
      title: `${user.full_name} (@${user.username})`,
      description: `This is the page of @${user.username}`,
    };
}

interface UserLayoutProps {
    params: { username: string };
    children: React.ReactNode;
}

export default async function UserLayout({
    params,
    children
} : UserLayoutProps) {

    const supabaseServer = createServerClient();

    const { data: user } = await supabaseServer.from('user').select('*').eq('username', params.username).single();

    if (!user) notFound()
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}