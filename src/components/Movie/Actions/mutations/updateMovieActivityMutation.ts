import { supabase } from '@/lib/supabase/client';

export default async function updateMovieActivityMutation({
  movie_id,
  user_id,
  data,
}: {
  movie_id: number;
  user_id: string;
  data: any;
}) {
  const { data: response, error } = await supabase
    .from('user_movie_activity')
    .update(data)
    .eq('movie_id', movie_id)
    .eq('user_id', user_id)
    .select()
    .single();
  if (error) throw error;
  return response;
}
