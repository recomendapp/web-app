'use client';

import { useQuery } from '@tanstack/react-query';
import { TableGuidelist } from './_components/table/TableGuidelist';
import { GuidelistHeader } from './_components/GuidelistHeader';
import { useAuth } from '@/context/auth-context';
import { useLocale } from 'next-intl';
import { useSupabaseClient } from '@/context/supabase-context';

export default function Guidelist() {
  const supabase = useSupabaseClient();
  const { user } = useAuth();
  const locale = useLocale();

  const {
    data: guidelist,
  } = useQuery({
    queryKey: ['user', user?.id, 'collection', 'guidelist'],
    queryFn: async () => {
      if (!user?.id || !locale) throw new Error('No user or locale');
      const { data } = await supabase
        .from('guidelist')
        .select(`
          *,
          movie(*)
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        // .eq('movie.genres.genre.data.language', locale)
        // .eq('movie.directors.job', 'Director')
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
