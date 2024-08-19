import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import Review from './_components/Review';

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
    .from('user_movie_review_view')
    .select('*, user(username), movie(id, title)')
    .eq('id', params.review)
    .eq('movie.language', params.lang)
    .single();
  
  if (!review || error) {
    return {
      title: 'Oups, utilisateur introuvable !',
    };
  }
  return {
    title: `${review.title} by (@${review.user?.username})`,
    description: `Critique de ${review.movie?.title} par @${review.user?.username}`,
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
    .from('user_movie_review_view')
    .select('*, user(*), movie(*)')
    .eq('id', params.review)
    .eq('movie.language', params.lang)
    .single();

  if (!review || error) notFound();

  return (<Review reviewServer={review} />);
}
