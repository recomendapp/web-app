import { notFound } from 'next/navigation';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { getMovie } from '@/features/server/media/mediaQueries';
import Reviews from '@/components/Review/Reviews';

export default async function MovieReviewsPage(
  props: {
    params: Promise<{
      lang: string;
      film_id: string;
    }>;
  }
) {
  const params = await props.params;
  const { id: movieId } = getIdFromSlug(params.film_id);
  const movie = await getMovie({
    id: movieId,
    locale: params.lang,
  });
  if (!movie) notFound();
  return <Reviews mediaId={movie.media_id!} />;
}
