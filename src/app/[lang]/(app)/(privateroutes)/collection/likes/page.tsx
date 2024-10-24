'use client';

import { useQuery } from '@tanstack/react-query';
import { TableLikes } from './_components/table/TableLikes';
import { LikesHeader } from './_components/LikesHeader';
import { useAuth } from '@/context/auth-context';
import { useLocale } from 'next-intl';
import { useSupabaseClient } from '@/context/supabase-context';

export default function Likes() {
  const supabase = useSupabaseClient();
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
          movie(*)
        `)
        .eq('user_id', user.id)
        .eq('is_liked', true)
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
