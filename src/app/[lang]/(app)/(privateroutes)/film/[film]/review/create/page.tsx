import { notFound, redirect } from 'next/navigation';
// import { createServerClient } from "@/lib/supabase/server";
import { getMovieDetails } from '@/lib/tmdb/tmdb';
import CreateReviewForm from '@/components/Review/form/CreateReviewFrom';
import { createServerClient } from '@/lib/supabase/server';

// GRAPHQL
import apolloServer from '@/lib/apollo/server';
import GET_MOVIE_BY_ID from '@/graphql/Movie/queries/GetMovieById';
import type { GetMovieByIdQuery } from '@/graphql/__generated__/graphql';

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

  if (!movie) {
    return {
      title: 'Oups, film introuvable !',
    };
  }

  return {
    title: `Ajouter une critique pour ${movie.data?.edges[0].node.title}`,
  };
}

export default async function CreateReview({
  params,
}: {
  params: {
    lang: string;
    film: number;
  };
}) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: review } = await supabase
    .from('user_movie_review')
    .select('*')
    .eq('user_id', session?.user.id)
    .eq('movie_id', params.film)
    .single();

  const { data: user } = await supabase
    .from('user')
    .select('*')
    .eq('id', session?.user.id)
    .single();

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

  if (review) redirect(`/@${user.username}/film/${params.film}`);

  return <CreateReviewForm film={movie} user={user} />;
}
