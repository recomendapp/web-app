import { getMovieDetails } from '@/hooks/tmdb';
import MovieHeader from '../assets/MovieHeader';
import MovieNavbar from '../assets/MovieNavbar';
import { MovieReview } from '../../../../components/modules/Review/Reviews/MovieReviews';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { film: string };
}) {
  const film = await getMovieDetails(params.film, 'en');
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

export default async function Reviews({ params }: { params: { film: string } }) {
  const film = await getMovieDetails(params.film, 'en');

  if (!film) notFound();

  return (
    <main>
      <MovieHeader movie={film} />
      <div className='px-4 pb-4'>
        <MovieNavbar focus={"reviews"} movieId={film.id} />
        <MovieReview filmId={String(film.id)} />
      </div>
    </main>
  )
}