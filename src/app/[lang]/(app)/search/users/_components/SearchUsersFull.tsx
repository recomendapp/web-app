'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { CardUser } from '@/components/Card/CardUser';
import { useTranslations } from 'next-intl';
import { useSearchUsersInfinite } from '@/features/client/search/searchQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function SearchUsersFull({
  query,
}: {
  query: string | undefined;
}) {
  const t = useTranslations('common');
  const { ref, inView } = useInView();

  const {
		data: users,
		isLoading: loading,
		fetchNextPage,
		hasNextPage,
	} = useSearchUsersInfinite({
    query: query,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, users, fetchNextPage]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8 gap-4 max-h-screen overflow-hidden">
        {Array.from({ length: 20 }).map((_, index) => (
          <Skeleton
            key={index}
            className="flex flex-col items-center bg-secondary h-full rounded-xl p-2 gap-2"
          >
            {/* AVATAR */}
            <Skeleton className="bg-background h-[150px] w-[150px] rounded-full" />
            {/* NAME */}
            <Skeleton className="bg-background h-5 w-20" />
            <Skeleton className="bg-background h-5 w-20 rounded-full" />
          </Skeleton>
        ))}
      </div>
    );
  }

  if (!loading && !users?.pages[0]?.length) {
    return (
      <p className='text-muted-foreground'>
        {t.rich('messages.no_results_for', {
          query: query,
          strong: (chunks) => <strong>{chunks}</strong>,
        })}
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8 gap-4 overflow-x-auto overflow-y-hidden">
      {users?.pages.map((page, i) => (
        page?.map((user, index) => (
          <div
            key={user.id}
            ref={(i === users.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
          >
            <CardUser
              variant="vertical"
              user={user}
              className="w-full"
              linked
            />
          </div>
        ))
      ))}
    </div>
  );
}
