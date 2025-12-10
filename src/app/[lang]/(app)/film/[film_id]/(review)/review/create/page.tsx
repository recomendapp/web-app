import { getIdFromSlug } from '@/utils/get-id-from-slug';
import { getTranslations } from 'next-intl/server';
import { upperFirst } from 'lodash';
import { getMovie } from '@/features/server/media/mediaQueries';
import { Metadata } from 'next';
import { MovieCreateReview } from './_components/MovieCreateReview';
import { notFound } from 'next/navigation';
import { SupportedLocale } from '@/translations/locales';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
      film_id: string;
    }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang as SupportedLocale });
  const { id: movieId } = getIdFromSlug(params.film_id);
  const movie = await getMovie(params.lang, movieId);
  if (!movie) return { title: upperFirst(t('common.messages.film_not_found')) };
  return {
    title: t('pages.review.create.metadata.title', { title: movie.title! }),
    description: t('pages.review.create.metadata.description', { title: movie.title! }),
  };
}

export default async function CreateReview(
  props: {
    params: Promise<{
      lang: string;
      film_id: string;
    }>;
  }
) {
  const params = await props.params;
  const { id: movieId } = getIdFromSlug(params.film_id);
  const movie = await getMovie(params.lang, movieId);
  if (!movie) return notFound();
  return <MovieCreateReview movie={movie} slug={params.film_id} />;
}
