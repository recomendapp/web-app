'use client'

import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loader from "@/components/Loader";
import { useUserFeedCastCrewInfiniteQuery } from "@/features/client/user/userQueries";
import { FeedCastCrewItem } from "./_components/FeedCastCrewItem";
import { upperFirst } from "lodash";
import { useTranslations } from "next-intl";

export default function FeedPersons() {
  const { session } = useAuth();
  const common = useTranslations('common');

  const { ref, inView } = useInView();

  const {
    data: feed,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useUserFeedCastCrewInfiniteQuery({
    userId: session?.user.id,
  });

  useEffect(() => {
    if (inView && hasNextPage)
      fetchNextPage();
   }, [inView, hasNextPage, feed, fetchNextPage]);

  return (
    <div className="w-full max-w-2xl">
      {isLoading || feed == undefined ? (
        <div className="flex items-center h-full">
          <Loader />
        </div>
      ) : !isLoading && feed?.pages[0]?.length ? (
        <div className="flex flex-col gap-4">
          {feed.pages.map((page, i) => (
            page?.map((activity, index) => (
              <FeedCastCrewItem
              key={index}
              ref={(i === feed.pages.length - 1) && (index === page.length - 1) ? ref : undefined }
              activity={activity}
              />
            ))
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
        {upperFirst(common('messages.is_empty'))}
        </div>
      )}
    </div>
  );
}
