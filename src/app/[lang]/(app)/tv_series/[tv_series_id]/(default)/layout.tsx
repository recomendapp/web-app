import { notFound } from 'next/navigation';
import TvSeriesHeader from './_components/TvSeriesHeader';
import TvSeriesNavbar from './_components/TvSeriesNavbar';
import { getTranslations } from 'next-intl/server';
import { upperFirst } from 'lodash';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { getTvSeries } from '@/features/server/media/mediaQueries';

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
    const t = await getTranslations({ locale: params.lang, namespace: 'pages.serie' });
    const { id: serieId } = getIdFromSlug(params.tv_series_id);
    const serie = await getTvSeries({
      id: serieId,
      locale: params.lang,
    });
    if (!serie) return { title: upperFirst(common('errors.serie_not_found')) };
    return {
		title: t('metadata.title', { title: serie.name, year: new Date(String(serie.first_air_date)).getFullYear() }),
		description: serie.created_by
			? t('metadata.description', {
				title: serie.name,
				creators: new Intl.ListFormat(params.lang, { style: 'long', type: 'conjunction' }).format(serie.created_by.map((creator: any) => creator.name)),
				year: new Date(String(serie.first_air_date)).getFullYear(),
				overview: serie.overview,
			}) : t('metadata.description_no_creator', {
				title: serie.name,
				year: new Date(String(serie.first_air_date)).getFullYear(),
				overview: serie.overview,
			}),
	};
}

export default async function TvSeriesLayout(
    props: {
        children: React.ReactNode;
        params: Promise<{
          lang: string;
          tv_series_id: string;
        }>;
    }
) {
    const params = await props.params;

    const {
        children
    } = props;

    const { id: serieId } = getIdFromSlug(params.tv_series_id);
    const serie = await getTvSeries({
      id: serieId,
      locale: params.lang,
    });
    if (!serie) notFound();
    return (
		<>
			<TvSeriesHeader serie={serie} />
			<div className="px-4 pb-4">
				<TvSeriesNavbar serieId={params.tv_series_id} />
				{children}
			</div>
		</>
	);
};
