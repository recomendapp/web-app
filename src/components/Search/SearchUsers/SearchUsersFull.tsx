'use client';
import { useEffect, useState } from 'react';
import { Skeleton } from '../../ui/skeleton';
import { useInView } from 'react-intersection-observer';
import { Playlist } from '@/types/type.playlist';
import { useQuery } from '@apollo/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MoviePlaylistCard from '@/components/Playlist/FilmPlaylist/MoviePlaylistCard';
import { User } from '@/types/type.user';

import SEARCH_USERS_QUERY from '@/components/Search/SearchUsers/queries/searchUsersQuery'
import UserCard from '@/components/User/UserCard/UserCard';

export default function SearchUsersFull({
  query,
}: {
  query: string | undefined;
}) {
  const [ order, setOrder ] = useState("popular");

    const { ref, inView } = useInView();

    const numberOfResult = 2;

    const { data: searchUsersQuery, loading, error, fetchMore, networkStatus } = useQuery(SEARCH_USERS_QUERY, {
        variables: {
            search: query,
            first: numberOfResult,
        },
        skip: !query
    })
    const users: [ { user: User }] = searchUsersQuery?.userCollection?.edges;
    const pageInfo: { hasNextPage: boolean, endCursor: string,} = searchUsersQuery?.userCollection?.pageInfo;

    useEffect(() => {
        if (inView && pageInfo?.hasNextPage) {
            fetchMore({
                variables: {
                    search: query,
                    first: numberOfResult,
                    after: pageInfo?.endCursor
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    return {
                      userCollection: {
                        edges: [
                            ...previousResult.userCollection.edges,
                            ...fetchMoreResult.userCollection.edges,
                        ],
                        pageInfo: fetchMoreResult.userCollection.pageInfo
                      }
                    };
                  }
            });
        }
    }, [inView, pageInfo])


  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8 gap-4 max-h-screen overflow-hidden">
        {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton
              key={index}
              className="flex flex-col items-center bg-secondary h-full rounded-xl p-2 gap-2"
            >
              {/* AVATAR */}
              <Skeleton className="bg-background h-[150px] w-[150px] rounded-full" />
              {/* NAME */}
              <Skeleton className="bg-background h-5 w-20" />
              <Skeleton className="bg-background h-5 w-20 rounded-full" />
            </Skeleton>
          ))
        }
      </div>
    );
  }

  if (!loading && !users?.length) {
    return (
      <div>
        Aucun résultat.
      </div>
    )
  }

  return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8 gap-4 overflow-x-auto overflow-y-hidden">
        {users.map(({ user } : { user: User}, index) => (
            <div key={user.id} ref={index === users.length - 1 ? ref : undefined}>
              <UserCard user={user} full />
            </div>
          ))
        }
      </div>
  );
}
