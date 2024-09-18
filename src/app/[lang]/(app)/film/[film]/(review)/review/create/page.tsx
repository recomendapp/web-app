import { notFound, redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import CreateReviewForm from './_components/CreateReviewFrom';

export async function generateMetadata({
  params,
}: {
  params: {
    lang: string;
    film: number;
  };
}) {
  const supabase = createServerClient();

  const { data: movie } = await supabase
    .from('tmdb_movie_translation')
    .select(`title`)
    .eq('movie_id', params.film)
    .eq('language_id', params.lang)
    .single();

  if (!movie) {
    return {
      title: 'Oups, film introuvable !',
    };
  }

  return {
    title: `Ajouter une critique pour ${movie.title}`,
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
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/auth/login?redirect=${encodeURIComponent("/film/${params.film}/review/create")}`);

  const { data: review } = await supabase
    .from('user_movie_review')
    .select(`id`)
    .eq('user_id', user.id)
    .eq('movie_id', params.film)
    .single();

  if (review) redirect(`/film/${params.film}/review/${review.id}`);

  const { data: movie } = await supabase
    .from('movie')
    .select(`*`)
    .eq('id', params.film)
    .eq('language', params.lang)
    .single();

  if (!movie) notFound();

  return <CreateReviewForm movie={movie} />;
}
