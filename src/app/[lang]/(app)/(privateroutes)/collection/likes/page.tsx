'use client';

import { useQuery } from '@tanstack/react-query';
import { TableLikes } from './_components/table/TableLikes';
import { LikesHeader } from './_components/LikesHeader';
import { useAuth } from '@/context/auth-context';
import { useLocale } from 'next-intl';
import { useSupabaseClient } from '@/context/supabase-context';
import { useUserLikesQuery } from '@/features/client/user/userQueries';

export default function Likes() {
  const supabase = useSupabaseClient();
  const locale = useLocale();
  const { user } = useAuth();

  const {
    data: likes,
    isLoading,
    isError,
  } = useUserLikesQuery({
    userId: user?.id,
  });

  if (!likes) return null;

  return (
    <div className="h-full">
      <LikesHeader data={likes} />
      <TableLikes data={likes} className='m-4' />
    </div>
  );
}
