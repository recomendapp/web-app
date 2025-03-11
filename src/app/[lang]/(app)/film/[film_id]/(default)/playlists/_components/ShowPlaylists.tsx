'use client';
import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useInView } from 'react-intersection-observer';
import { z } from "zod";
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMediaPlaylistsInfiniteQuery } from '@/features/client/media/mediaQueries';
import { upperFirst } from 'lodash';
import { Button } from '@/components/ui/button';
import { ArrowDownNarrowWideIcon, ArrowUpNarrowWideIcon } from 'lucide-react';
import { Icons } from '@/config/icons';
import { CardPlaylist } from '@/components/Card/CardPlaylist';

const SORT_BY = ["created_at", "likes_count"] as const;
const DEFAULT_PER_PAGE = 20;
const DEFAULT_SORT_BY = SORT_BY[0];
const DEFAULT_SORT_ORDER = "desc";

const sortBySchema = z.enum(SORT_BY);
const getValidatedSortBy = (order?: string | null): z.infer<typeof sortBySchema> => {
  return sortBySchema.safeParse(order).success ? order! as z.infer<typeof sortBySchema> : DEFAULT_SORT_BY;
};
const orderSchema = z.enum(["asc", "desc"]);
const getValidatedSortOrder = (order?: string | null): z.infer<typeof orderSchema> => {
  return orderSchema.safeParse(order).success ? order! as z.infer<typeof orderSchema> : DEFAULT_SORT_ORDER;
};
const perPageSchema = z.number().int().positive();
const getValidatePerPage = (perPage?: number | null): number => {
  return perPageSchema.safeParse(perPage).success ? perPage! : DEFAULT_PER_PAGE;
}

interface ShowPlaylistsProps {
  mediaId: number;
}

export function ShowPlaylists({
  mediaId,
} : ShowPlaylistsProps) {
  const common = useTranslations('common');
  const searchParams = useSearchParams();
  const sortBy = getValidatedSortBy(searchParams.get('sort_by'));
  const sortOrder = getValidatedSortOrder(searchParams.get('sort_order'));
  const perPage = getValidatePerPage(Number(searchParams.get('per_page')));
  const { ref, inView } = useInView();
  const router = useRouter();

  const {
    data: playlists,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useMediaPlaylistsInfiniteQuery({
    id: mediaId,
    filters: {
      sortBy: sortBy,
      sortOrder: sortOrder,
      perPage: perPage,
    }
  })

  const handleChange = ({ name, value }: { name: string, value: string }) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(name, value);
		router.push(`?${params.toString()}`);
	};

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="@container/movie-playlists w-full h-full flex flex-col items-center gap-4">
      <div className="w-full flex flex-col gap-4 justify-between @md/movie-playlists:flex-row">
        <Button disabled variant={'ghost'} size={'sm'}>
          {upperFirst(common(`messages.create_a_playlist`))}
        </Button>
        <div className="flex justify-end gap-2 items-center">
          <Button variant={'ghost'} size={'sm'} onClick={(e) => {
            e.preventDefault();
            handleChange({ name: 'sort_order', value: sortOrder === 'desc' ? 'asc' : 'desc' });
          }}>
            {sortOrder === 'desc' ? <ArrowDownNarrowWideIcon size={20} /> : <ArrowUpNarrowWideIcon size={20} />}
          </Button>
          <Select defaultValue={sortBy} onValueChange={(e) => handleChange({ name: 'sort_by', value: e })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_BY.map((sort) => (
                <SelectItem key={sort} value={sort}>{upperFirst(common(`messages.${sort}`))}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* PLAYLISTS */}
      {(isLoading || playlists === undefined) ? (
        <Icons.loader />
      ) : playlists?.pages[0]?.length ? (
        <div className="w-full grid gap-2 grid-cols-2 @xs/movie-playlists:grid-cols-3 @md/movie-playlists:grid-cols-4 @lg/movie-playlists:grid-cols-5 @2xl/movie-playlists:grid-cols-6 @4xl/movie-playlists:grid-cols-7 @5xl/movie-playlists:grid-cols-8 @7xl/movie-playlists:grid-cols-10">
          {playlists?.pages.map((page, i) => (
            page?.map((playlist, index) => (
              <CardPlaylist
              key={index}
              playlist={playlist}
              {...(i === playlists.pages.length - 1 &&
                index === page.length - 1
                  ? { ref: ref }
                  : {})}
              />
            ))
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center font-semibold">{upperFirst(common('messages.no_playlists'))}</p>
      )}
      {isFetchingNextPage ? <Icons.loader /> : null}
    </div>
  );
}
