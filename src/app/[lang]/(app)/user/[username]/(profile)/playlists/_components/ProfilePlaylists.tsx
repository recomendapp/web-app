'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import Loader from '@/components/Loader/Loader';
import { useInView } from 'react-intersection-observer';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUserPlaylistsInfiniteQuery } from '@/features/client/user/userQueries';
import { CardMedia } from '@/components/card/CardMedia';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { Badge } from '@/components/ui/badge';
import { useSearchParams } from 'next/navigation';
import { z } from "zod";
import MoviePlaylistCard from '@/components/Playlist/FilmPlaylist/MoviePlaylistCard';

// Display
const displaySchema = z.enum(["grid", "row"]);
const getValidatedDisplay = (display: string | null): z.infer<typeof displaySchema> => {
  return displaySchema.safeParse(display).success ? display as z.infer<typeof displaySchema> : "grid";
};

// Order
const orderSchema = z.enum(["updated_at-desc", "updated_at-asc"]);
const getValidatedOrder = (order: string | null): z.infer<typeof orderSchema> => {
  return orderSchema.safeParse(order).success ? order as z.infer<typeof orderSchema> : "updated_at-desc";
};
interface UserPlaylistsProps {
  userId: string;
}

export default function ProfilePlaylists({ userId }: UserPlaylistsProps) {
  const common = useTranslations('common');
  const searchParams = useSearchParams();
  const display = getValidatedDisplay(searchParams.get('display'));
  const order = getValidatedOrder(searchParams.get('order'));
  const { ref, inView } = useInView();

  const {
    data: playlists,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useUserPlaylistsInfiniteQuery({
    userId: userId,
    filters: {
      order,
    },
  });

  console.log("playlists", playlists);

  const handleDisplayChange = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('display', display === 'grid' ? 'row' : 'grid');
    window.history.pushState(null, '', `?${params.toString()}`)
  };

  const handleOrderChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('order', value);
    window.history.pushState(null, '', `?${params.toString()}`)
  };

  useEffect(() => {
    if (inView && hasNextPage)
      fetchNextPage();
   }, [inView, hasNextPage, playlists, fetchNextPage]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end gap-4 items-center">
        <Select onValueChange={handleOrderChange} defaultValue={order}>
          <SelectTrigger className="w-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectGroup>
              <SelectLabel>Date</SelectLabel>
              <SelectItem value={'updated_at-desc'}>Plus récentes</SelectItem>
              <SelectItem value={'updated_at-asc'}>Plus anciennes</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {isLoading || playlists == undefined ? (
        <div className="flex items-center h-full">
          <Loader />
        </div>
      ) : !isLoading && playlists?.pages[0].length ? (
        <div
          className={` gap-2
              ${
                display == 'row'
                  ? 'flex flex-col'
                  : 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 2xl:grid-cols-8'
              }
          `}
        >
          {playlists.pages.map((page, i) => (
            page?.map((playlist, index) => (
              <MoviePlaylistCard
              key={playlist.id}
              ref={(i === playlists.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
              playlist={playlist}
              className={'w-full'}
              />
            ))
          ))}
          {isFetchingNextPage && (
            <Loader/>
          )}
        </div>
      ) : (
        <p className="text-center font-semibold">Aucune playlist.</p>
      )}
    </div>
  );
}
