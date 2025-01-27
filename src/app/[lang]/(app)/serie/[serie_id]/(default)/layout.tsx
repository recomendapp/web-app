import { notFound } from 'next/navigation';
import TvSerieHeader from './_components/TvSerieHeader';
import TvSerieNavbar from './_components/TvSerieNavbar';
import { getTranslations } from 'next-intl/server';
import { upperFirst } from 'lodash';
import { getSerie } from '@/features/server/series';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';

export async function generateMetadata({
	params,
}: {
	params: {
	  lang: string;
	  serie_id: string;
	};
}) {
	const common = await getTranslations({ locale: params.lang, namespace: 'common' });
	const t = await getTranslations({ locale: params.lang, namespace: 'pages.serie' });
	const { id: serieId } = getIdFromSlug(params.serie_id);
	const serie = await getSerie(serieId, params.lang);
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

export default async function SerieLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: {
	  lang: string;
	  serie_id: string;
	};
}) {
	const { id: serieId } = getIdFromSlug(params.serie_id);
	const serie = await getSerie(serieId, params.lang);
	if (!serie) notFound();
	return (
		<>
			<TvSerieHeader serie={serie} />
			<div className="px-4 pb-4">
				<TvSerieNavbar serieId={params.serie_id} />
				{children}
			</div>
		</>
	);
};
