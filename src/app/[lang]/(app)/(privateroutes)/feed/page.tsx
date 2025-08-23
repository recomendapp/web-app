'use client'

import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loader from "@/components/Loader";
import { useUserFeedInfiniteQuery } from "@/features/client/user/userQueries";
import { upperFirst } from "lodash";
import { useTranslations } from "next-intl";
import { FeedItemActivityMovie } from "./_components/FeedItemActivityMovie";
import { FeedItemActivityTvSeries } from "./_components/FeedItemActivityTvSeries";
import { FeedItemPlaylistLike } from "./_components/FeedItemPlaylistLike";
import { FeedItemReviewMovieLike } from "./_components/FeedItemReviewMovieLike";
import { FeedItemRevieTvSeriesLike } from "./_components/FeedItemRevieTvSeriesLike";

export default function Feed() {
  const { session } = useAuth();
  const common = useTranslations('common');

  const { ref, inView } = useInView();

  const {
    data: feed,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useUserFeedInfiniteQuery({
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
            page?.map((activity, index) => {
              const scrollRef = (i === feed.pages.length - 1) && (index === page.length - 1) ? ref : undefined;
              return (
                activity.activity_type === 'activity_movie' ? (
                  <FeedItemActivityMovie ref={scrollRef} key={index} author={activity.author} activity={activity.content} />
                ) : activity.activity_type === 'activity_tv_series' ? (
                  <FeedItemActivityTvSeries ref={scrollRef} key={index} author={activity.author} activity={activity.content} />
                ) : activity.activity_type === 'playlist_like' ? (
                  <FeedItemPlaylistLike ref={scrollRef} key={index} author={activity.author} playlistLike={activity.content} />
                ) : activity.activity_type === 'review_movie_like' ? (
                  <FeedItemReviewMovieLike ref={scrollRef} key={index} author={activity.author} reviewLike={activity.content} />
                ) : activity.activity_type === 'review_tv_series_like' ? (
                  <FeedItemRevieTvSeriesLike ref={scrollRef} key={index} author={activity.author} reviewLike={activity.content} />
                ) : null
              )
            })
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
