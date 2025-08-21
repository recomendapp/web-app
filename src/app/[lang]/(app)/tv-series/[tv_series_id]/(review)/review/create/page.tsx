import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { getIdFromSlug } from '@/utils/get-id-from-slug';
import { upperFirst } from 'lodash';
import { getTranslations } from 'next-intl/server';
import { getTvSeries } from '@/features/server/media/mediaQueries';
import { redirect } from '@/lib/i18n/routing';
import { Metadata } from 'next';
import { TvSeriesCreateReview } from './_components/TvSeriesCreateReview';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
      tv_series_id: string;
    }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.review.create.metadata' });
  const { id: serieId } = getIdFromSlug(params.tv_series_id);
  const serie = await getTvSeries(params.lang, serieId);
  if (!serie) return { title: upperFirst(common('messages.tv_series_not_found')) };
  return {
    title: t('title', { title: serie.name }),
    description: t('description', { title: serie.name }),
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
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return redirect({
    href: `/auth/login?redirect=${encodeURIComponent(`/tv-series/${params.tv_series_id}/review/create`)}`,
    locale: params.lang,
  });

  const { data: review, error } = await supabase
    .from('user_activities_tv_series')
    .select(`review:user_reviews_tv_series!inner(id)`)
    .match({
      user_id: session.user.id,
      tv_series_id: serieId,
    })
    .not('review', 'is', null)
    .maybeSingle();
  if (error) throw error;
  if (review) redirect({
    href: `/tv-series/${params.tv_series_id}/review/${review.review.id}`,
    locale: params.lang,
  });

  const serie = await getTvSeries(params.lang, serieId);

  if (!serie) notFound();

  return <TvSeriesCreateReview tvSeries={serie} slug={params.tv_series_id} />;
}
