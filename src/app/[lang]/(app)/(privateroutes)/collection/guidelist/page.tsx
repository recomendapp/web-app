'use client';

import { useQuery } from '@tanstack/react-query';
import { TableGuidelist } from './_components/table/TableGuidelist';
import { GuidelistHeader } from './_components/GuidelistHeader';
import { useAuth } from '@/context/auth-context';
import { useLocale } from 'next-intl';
import { supabase } from '@/lib/supabase/client';
import { UserMovieGuidelist } from '@/types/type.db';

export default function Guidelist() {
  const { user } = useAuth();
  const locale = useLocale();

  const {
    data: guidelist,
  } = useQuery({
    queryKey: ['user', user?.id, 'collection', 'guidelist'],
    queryFn: async () => {
      if (!user?.id || !locale) throw new Error('No user or locale');
      const { data } = await supabase
        .from('user_movie_guidelist_view')
        .select(`
          *,
          movie:movies(
            *,
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
        .eq('status', 'active')
        .eq('movie.language', locale)
        .eq('movie.genres.genre.data.language', locale)
        .eq('movie.directors.job', 'Director')
        .order('created_at', { ascending: true })
      return data;
    },
    enabled: !!user?.id && !!locale,
  });

  if (!guidelist) return null;

  return (
    <main className="h-full">
      <GuidelistHeader data={guidelist} />
      <div className="p-4">
        <TableGuidelist data={guidelist} />
      </div>
    </main>
  );
}
