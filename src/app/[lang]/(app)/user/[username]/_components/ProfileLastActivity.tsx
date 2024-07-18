'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import MovieCard from '@/components/Movie/Card/MovieCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocale } from 'next-intl';

// QUERY
import { useInfiniteQuery } from '@tanstack/react-query';
import { User, UserMovieActivity } from '@/types/type.db';

export default function ProfileLastActivity({ profile }: { profile: User }) {
  
  const locale = useLocale();

  const { ref, inView } = useInView();

  const numberOfResult = 10;

  const {
    data: activities,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['user', profile?.id, 'activity', { order: 'updated_at-desc'}],
    queryFn: async ({ pageParam = 1 }) => {
      if (!profile?.id || !locale) throw Error('Missing profile id or locale');
      let from = (pageParam - 1) * numberOfResult;
      let to = from - 1 + numberOfResult;

      const { data, error } = await supabase
        .from('user_movie_activity')
        .select(`
          *,
          user(*),
          review:user_movie_review(*),
          movie:movies(*)
        `)
        .eq('user_id', profile.id)
        .eq('movie.language', locale)
        .range(from, to)
        .order('updated_at', { ascending: false})
        .returns<UserMovieActivity[]>();
      if (error) throw error;
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.length == numberOfResult ? pages.length + 1 : undefined;
    },
    enabled: !!profile?.id && !!locale,
  });

  useEffect(() => {
    if (inView && hasNextPage)
      fetchNextPage();
   }, [inView, hasNextPage, activities, fetchNextPage]);

  if (!activities?.pages[0].length) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-4 items-center">
        <Link href={`/@${profile?.username}/films`}>
          <h3 className="font-semibold text-xl">
            Dernières activités
          </h3>
        </Link>
        <Button variant={'link'} asChild>
          <Link href={`/@${profile?.username}/films`}>Tout afficher</Link>
        </Button>
      </div>
      <ScrollArea className="rounded-md">
        <div className="flex space-x-4 pb-4">
          {activities?.pages.map((page, i) => (
              page?.map((activity, index) => (
                <div
                  key={activity?.id}
                  className="w-24 lg:w-32 pb-2"
                  ref={(i === activities.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
                >
                  <MovieCard
                    movie={activity?.movie}
                    displayMode={'grid'}
                    movieActivity={activity}
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
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
