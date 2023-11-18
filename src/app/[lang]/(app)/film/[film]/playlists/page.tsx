import { getMovieDetails } from '@/lib/tmdb/tmdb';
import MovieHeader from '../assets/MovieHeader';
import MovieNavbar from '../assets/MovieNavbar';
import { notFound } from 'next/navigation';
import { ShowPlaylists } from '@/components/Playlist/ShowPlaylists/ShowPlaylists';

export async function generateMetadata({
  params,
}: {
  params: {
    lang: string;
    film: number;
  };
}) {
  const film = await getMovieDetails(params.film, params.lang);
  if (!film) {
    return {
      title: 'Oups, film introuvable !',
    };
  }
  return {
    title: film.title,
    description: `This is the page of ${film.title}`,
  };
}

export default async function Reviews({
  params
}: {
  params: {
    lang: string;
    film: number;
  }
}) {
  const film = await getMovieDetails(params.film, params.lang);

  if (!film) notFound();

  return (
    <main>
      <MovieHeader movie={film} />
      <div className='px-4 pb-4'>
        <MovieNavbar focus={"playlists"} movieId={film.id} />
        <ShowPlaylists filmId={String(film.id)} />
      </div>
    </main>
  )
}