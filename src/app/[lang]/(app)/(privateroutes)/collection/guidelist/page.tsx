'use client';

import { TableGuidelist } from './_components/table/TableGuidelist';
import { GuidelistHeader } from './_components/GuidelistHeader';
import { useAuth } from '@/context/auth-context';
import { useUserGuidelist } from '@/features/user/userQueries';

export default function Guidelist() {
  const { user } = useAuth();

  const {
    data: guidelist,
    isLoading,
    isError,
  } = useUserGuidelist({
    userId: user?.id,
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
