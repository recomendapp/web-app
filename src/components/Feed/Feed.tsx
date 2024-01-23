'use client';

import { useAuth } from '@/context/auth-context';
import { supabase } from '@/lib/supabase/client';
import { useInView } from 'react-intersection-observer';
import { useQuery, useQueryClient } from 'react-query';
import { FilmAction } from '@/types/type.film';
import { useEffect } from 'react';
import { Skeleton } from '../ui/skeleton';
import { User } from 'lucide-react';
import UserCard from '../User/UserCard/UserCard';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import MovieReviewOverview from '../Review/MovieReviewOverview';
import Rating from '../Review/ActivityIcon';

// GRAPHQL
import { useQuery as useQueryApollo } from '@apollo/client';
import GET_FEED from '@/graphql/Feed/queries/GetFeed';
import {
  GetFeedQuery,
  UserMovieActivityFragment,
} from '@/graphql/__generated__/graphql';

export default function Feed() {
  const { user } = useAuth();

  const locale = useLocale();

  const { ref, inView } = useInView();

  const { data: following, isLoading: followingLoading } = useQuery({
    queryKey: ['user', user?.id, 'following'],
    queryFn: async () => {
      const { data } = await supabase
        .from('user_follower')
        .select('followee_id')
        .eq('user_id', user!.id);
      const followeeIds = data?.map((item) => item.followee_id) || [];
      followeeIds.push(user!.id);
      return followeeIds;
    },
    enabled: !!user,
  });

  const numberOfResult = 1;

  const {
    data: feedQuery,
    loading,
    error,
    fetchMore,
    networkStatus,
  } = useQueryApollo<GetFeedQuery>(GET_FEED, {
    variables: {
      filter: {
        user_id: { in: following },
      },
      orderBy: [{ updated_at: 'DescNullsFirst' }],
      first: numberOfResult,
      locale: locale,
    },
    skip: !following || !user || !locale,
  });
  const feed = feedQuery?.user_movie_activityCollection?.edges;
  const pageInfo = feedQuery?.user_movie_activityCollection?.pageInfo;

  useEffect(() => {
    if (inView && pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          first: numberOfResult,
          after: pageInfo?.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;
          return {
            ...previousResult,
            user_movie_activityCollection: {
              ...previousResult.user_movie_activityCollection!,
              edges: [
                ...previousResult.user_movie_activityCollection!.edges,
                ...fetchMoreResult.user_movie_activityCollection!.edges,
              ],
              pageInfo: fetchMoreResult.user_movie_activityCollection!.pageInfo,
            },
          };
        },
      });
    }
  }, [fetchMore, inView, pageInfo]);

  return (
    <div className="w-full max-w-xl">
      {loading || feed == undefined ? (
        <div className="flex flex-col gap-4 overflow-hidden">
          {Array.from({ length: 20 }).map((_, index) => (
            <FeedItem key={index} />
          ))}
        </div>
      ) : !loading && feed?.length ? (
        <div className="flex flex-col gap-4">
          {feed.map(({ node }, index: number) => (
            <div
              key={node.id}
              ref={index === feed.length - 1 ? ref : undefined}
            >
              <FeedItem activity={node} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          C&apos;est un peu vide ici
        </div>
      )}
    </div>
  );
}

const FeedItem = ({ activity }: { activity?: UserMovieActivityFragment }) => {
  if (!activity) {
    return (
      <Skeleton className="flex bg-secondary h-full rounded-xl p-2 gap-2">
        <Skeleton className="bg-background h-[25px] w-[25px] rounded-full" />
        <Skeleton className="bg-background h-5 w-20" />
        <Skeleton className="bg-background h-5 w-20 rounded-full" />
      </Skeleton>
    );
  }
  return (
    <Link
      href={`/@${activity.user.username}/film/${activity.movie_id}`}
      className="flex items-start gap-2 bg-muted rounded-xl p-2"
    >
      <UserCard user={activity.user} icon />
      <Activity activity={activity} />
    </Link>
  );
};

export function Activity({
  activity,
}: {
  activity: UserMovieActivityFragment;
}) {
  const t = useTranslations('feed');

  return (
    <div className="w-full flex flex-col gap-2">
      {activity.review ? (
        <>
          <span>
            {t.rich('user_movie_activity.reviewed', {
              name: () => (
                <Link href={`/@${activity.user.username}`}>
                  {activity.user.username}
                </Link>
              ),
              movie: () => (
                <Link href={`/film/${activity.movie_id}`}>
                  {activity.movie.data?.edges[0].node.title}
                </Link>
              ),
            })}
          </span>
          <MovieReviewOverview
            className="bg-background"
            activity={activity}
            review={activity.review}
          />
        </>
      ) : (
        <>
          {activity.is_liked && activity.rating ? (
            <span>
              {t.rich('user_movie_activity.rated_liked', {
                name: () => (
                  <Link href={`/@${activity.user.username}`}>
                    {activity.user.username}
                  </Link>
                ),
                movie: () => (
                  <Link href={`/film/${activity.movie_id}`}>
                    {activity.movie.data?.edges[0].node.title}
                  </Link>
                ),
                rating: () => <Rating rating={activity.rating} />,
              })}
            </span>
          ) : activity.is_liked && !activity.rating ? (
            <span>
              {t.rich('user_movie_activity.liked', {
                name: () => (
                  <Link href={`/@${activity.user.username}`}>
                    {activity.user.username}
                  </Link>
                ),
                movie: () => (
                  <Link href={`/film/${activity.movie_id}`}>
                    {activity.movie.data?.edges[0].node.title}
                  </Link>
                ),
              })}
            </span>
          ) : !activity.is_liked && activity.rating ? (
            <span>
              {t.rich('user_movie_activity.rated', {
                name: () => (
                  <Link href={`/@${activity.user.username}`}>
                    {activity.user.username}
                  </Link>
                ),
                movie: () => (
                  <Link href={`/film/${activity.movie_id}`}>
                    {activity.movie.data?.edges[0].node.title}
                  </Link>
                ),
                rating: () => `${activity.rating}/10`,
              })}
            </span>
          ) : (
            <span>
              {t.rich('user_movie_activity.watched', {
                name: () => (
                  <Link href={`/@${activity.user.username}`}>
                    {activity.user.username}
                  </Link>
                ),
                movie: () => (
                  <Link href={`/film/${activity.movie_id}`}>
                    {activity.movie.data?.edges[0].node.title}
                  </Link>
                ),
              })}
            </span>
          )}
        </>
      )}
    </div>
  );
}
