import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import Review from './components/Review';

export async function generateMetadata({
  params,
}: {
  params: {
    lang: string;
    review: string;
  };
}) {
  const supabase = createServerClient();
  const { data: review, error } = await supabase
    .from('user_movie_review')
    .select('*, user(username), movie: tmdb_movie(id, data:tmdb_movie_translation(title))')
    .eq('id', params.review)
    .eq('movie.data.language_id', params.lang)
    .single();
  
  if (!review || error) {
    return {
      title: 'Oups, utilisateur introuvable !',
    };
  }
  return {
    title: `${review.title} by (@${review.user?.username})`,
    description: `Critique de ${review.movie?.data[0].title} par @${review.user?.username}`,
  };
}

export default async function ReviewPage({
  params,
}: {
  params: {
    lang: string;
	  review: string;
  };
}) {
  const supabase = createServerClient();
  const { data: review, error } = await supabase
    .from('user_movie_review')
    .select('*')
    .eq('id', params.review)
    .single();

  if (!review || error) notFound();

  return (<Review reviewId={params.review} />)
}
