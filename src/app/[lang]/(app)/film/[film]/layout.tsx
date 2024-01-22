import { notFound } from 'next/navigation';

// GRAPHQL
import apolloServer from '@/lib/apollo/server';
import GET_MOVIE_BY_ID from '@/graphql/Movie/queries/GetMovieById';
import type { GetMovieByIdQuery } from '@/graphql/__generated__/graphql';

// COMPONENTS
import MovieHeader from './components/MovieHeader';
import MovieNavbar from './components/MovieNavbar';

interface LayoutProps {
	children: React.ReactNode;
	params: {
		lang: string;
		film: number;
	};
}

export async function generateMetadata({
	params,
  }: {
	params: {
	  lang: string;
	  film: number;
	};
  }) {
	const { data: movieQuery } = await apolloServer.query<GetMovieByIdQuery>({
	  query: GET_MOVIE_BY_ID,
	  variables: {
		filter: {
		  id: { eq: params.film },
		},
		locale: params.lang,
	  },
	});
	const movie = movieQuery?.tmdb_movieCollection?.edges[0].node;
  
	if (!movie) return { title: 'Film introuvable' };
  
	return {
	  title: movie.data?.edges[0].node.title,
	  description: `This is the page of ${movie.data?.edges[0].node.title}`,
	};
  }

export default async function MovieLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: {
	  lang: string;
	  film: number;
	};
}) {
	const { data: movieQuery } = await apolloServer.query<GetMovieByIdQuery>({
		query: GET_MOVIE_BY_ID,
		variables: {
		  filter: {
			id: { eq: params.film },
		  },
		  locale: params.lang,
		},
	  });
	  const movie = movieQuery?.tmdb_movieCollection?.edges[0].node;
	
	  if (!movie) notFound();
	return (
		<main>
			<MovieHeader movie={movie} />
			<div className="px-4 pb-4">
				<MovieNavbar movieId={String(params.film)} />
				{children}
			</div>
		</main>
	);
};
