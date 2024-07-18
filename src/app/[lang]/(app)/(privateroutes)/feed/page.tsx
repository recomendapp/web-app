'use client'

import { useAuth } from "@/context/auth-context";
import { supabase } from "@/lib/supabase/client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import FeedItem from "./_components/FeedItem";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loader from "@/components/Loader/Loader";
import { th } from "date-fns/locale";

export default function Feed() {

  const { user } = useAuth();
  
  const locale = useLocale();

  const { ref, inView } = useInView();

  const numberOfResult = 10;

  const { data: following, isLoading: followingLoading } = useQuery({
    queryKey: ['user', user?.id, 'followers'],
    queryFn: async () => {
      const { data } = await supabase
        .from('user_follower')
        .select('id,followee_id')
        .eq('user_id', user!.id);
      const followeeIds = data?.map((item) => item.followee_id) || [];
      followeeIds.push(user!.id);
      return followeeIds;
    },
    enabled: !!user?.id,
  });

  const {
    data: feed,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['user', user?.id, 'feed'],
    queryFn: async ({ pageParam = 1 }) => {
      let from = (pageParam - 1) * numberOfResult;
      let to = from - 1 + numberOfResult;

      const { data, error } = await supabase
        .from('user_movie_activity')
        .select(`
          *,
          user(*),
          review:user_movie_review(
            *,
            user(*)
          ),
          movie:movies(*)
        `)
        .in('user_id', following || [])
        .eq('movie.language', locale)
        .range(from, to)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.length == numberOfResult ? pages.length + 1 : undefined;
    },
    enabled: !!following && !!user?.id && !!locale,
  });

  useEffect(() => {
    if (inView && hasNextPage)
      fetchNextPage();
   }, [inView, hasNextPage, feed, fetchNextPage]);

  return (
    <main className="flex flex-col items-center p-4">
      <div className="w-full max-w-xl">
        {isLoading || feed == undefined ? (
          <div className="flex items-center h-full">
            <Loader />
          </div>
        ) : !isLoading && feed?.pages[0]?.length ? (
          <div className="flex flex-col gap-4">
            {feed.pages.map((page, i) => (
              page?.map((activity: any, index) => (
                <div
                  key={activity.id}
                  ref={(i === feed.pages.length - 1) && (index === page.length - 1) ? ref : undefined }
                >
                  <FeedItem activity={activity} />
                </div>
              ))
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            C&apos;est un peu vide ici
          </div>
        )}
      </div>
    </main>
  );
}
