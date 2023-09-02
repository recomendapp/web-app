import { getMovieDetails } from '@/hooks/tmdb';
import MovieHeader from '../assets/MovieHeader';
import MovieNavbar from '../assets/MovieNavbar';
import { MovieReview } from './assets/MovieReview';

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

export default async function Reviews({ params }: { params: { movie: string } }) {
  const movie = await getMovieDetails(params.movie, 'fr-FR');

  if (movie.success === false) throw Error;

  return (
    <div>
      <MovieHeader movie={movie} />
      <div className='px-4 pb-4'>
        <MovieNavbar focus={"reviews"} movieId={movie.id} />
        <MovieReview movie={movie} />
      </div>
    </div>
  )
}