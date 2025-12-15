import { getIdFromSlug } from '@/utils/get-id-from-slug';
import { upperFirst } from 'lodash';
import { getMovie } from '@/features/server/media/mediaQueries';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MovieEditReview } from './_components/MovieEditReview';
import { MediaMovie } from '@recomendapp/types';
import { getT } from '@/lib/i18n';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
      film_id: string;
    }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getT();
  const { id: movieId } = getIdFromSlug(params.film_id);
  try {
    const movie = await getMovie(params.lang, movieId);
    return {
      title: t('pages.review.create.metadata.title', { title: movie.title! }),
      description: t('pages.review.create.metadata.description', { title: movie.title! }),
    };
  } catch {
    return { title: upperFirst(t('common.messages.film_not_found')) };
  }
}

export default async function EditReview(
  props: {
    params: Promise<{
      lang: string;
      film_id: string;
	  review_id: string;
    }>;
  }
) {
  const params = await props.params;
  const { id: movieId } = getIdFromSlug(params.film_id);
  let movie: MediaMovie;
  try {
    movie = await getMovie(params.lang, movieId);
  } catch {
    return notFound();
  }
  return <MovieEditReview movie={movie} reviewId={parseInt(params.review_id)} />;
}
