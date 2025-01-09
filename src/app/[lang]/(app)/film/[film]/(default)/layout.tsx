import { notFound } from 'next/navigation';
import MovieHeader from './_components/MovieHeader';
import MovieNavbar from './_components/MovieNavbar';
import { getMovie } from '@/data/supabase/movies';
import { getTranslations } from 'next-intl/server';
import { upperFirst } from 'lodash';

export async function generateMetadata({
	params,
}: {
	params: {
	  lang: string;
	  film: string;
	};
}) {
	const common = await getTranslations({ locale: params.lang, namespace: 'common' });
	const t = await getTranslations({ locale: params.lang, namespace: 'pages.film' });
	const { movie } = await getMovie(params.film, params.lang);
	if (!movie) return { title: upperFirst(common('errors.film_not_found')) };
	return {
		title: t('metadata.title', { title: movie.title, year: new Date(String(movie.release_date)).getFullYear() }),
		description: t('metadata.description', {
			title: movie.title,
			directors: new Intl.ListFormat(params.lang, { style: 'long', type: 'conjunction' }).format(movie.directors.map((director: any) => director.name)),
			year: new Date(String(movie.release_date)).getFullYear(),
			overview: movie.overview,
		}),
	};
}

export default async function MovieLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: {
	  lang: string;
	  film: string;
	};
}) {
	const { id, movie } = await getMovie(params.film, params.lang);
	if (!movie) notFound();
	return (
		<>
			<MovieHeader movie={movie as any} />
			<div className="px-4 pb-4">
				<MovieNavbar movieId={id} />
				{children}
			</div>
		</>
	);
};
