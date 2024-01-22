import { notFound } from 'next/navigation';
import MovieDescription from './components/MovieDescription';

// GRAPHQL
import apolloServer from '@/lib/apollo/server';
import GET_MOVIE_BY_ID from '@/graphql/Movie/queries/GetMovieById';
import type { GetMovieByIdQuery } from '@/graphql/__generated__/graphql';

export default async function MoviePage({
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

  if (!movie) notFound();

  return (<MovieDescription movie={movie} />);
}
