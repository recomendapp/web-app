import { getMovieDetails } from '@/hooks/tmdb';
import MovieHeader from './assets/MovieHeader';
import MovieDescription from './assets/MovieDescription';
import MovieNavbar from './assets/MovieNavbar';

export async function generateMetadata({
  params,
}: {
  params: { movie: string };
}) {
  const movie = await getMovieDetails(params.movie, 'fr-FR');
  if (movie.success === false) {
    return {
      title: 'Oups, film introuvable !',
    };
  }
  return {
    title: movie.title,
    description: `This is the page of ${movie.title}`,
  };
}

export default async function Movie({ params }: { params: { movie: string } }) {
  const movie = await getMovieDetails(params.movie, 'fr-FR');

  if (movie.success === false) throw Error;

  return (
    <main>
      <MovieHeader movie={movie} />
      <div className='px-4 pb-4'>
        <MovieNavbar focus={"description"} movieId={movie.id} />
        <MovieDescription movie={movie} />
      </div>
    </main>
  )
}
