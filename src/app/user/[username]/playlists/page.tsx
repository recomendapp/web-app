import ProfilePlaylists from "@/components/modules/ProfilePlaylists/ProfilePlaylists";
import { getUserDetails } from "@/lib/appwrite";
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
        <ProfilePlaylists user={user} />
    )
}