import { notFound } from 'next/navigation';
import { getIdFromSlug } from '@/utils/get-id-from-slug';
import { upperFirst } from 'lodash';
import { getTranslations } from 'next-intl/server';
import { getTvSeries } from '@/features/server/media/mediaQueries';
import { Metadata } from 'next';
import { SupportedLocale } from '@/translations/locales';
import { TvSeriesEditReview } from './_components/TvSeriesEditReview';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
      tv_series_id: string;
    }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang as SupportedLocale });
  const { id: serieId } = getIdFromSlug(params.tv_series_id);
  const serie = await getTvSeries(params.lang, serieId);
  if (!serie) return { title: upperFirst(t('common.messages.tv_series_not_found')) };
  return {
    title: t('pages.review.create.metadata.title', { title: serie.name! }),
    description: t('pages.review.create.metadata.description', { title: serie.name! }),
  };
}

export default async function EditReview(
  props: {
    params: Promise<{
      lang: string;
      tv_series_id: string;
      review_id: string;
    }>;
  }
) {
  const params = await props.params;
  const { id: serieId } = getIdFromSlug(params.tv_series_id);
  const serie = await getTvSeries(params.lang, serieId);
  if (!serie) return notFound();
  return <TvSeriesEditReview tvSeries={serie} reviewId={parseInt(params.review_id)} />;
}
