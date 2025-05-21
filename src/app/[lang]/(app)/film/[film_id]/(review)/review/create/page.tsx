import { notFound, redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { getTranslations } from 'next-intl/server';
import { upperFirst } from 'lodash';
import { getMovie } from '@/features/server/media/mediaQueries';
import CreateReviewForm from '@/components/Review/CreateReviewForm';
import { Media } from '@/types/type.db';
import { Metadata } from 'next';

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
  const movie = await getMovie({
		id: movieId,
		locale: params.lang,
	});

  if (!movie) return { title: upperFirst(common('errors.film_not_found')) };

  return {
    title: t('title', { title: movie.title }),
    description: t('description', { title: movie.title }),
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
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/auth/login?redirect=${encodeURIComponent(`/film/${movieId}/review/create`)}`);

  const { data: review } = await supabase
    .from('user_review')
    .select(`id`)
    .match({
      user_id: user.id,
      media_id: movieId,
      media_type: 'movie',
    })
    .single();

  if (review) redirect(`/film/${movieId}/review/${review.id}`);

  const movie = await getMovie({
    id: movieId,
    locale: params.lang,
  });

  if (!movie) notFound();

  return (
    <CreateReviewForm media={movie as Media} />
  );
}
