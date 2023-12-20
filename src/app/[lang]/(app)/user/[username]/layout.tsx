import { notFound } from "next/navigation";
import { Fragment } from "react";
import { createServerClient } from "@/lib/supabase/server";

export async function generateMetadata({
    params,
  }: {
    params: { username: string };
  }) {
    const supabase = createServerClient();
    const { data: user } = await supabase.from('user').select('*').eq('username', params.username).single();
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
    const supabase = createServerClient();
    const { data: user } = await supabase.from('user').select('*').eq('username', params.username).single();

    if (!user) notFound()
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}