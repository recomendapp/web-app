'use client'

import { useAuth } from "@/context/auth-context";
import FeedItem from "./_components/FeedItem";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loader from "@/components/Loader/Loader";
import { useUserFeedInfinite } from "@/features/user/userQueries";

export default function Feed() {
  const { user } = useAuth();

  const { ref, inView } = useInView();

  const {
    data: feed,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useUserFeedInfinite({
    userId: user?.id,
  });

  useEffect(() => {
    if (inView && hasNextPage)
      fetchNextPage();
   }, [inView, hasNextPage, feed, fetchNextPage]);

  return (
    <main className="flex flex-col items-center p-4">
      <div className="w-full max-w-2xl">
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
