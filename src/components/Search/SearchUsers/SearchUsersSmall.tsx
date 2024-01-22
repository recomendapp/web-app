'use client';
import { Skeleton } from '../../ui/skeleton';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import { useQuery } from '@apollo/client';
import SEARCH_USERS_QUERY from '@/graphql/Search/SearchUsers';
import UserCard from '@/components/User/UserCard/UserCard';
import { SearchUsersQuery } from '@/graphql/__generated__/graphql';

export default function SearchUsersSmall({
  query,
}: {
  query: string | undefined;
}) {
  const numberOfResult = 8;

  const {
    data: searchUsersQuery,
    loading,
    fetchMore,
  } = useQuery<SearchUsersQuery>(SEARCH_USERS_QUERY, {
    variables: {
      filter: {
        username: { iregex: query },
      },
      first: numberOfResult,
    },
    skip: !query,
  });
  const users = searchUsersQuery?.userCollection?.edges;
  const pageInfo = searchUsersQuery?.userCollection?.pageInfo;

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

  if (!loading && !users?.length) return null;

  return (
    <div className=" w-full flex flex-col gap-2">
      {/* USERS TITLE */}
      <div className="flex justify-between items-end">
        <div className="text-2xl font-bold">Utilisateurs</div>
        {pageInfo?.hasNextPage && (
          <Button variant="link" className="p-0 h-full" asChild>
            <Link href={`/search/users?q=${query}`}>Tout afficher</Link>
          </Button>
        )}
      </div>
      {/* USERS CONTAINER */}
      <ScrollArea className="pb-4">
        <div className="flex gap-4">
          {users?.map(({ node }) => (
            <UserCard key={node.id} user={node} full />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
