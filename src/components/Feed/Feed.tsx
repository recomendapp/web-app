'use client';

import { useAuth } from '@/context/auth-context';
import { supabase } from '@/lib/supabase/client';
import { useInView } from 'react-intersection-observer';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { Skeleton } from '../ui/skeleton';
import UserCard from '../User/UserCard/UserCard';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import MovieReviewOverview from '../Review/MovieReviewOverview';
import Rating from '../Review/ActivityIcon';

// COMPONENTS
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

// GRAPHQL
import { useQuery as useQueryApollo } from '@apollo/client';
import GET_FEED from '@/graphql/Feed/queries/GetFeed';
import {
  GetFeedQuery,
  TmdbMovieMinimalFragment,
  UserMovieActivityFragment,
} from '@/graphql/__generated__/graphql';
import MoviePoster from '../Movie/MoviePoster';

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
    <div
      className="flex items-start gap-2 bg-muted rounded-xl p-2"
    >
      <UserCard user={activity.user} icon />
      <Activity activity={activity} />
    </div>
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
                <MovieHoverCard movie={activity.movie} />
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
                  <MovieHoverCard movie={activity.movie} />
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
                  <MovieHoverCard movie={activity.movie} />
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
                  <MovieHoverCard movie={activity.movie} />
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
                  <MovieHoverCard movie={activity.movie} />
                ),
              })}
            </span>
          )}
        </>
      )}
    </div>
  );
}

const MovieHoverCard = ({ movie }: { movie: TmdbMovieMinimalFragment }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={`/film/${movie.id}`} className='hover:text-accent-pink transition'>
          {movie.data?.edges[0].node.title}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent align='center' className="w-52">
        <div className="flex justify-between space-x-4">
          <MoviePoster
            poster_path={`https://image.tmdb.org/t/p/w500/${movie.data?.edges[0].node.poster_path}`}
            alt={movie.data?.edges[0].node.title ?? ''} />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
