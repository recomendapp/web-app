import { notFound, redirect } from 'next/navigation';
import CreateReviewForm from '@/app/[lang]/(app)/(privateroutes)/film/[film]/review/create/_components/CreateReviewFrom';
import { createServerClient } from '@/lib/supabase/server';

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
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/auth/login');

  const { data: review } = await supabase
    .from('user_movie_review')
    .select(`id`)
    .eq('user_id', session?.user.id)
    .eq('movie_id', params.film)
    .single();

  if (review) redirect(`/film/${params.film}/review/${review.id}`);

  const { data: movie } = await supabase
    .from('tmdb_movie')
    .select(`
      *,
      data:tmdb_movie_translation(*)
    `)
    .eq('id', params.film)
    .eq('data.language_id', params.lang)
    .single();

  if (!movie) notFound();

  return <CreateReviewForm movie={movie} />;
}
