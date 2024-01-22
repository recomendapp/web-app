'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '../../ui/skeleton';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@apollo/client';
import UserCard from '@/components/User/UserCard/UserCard';

import SEARCH_USERS_QUERY from '@/graphql/Search/SearchUsers';
import { SearchUsersQuery } from '@/graphql/__generated__/graphql';

export default function SearchUsersFull({
  query,
}: {
  query: string | undefined;
}) {

  const { ref, inView } = useInView();

  const numberOfResult = 20;

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

  useEffect(() => {
    if (inView && pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          search: query,
          first: numberOfResult,
          after: pageInfo?.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return {
            ...previousResult,
            userCollection: {
              ...previousResult.userCollection!,
              edges: [
                ...previousResult.userCollection!.edges,
                ...fetchMoreResult.userCollection!.edges,
              ],
              pageInfo: fetchMoreResult.userCollection!.pageInfo,
            },
          };
        },
      });
    }
  }, [fetchMore, inView, pageInfo, query]);

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
        ))}
      </div>
    );
  }

  if (!loading && !users?.length) {
    return <div>Aucun résultat.</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8 gap-4 overflow-x-auto overflow-y-hidden">
      {users?.map(({ node }, index) => (
        <div key={node.id} ref={index === users.length - 1 ? ref : undefined}>
          <UserCard user={node} full />
        </div>
      ))}
    </div>
  );
}
