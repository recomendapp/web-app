import { notFound } from 'next/navigation';
import MovieHeader from './_components/MovieHeader';
import MovieNavbar from './_components/MovieNavbar';
import { getMovie } from './getMovie';

export async function generateMetadata({
	params,
}: {
	params: {
	  lang: string;
	  film: string;
	};
}) {
	const { movie } = await getMovie(params.film, params.lang);
	if (!movie) return { title: 'Film introuvable' };
	return {
		title: movie.title,
		description: `This is the page of ${movie.title}`,
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
