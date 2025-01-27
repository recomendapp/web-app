import { notFound } from 'next/navigation';
import MovieHeader from './_components/MovieHeader';
import MovieNavbar from './_components/MovieNavbar';
import { getMovie } from '@/features/server/movies';
import { getTranslations } from 'next-intl/server';
import { upperFirst } from 'lodash';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';

export async function generateMetadata({
	params,
}: {
	params: {
	  lang: string;
	  film_id: string;
	};
}) {
	const common = await getTranslations({ locale: params.lang, namespace: 'common' });
	const t = await getTranslations({ locale: params.lang, namespace: 'pages.film' });
	const { id: movieId} = getIdFromSlug(params.film_id);
	const movie = await getMovie(movieId, params.lang);
	if (!movie) return { title: upperFirst(common('errors.film_not_found')) };
	return {
		title: t('metadata.title', { title: movie.title, year: new Date(String(movie.release_date)).getFullYear() }),
		description: movie.directors
			? t('metadata.description', {
				title: movie.title,
				directors: new Intl.ListFormat(params.lang, { style: 'long', type: 'conjunction' }).format(movie.directors.map((director: any) => director.name)),
				year: new Date(String(movie.release_date)).getFullYear(),
				overview: movie.overview,
			}) : t('metadata.description_no_creator', {
				title: movie.title,
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
	  film_id: string;
	};
}) {
	const { id: movieId } = getIdFromSlug(params.film_id);
	const movie = await getMovie(movieId, params.lang);
	if (!movie) notFound();
	return (
		<>
			<MovieHeader movie={movie} />
			<div className="px-4 pb-4">
				<MovieNavbar movieId={params.film_id} />
				{children}
			</div>
		</>
	);
};
