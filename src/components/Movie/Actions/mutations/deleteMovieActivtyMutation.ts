import { supabase } from '@/lib/supabase/client';

export default async function deleteMovieActivityMutation({
  movie_id,
  user_id,
}: {
  movie_id: number;
  user_id: string;
}) {
  const { data, error } = await supabase
    .from('user_movie_activity')
    .delete()
    .eq('movie_id', movie_id)
    .eq('user_id', user_id);
  if (error) throw error;
  return undefined;
}
