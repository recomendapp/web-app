import { notFound, redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import CreateReviewForm from './_components/CreateReviewFrom';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';

export async function generateMetadata({
  params,
}: {
  params: {
    lang: string;
    film: string;
  };
}) {
  const { id: movieId } = getIdFromSlug(params.film);
  const supabase = createServerClient(params.lang);

  const { data: movie } = await supabase
    .from('movie')
    .select(`title`)
    .eq('movie_id', movieId)
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
    film: string;
  };
}) {
  const { id: movieId } = getIdFromSlug(params.film);
  const supabase = createServerClient(params.lang);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/auth/login?redirect=${encodeURIComponent(`/film/${movieId}/review/create`)}`);

  const { data: review } = await supabase
    .from('user_movie_review')
    .select(`id`)
    .eq('user_id', user.id)
    .eq('movie_id', movieId)
    .single();

  if (review) redirect(`/film/${movieId}/review/${review.id}`);

  const { data: movie } = await supabase
    .from('movie')
    .select(`*`)
    .eq('id', movieId)
    .single();

  if (!movie) notFound();

  return <CreateReviewForm movie={movie} />;
}
