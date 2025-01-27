import { notFound, redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { upperFirst } from 'lodash';
import { getTranslations } from 'next-intl/server';
import { getSerie } from '@/features/server/series';
import CreateReviewForm from '@/components/review/CreateReviewFrom';

export async function generateMetadata({
  params,
}: {
  params: {
    lang: string;
    serie_id: string;
  };
}) {
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.review.create.metadata' });
  const { id: serieId } = getIdFromSlug(params.serie_id);
  const serie = await getSerie(serieId, params.lang);

  if (!serie) return { title: upperFirst(common('errors.serie_not_found')) };

  return {
    title: t('metadata.title', { title: serie.name }),
    description: t('metadata.description', { title: serie.name }),
  };
}

export default async function CreateReview({
  params,
}: {
  params: {
    lang: string;
    serie_id: string;
  };
}) {
  const { id: serieId } = getIdFromSlug(params.serie_id);
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/auth/login?redirect=${encodeURIComponent(`/serie/${serieId}/review/create`)}`);

  const { data: review } = await supabase
    .from('user_review')
    .select(`id`)
    .match({
      user_id: user.id,
      media_id: serieId,
      media_type: 'tv_serie',
    })
    .single();

  if (review) redirect(`/serie/${serieId}/review/${review.id}`);

  const serie = await getSerie(serieId, params.lang);

  if (!serie) notFound();

  return (
    <CreateReviewForm
    media={{
      id: serie.id,
      media_type: 'tv_serie',
      poster_path: serie.poster_path,
      title: serie.name,
      credits: serie.created_by,
      slug: serie.slug,
    }}
    />
  );
}
