'use client';
import Link from 'next/link';
import MoviePlaylistCard from '@/components/Playlist/FilmPlaylist/MoviePlaylistCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@/context/supabase-context';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { upperFirst } from 'lodash';
import { useTranslations } from 'next-intl';

export default function SearchPlaylistsSmall({
  query,
  className,
}: {
  query: string | undefined;
  className?: string;
}) {
  const common = useTranslations('common');
  const supabase = useSupabaseClient();
  const numberOfResult = 8;

  const {
		data: playlists,
		isLoading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: ['search', 'playlist', { search: query }],
		queryFn: async ({ pageParam = 1 }) => {
      if (!query) return null;
			let from = (pageParam - 1) * numberOfResult;
			let to = from - 1 + numberOfResult;

			const { data } = await supabase
        .from('playlists')
        .select('*')
        .order('updated_at', { ascending: false})
        .range(from, to)
        .ilike(`title`, `${query}%`);
        
			return (data);
		},
		initialPageParam: 1,
		getNextPageParam: (data, pages) => {
			return data?.length == numberOfResult ? pages.length + 1 : undefined;
		},
		enabled: !!query
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
            <Link href={`/search/playlists?q=${query}`}>{upperFirst(common('word.playlist', { count: 2}))}</Link>
          </Button>
        )}
      <ScrollArea className="pb-4">
        <div className="flex gap-4">
        {showSkeleton ? (
          Array.from({ length: 4 }).map((playlist: any, index) => (
            <MoviePlaylistCard
              key={index}
              playlist={playlist}
              className={'w-48'}
              skeleton
            />
          ))
        ) : playlists?.pages.map((page, i) => (
            page?.map((playlist, index) => (
              <MoviePlaylistCard
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
