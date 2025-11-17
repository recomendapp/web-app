'use client';

import { Link } from "@/lib/i18n/navigation";
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { upperFirst } from 'lodash';
import { useTranslations } from 'next-intl';
import { CardPlaylist } from "@/components/Card/CardPlaylist";
import { useSearchPlaylistsInfiniteQuery } from "@/features/client/search/searchQueries";

export default function SearchPlaylistsSmall({
  query,
  className,
}: {
  query: string | undefined;
  className?: string;
}) {
  const common = useTranslations('common');

  const {
    data: playlists,
    isLoading,
  } = useSearchPlaylistsInfiniteQuery({
    query: query,
  });

  const showSkeleton = playlists === undefined || isLoading;

  if ((!showSkeleton && !playlists) || playlists?.pages[0]?.length == 0) return null;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {showSkeleton
        ? <Skeleton className="h-8 w-32" />
        : (
          <Button
          variant={'link'}
          className="text-2xl font-bold justify-start p-0"
          asChild
          >
            <Link href={`/search/playlists?q=${query}`}>{upperFirst(common('messages.playlist', { count: 2}))}</Link>
          </Button>
        )}
      <ScrollArea className="pb-4">
        <div className="flex gap-4">
        {showSkeleton ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div
                key={index}
                className="flex flex-col items-center w-48 gap-2"
              >
                {/* AVATAR */}
                <Skeleton className="bg-background w-full aspect-square rounded-xl" />
                {/* NAME */}
                <div className="flex flex-col w-full gap-1">
                  <Skeleton className="bg-background h-5 w-36" />
                  <Skeleton className="bg-background h-5 w-14 " />
                </div>
              </div>
          ))
        ) : playlists?.pages.map((page, i) => (
            page?.map((playlist) => (
              <CardPlaylist
              key={playlist?.id}
              playlist={playlist}
              className={'w-48'}
              />
            ))
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
