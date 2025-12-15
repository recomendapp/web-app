'use client'

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { CardPlaylist } from '@/components/Card/CardPlaylist';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchPlaylistsInfiniteQuery } from '@/features/client/search/searchQueries';
import { useT } from '@/lib/i18n/client';

export default function SearchPlaylistsFull({
  query,
}: {
  query: string | undefined;
}) {
  const { t } = useT();
  const { ref, inView } = useInView();
  const {
    data: playlists,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useSearchPlaylistsInfiniteQuery({
    query: query,
  });
  const loading = isLoading || playlists === undefined;

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, playlists, fetchNextPage]);

  if (!loading && !playlists?.pages[0]?.length) {
    return (
      <p className='text-muted-foreground'>
        {/* {t.rich('messages.no_results_for', {
          query: query || '',
          strong: (chunks) => <strong>{chunks}</strong>,
        })} */}
      </p>
    );
  }

  return (
    <div className=" w-full flex flex-col gap-2">
      <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10 gap-4 overflow-x-auto overflow-y-hidden">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={index}
                className="flex flex-col items-center bg-secondary h-full w-full rounded-xl p-2 gap-2"
              >
                {/* AVATAR */}
                <Skeleton className="bg-background h-[150px] w-[150px] rounded-xl" />
                {/* NAME */}
                <Skeleton className="bg-background h-5 w-20" />
                <Skeleton className="bg-background h-5 w-20 rounded-full" />
              </Skeleton>
            ))
          : playlists?.pages.map((page, i) => (
              page?.map((playlist, index) => (
                <CardPlaylist
                key={index}
                playlist={playlist}
                className={'w-full'}
                ref={(i === playlists.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
                />
              ))
            ))
          }
      </div>
    </div>
  );
}
