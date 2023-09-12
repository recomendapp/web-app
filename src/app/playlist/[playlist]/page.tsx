import {
  databases,
} from '@/utils/appwrite';
import PlaylistDetails from '@/components/movie/playlist/PlaylistDetails';
import { handleGetPlaylist } from '@/api/movie/movie_playlist';

export async function generateMetadata({
  params,
}: {
  params: { playlist: string };
}) {
  const playlist = await handleGetPlaylist(params.playlist);
  // const movies = await getMovieDetails();

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

export default async function Playlist({
  params,
}: {
  params: { playlist: string };
}) {
  const playlist = await handleGetPlaylist(params.playlist);

  if (!playlist) {
    throw Error();
    // return <NotFound />;
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <PlaylistDetails playlistServer={playlist} />
    </div>

  )
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
        Oups, playlist introuvable !
      </div>
    </main>
  )
}