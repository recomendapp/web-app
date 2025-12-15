import { notFound } from 'next/navigation';
import { getIdFromSlug } from '@/utils/get-id-from-slug';
import { upperFirst } from 'lodash';
import { getTvSeries } from '@/features/server/media/mediaQueries';
import { Metadata } from 'next';
import { SupportedLocale } from '@/translations/locales';
import { TvSeriesEditReview } from './_components/TvSeriesEditReview';
import { MediaTvSeries } from '@recomendapp/types';
import { getT } from '@/lib/i18n';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
      tv_series_id: string;
    }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getT();
  const { id: serieId } = getIdFromSlug(params.tv_series_id);
  try {
    const serie = await getTvSeries(params.lang, serieId);
    return {
      title: t('pages.review.create.metadata.title', { title: serie.name! }),
      description: t('pages.review.create.metadata.description', { title: serie.name! }),
    };
  } catch {
    return { title: upperFirst(t('common.messages.tv_series_not_found')) };
  }
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
  let serie: MediaTvSeries;
  try {
    serie = await getTvSeries(params.lang, serieId);
  } catch {
    return notFound();
  }
  return <TvSeriesEditReview tvSeries={serie} reviewId={parseInt(params.review_id)} />;
}
