import { notFound } from 'next/navigation';
import TvSerieHeader from './_components/TvSerieHeader';
import MovieNavbar from './_components/TvSerieNavbar';
import { getTranslations } from 'next-intl/server';
import { upperFirst } from 'lodash';
import { getSerie } from '@/data/supabase/series';

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
	const { serie } = await getSerie(params.serie_id, params.lang);
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
	const { id, serie } = await getSerie(params.serie_id, params.lang);
	if (!serie) notFound();
	return (
		<>
			<TvSerieHeader serie={serie as any} />
			<div className="px-4 pb-4">
				<MovieNavbar serieId={id} />
				{children}
			</div>
		</>
	);
};
