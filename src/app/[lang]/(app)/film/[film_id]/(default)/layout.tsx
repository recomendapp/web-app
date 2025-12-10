import { notFound } from 'next/navigation';
import MovieHeader from './_components/MovieHeader';
import MovieNavbar from './_components/MovieNavbar';
import { getIdFromSlug } from '@/utils/get-id-from-slug';
import { getMovie, getMovieUserActivitiesFollowerAverageRating } from '@/features/server/media/mediaQueries';

export default async function MovieLayout(
  props: {
      children: React.ReactNode;
      params: Promise<{
        lang: string;
        film_id: string;
      }>;
  }
) {
  const params = await props.params;

  const {
      children
  } = props;
  const { id: movieId } = getIdFromSlug(params.film_id);
  const movie = await getMovie(params.lang, movieId);
  if (!movie) notFound();
  const followersAvgRating = await getMovieUserActivitiesFollowerAverageRating({
    movieId: movieId,
  })
  return (
  <>
    <MovieHeader movie={movie} followersAvgRating={followersAvgRating?.follower_avg_rating} />
    <div className="px-4 pb-4 flex flex-col items-center">
        <div className='max-w-7xl w-full'>
          <MovieNavbar movieSlug={params.film_id} />
          {children}
        </div>
    </div>
  </>
	);
};
