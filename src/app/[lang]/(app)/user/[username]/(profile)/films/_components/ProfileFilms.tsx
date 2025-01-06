'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import MovieCard from '@/components/Movie/Card/MovieCard';
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
import { useUserMovieActivitiesInfinite } from '@/features/user/userQueries';

export default function ProfileFilms({
  userId
} : {
  userId: string,
}) {
  const [order, setOrder] = useState<"date-desc" | "date-asc">("date-desc");

  const [displayMode, setDisplayMode] = useState<'grid' | 'row'>('grid');

  const { ref, inView } = useInView();

  const {
    data: activities,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useUserMovieActivitiesInfinite({
    userId: userId,
    filters: {
      order: order,
    }
  })

  useEffect(() => {
    if (inView && hasNextPage)
      fetchNextPage();
   }, [inView, hasNextPage, activities, fetchNextPage]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-4 items-center">
        <h3 className="font-semibold text-xl">Films</h3>
        <div className="flex gap-2">
          <Select onValueChange={(value) => setOrder(value as any)} defaultValue={order}>
            <SelectTrigger className="w-fit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                <SelectLabel>Vus</SelectLabel>
                <SelectItem value={'date-desc'}>Plus récents</SelectItem>
                <SelectItem value={'date-asc'}>Plus anciens</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Notes</SelectLabel>
                <SelectItem value={'rating-desc'}>
                  Notes décroissantes
                </SelectItem>
                <SelectItem value={'rating-asc'}>Notes croissantes</SelectItem>
              </SelectGroup>
              <SelectSeparator />
            </SelectContent>
          </Select>
          <Button
            variant={'ghost'}
            onClick={() =>
              setDisplayMode(displayMode == 'grid' ? 'row' : 'grid')
            }
          >
            {displayMode == 'grid' ? <LayoutGrid /> : <List />}
          </Button>
        </div>
      </div>
      {isLoading || activities == undefined ? (
        <div className="flex items-center h-full">
          <Loader />
        </div>
      ) : !isLoading && activities?.pages[0].length ? (
        <div
          className={` gap-2
              ${
                displayMode == 'row'
                  ? 'flex flex-col'
                  : 'grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 2xl:grid-cols-10'
              }
          `}
        >
          {activities.pages.map((page, i) => (
            page?.map((activity, index) => (
              <div
                key={activity.id}
                ref={(i === activities.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
              >
                <MovieCard
                  movie={activity.movie}
                  displayMode={displayMode}
                  movieActivity={activity as any}
                  fill
                  sizes={`
                    (max-width: 640px) 100px,
                    (max-width: 768px) 100px,
                    (max-width: 1024px) 120px,
                    (max-width: 1280px) 150px,
                    (max-width: 1536px) 150px,
                    (max-width: 1792px) 150px,
                    (max-width: 2048px) 200px,
                    (max-width: 2304px) 200px,
                    200px
                  `}
                />
              </div>
            ))
          ))}
          {isFetchingNextPage && (
            <Loader/>
          )}
        </div>
      ) : (
        <p className="text-center font-semibold">Aucun film.</p>
      )}
    </div>
  );
}
