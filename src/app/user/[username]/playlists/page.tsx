import UserPlaylists from "@/components/modules/UserPlaylists/UserPlaylists"
import { getUserDetails } from "@/db/appwrite";
import { notFound } from "next/navigation";

export async function generateMetadata({
    params,
  }: {
    params: { username: string };
  }) {
    const user = await getUserDetails(params.username);
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

export default async function Playlists({
    params
  } : {
    params: { username: string };
  }) {
    const user = await getUserDetails(params.username);
     if (!user) notFound();
    return (
        <UserPlaylists user={user} />
    )
}