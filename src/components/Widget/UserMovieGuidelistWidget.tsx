import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext/auth-context';

// GRAPHQL
import { useQuery } from '@apollo/client';
import GET_USER_MOVIE_GUIDELIST_BY_USER_ID from '@/graphql/User/Movie/Guidelist/queries/GetUserMovieGuidelistByUserId';

// TYPES
import { Guidelist } from '@/types/type.guidelist';

// UI
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import MovieCard from '@/components/Movie/Card/MovieCard';
import { GetUserMovieGuidelistByUserIdQuery } from '@/graphql/__generated__/graphql';
import { useLocale } from 'next-intl';

export const UserMovieGuidelistWidget = () => {
  const { user } = useAuth();

  const locale = useLocale();

  const {
    data: guidelistQuery,
    loading,
    error,
  } = useQuery<GetUserMovieGuidelistByUserIdQuery>(GET_USER_MOVIE_GUIDELIST_BY_USER_ID, {
    variables: {
      user_id: user?.id,
      locale: locale,
    },
    skip: !user,
  });
  const guidelist = guidelistQuery?.user_movie_guidelistCollection?.edges;

  if (guidelist === undefined || loading) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-4 items-center">
          <Skeleton className=" w-52 h-6" />
          <Skeleton className=" w-24 h-6" />
        </div>
        <div className="flex space-x-4 pb-4 overflow-hidden">
          {Array.from({ length: 10 }).map((__, i) => (
            <Skeleton key={i} className="w-36 aspect-[2/3] shrink-0 pb-2" />
          ))}
        </div>
      </div>
    );
  }

  if (guidelist && !guidelist.length) return null;

  return (
    <div className=" flex flex-col gap-2">
      <div className="flex justify-between gap-4 items-center">
        <Link href={'/collection/guidelist'}>
          <h3 className="font-semibold text-xl">Reco par vos amis</h3>
        </Link>
        <Button variant={'link'} asChild>
          <Link href={'/collection/guidelist'}>Tout afficher</Link>
        </Button>
      </div>
      <ScrollArea className="rounded-md">
        <div className="flex space-x-4 pb-2">
          {guidelist?.map(({ node }) => (
            <div key={node.id} className="w-36">
              <MovieCard movie={node.movie} displayMode="grid" />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
