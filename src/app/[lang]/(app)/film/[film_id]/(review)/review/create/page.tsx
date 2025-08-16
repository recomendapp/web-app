
import { createServerClient } from '@/lib/supabase/server';
import { getIdFromSlug } from '@/utils/get-id-from-slug';
import { getTranslations } from 'next-intl/server';
import { upperFirst } from 'lodash';
import { getMovie } from '@/features/server/media/mediaQueries';
import { Metadata } from 'next';
import { MovieCreateReview } from './_components/MovieCreateReview';
import { redirect } from '@/lib/i18n/routing';
import { notFound } from 'next/navigation';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
      film_id: string;
    }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.review.create.metadata' });
  const { id: movieId } = getIdFromSlug(params.film_id);
  const movie = await getMovie(params.lang, movieId);
  if (!movie) return { title: upperFirst(common('messages.film_not_found')) };
  return {
    title: t('title', { title: movie.title! }),
    description: t('description', { title: movie.title! }),
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
  const supabase = await createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return redirect({
    href: `/auth/login?redirect=${encodeURIComponent(`/film/${params.film_id}/review/create`)}`,
    locale: params.lang,
  });
  const { data: review, error } = await supabase
    .from('user_activities_movie')
    .select(`review:user_reviews_movie!inner(id)`)
    .match({
      user_id: session.user.id,
      movie_id: movieId,
    })
    .not('review', 'is', null)
    .maybeSingle();
  if (error) throw error;
  if (review) return redirect({
    href: `/film/${params.film_id}/review/${review.review.id}`,
    locale: params.lang,
  });
  const movie = await getMovie(params.lang, movieId);
  if (!movie) notFound();
  return <MovieCreateReview movie={movie} slug={params.film_id} />;
}
