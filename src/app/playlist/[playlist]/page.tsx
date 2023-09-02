import {
  checkUsernameExist,
  databases,
  getUserDetails,
} from '@/utils/appwrite';
import { PlusCircle } from 'lucide-react';
import PlaylistItems from './PlaylistItems';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import PlaylistDetails from '@/components/movie/playlist/PlaylistDetails';

export async function generateMetadata({
  params,
}: {
  params: { playlist: string };
}) {
  const playlist = await getPlaylistDetails(params.playlist);
  if (!playlist) {
    return {
      title: 'Oups, playlist introuvable !',
    };
  }
  return {
    title: `${playlist.title} - playlist by ${playlist.userId.username}`,
    description: `${playlist.description}`,
  };
}

async function getPlaylistDetails(id: string) {
  try {
    return await databases.getDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST),
      id
    );
  } catch (error) {
    return;
  }
}

export default async function Playlist({
  params,
}: {
  params: { playlist: string };
}) {
  const playlist = await getPlaylistDetails(params.playlist);

  if (!playlist) {
    return <NotFound />;
  }

  return <PlaylistDetails playlistServer={playlist} />;
}

export function NotFound() {
  return (
    <main 
      className="bg-white w-full h-full flex justify-center items-center"
      style={{
        backgroundImage: `url('https://s.ltrbxd.com/static/img/errors/not-found-2.f67937bb.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='text-4xl font-bold'>
        Oups, cette playlist n'existe pas !
      </div>
    </main>
  )
}