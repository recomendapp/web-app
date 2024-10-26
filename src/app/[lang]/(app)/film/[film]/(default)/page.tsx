import { notFound } from 'next/navigation';
import MovieDescription from './_components/MovieDescription';
import { getMovie } from './getMovie';

export default async function MoviePage({
  params,
}: {
  params: {
    lang: string;
    film: string;
  };
}) {
	const { movie } = await getMovie(params.film, params.lang);
	if (!movie) notFound();
	return <MovieDescription movie={movie as any} />;
}
