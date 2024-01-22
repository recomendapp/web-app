import { supabase } from '@/lib/supabase/client';
import { QueryClient, useQueryClient } from 'react-query';

export default async function insertMovieActivityMutation({
  queryClient,
  movie_id,
  user_id,
  is_liked,
  rating,
}: {
  queryClient: QueryClient;
  movie_id: number;
  user_id: string;
  is_liked?: boolean;
  rating?: number;
}) {
  const { data, error } = await supabase
    .from('user_movie_activity')
    .insert({
      movie_id: movie_id,
      user_id: user_id,
      is_liked: is_liked ?? false,
      rating: rating ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  queryClient.setQueryData(
    ['user', user_id, 'film', movie_id, 'watchlist'],
    false
  );
  return data;
}
