'use client';
import { Skeleton } from '../../ui/skeleton';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { useQuery } from '@apollo/client';
import { Playlist } from '@/types/type.playlist';
import MoviePlaylistCard from '@/components/Playlist/MoviePlaylist/MoviePlaylistCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { User } from '@/types/type.user';

import SEARCH_USERS_QUERY from '@/components/Search/SearchUsers/queries/searchUsersQuery'
import UserCard from '@/components/User/UserCard/UserCard';


export default function SearchUsersSmall({
  query,
}: {
  query: string | undefined;
}) {

  const numberOfResult = 8;

  const { data: searchUsersQuery, loading } = useQuery(SEARCH_USERS_QUERY, {
      variables: {
          search: query,
          first: numberOfResult,
      },
      skip: !query
  })
  const users: [ { user: User }] = searchUsersQuery?.userCollection?.edges;
  const pageInfo: { hasNextPage: boolean, endCursor: string,} = searchUsersQuery?.userCollection?.pageInfo;

  if (loading) {
    return (
      <div className=" w-full flex flex-col gap-2">
        {/* USERS TITLE */}
        <div className="flex justify-between items-end">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-32" />
        </div>
        {/* USERS CONTAINER */}
        <div className=" flex h-[250px] gap-4 overflow-x-auto overflow-y-hidden flex-wrap">
          {Array.from({ length: 10 }).map((_, index) => (
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
          ))}
        </div>
      </div>
    );
  }

  if (!loading && !users?.length)
    return null;

  return (
    <div className=" w-full flex flex-col gap-2">
      {/* USERS TITLE */}
      <div className="flex justify-between items-end">
        <div className="text-2xl font-bold">Utilisateurs</div>
        {pageInfo.hasNextPage && 
          <Button variant="link" className="p-0 h-full" asChild>
            <Link href={`/search/users?q=${query}`}>
              Tout afficher
            </Link>
          </Button>
        }
      </div>
      {/* USERS CONTAINER */}
      <ScrollArea className="pb-4">
          <div className="flex gap-4">
              {users.map(({ user } : { user: User}) => (
                  <UserCard key={user.id} user={user} full />
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
