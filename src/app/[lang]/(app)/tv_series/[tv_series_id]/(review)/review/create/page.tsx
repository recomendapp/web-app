import { notFound, redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { upperFirst } from 'lodash';
import { getTranslations } from 'next-intl/server';
import { getTvSeries } from '@/features/server/media/mediaQueries';
import CreateReviewForm from '@/components/Review/CreateReviewForm';
import { Media } from '@/types/type.db';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
      tv_series_id: string;
    }>;
  }
) {
  const params = await props.params;
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.review.create.metadata' });
  const { id: serieId } = getIdFromSlug(params.tv_series_id);
  const serie = await getTvSeries({
    id: serieId,
    locale: params.lang,
  });

  if (!serie) return { title: upperFirst(common('errors.serie_not_found')) };

  return {
    title: t('title', { title: serie.title }),
    description: t('description', { title: serie.title }),
  };
}

export default async function CreateReview(
  props: {
    params: Promise<{
      lang: string;
      tv_series_id: string;
    }>;
  }
) {
  const params = await props.params;
  const { id: serieId } = getIdFromSlug(params.tv_series_id);
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/auth/login?redirect=${encodeURIComponent(`/tv_series/${serieId}/review/create`)}`);

  const { data: review } = await supabase
    .from('user_review')
    .select(`id`)
    .match({
      user_id: user.id,
      media_id: serieId,
      media_type: 'tv_series',
    })
    .single();

  if (review) redirect(`/tv_series/${serieId}/review/${review.id}`);

  const serie = await getTvSeries({
    id: serieId,
    locale: params.lang,
  });

  if (!serie) notFound();

  return (
    <CreateReviewForm media={serie as Media} />
  );
}
