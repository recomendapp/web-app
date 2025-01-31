'use client';

import { TableMyRecos } from './_components/table/TableMyRecos';
import { MyRecosHeader } from './_components/MyRecosHeader';
import { useAuth } from '@/context/auth-context';
import { useUserRecosQuery } from '@/features/client/user/userQueries';

export default function MyRecos() {
  const { user } = useAuth();

  const {
    data: recos,
    isLoading,
    isError,
  } = useUserRecosQuery({
    userId: user?.id,
  });

  if (!recos) return null;

  return (
    <div className="h-full">
      <MyRecosHeader data={recos} />
      <TableMyRecos data={recos} className='m-4'/>
    </div>
  );
}
