'use client';

import { useQuery } from '@tanstack/react-query';
import { TableLikes } from './_components/table/TableLikes';
import { LikesHeader } from './_components/LikesHeader';
import { useAuth } from '@/context/auth-context';
import { useLocale } from 'next-intl';
import { supabase } from '@/lib/supabase/client';

export default function Likes() {
  const locale = useLocale();
  const { user } = useAuth();

  const {
    data: likes,
  } = useQuery({
    queryKey: ['user', user?.id, 'collection', 'likes'],
    queryFn: async () => {
      if (!user?.id || !locale) throw new Error('No user or locale');
      const { data } = await supabase
        .from('user_movie_activity')
        .select(`
          *,
          movie:tmdb_movie(
            *,
            data:tmdb_movie_translation(*),
            genres:tmdb_movie_genre(
              id,
              genre:tmdb_genre(
                *,
                data:tmdb_genre_translation(*)
              )
            ),
            directors:tmdb_movie_credits(
              id,
              person:tmdb_person(*)
            )
          )
        `)
        .eq('user_id', user.id)
        .eq('is_liked', true)
        .eq('movie.data.language_id', locale)
        .eq('movie.genres.genre.data.language', locale)
        .eq('movie.directors.job', 'Director')
        .order('created_at', { ascending: true });
      return data;
    },
    enabled: !!user?.id && !!locale,
  });

  if (!likes) return null;

  return (
    <main className="h-full">
      <LikesHeader data={likes} />
      <div className="p-4">
        <TableLikes data={likes} />
      </div>
    </main>
  );
}
