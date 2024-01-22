'use client';
import { useEffect, useState } from 'react';
import { Skeleton } from '../../ui/skeleton';
import { useInView } from 'react-intersection-observer';
import { Playlist } from '@/types/type.playlist';
import { useQuery } from '@apollo/client';
import SEARCH_PLAYLIST_QUERY from '../../../graphql/Search/SearchPlaylists';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MoviePlaylistCard from '@/components/Playlist/FilmPlaylist/MoviePlaylistCard';
import { SearchPlaylistsQuery } from '@/graphql/__generated__/graphql';

export default function SearchPlaylistsFull({
  query,
}: {
  query: string | undefined;
}) {
  const [order, setOrder] = useState('popular');

  const { ref, inView } = useInView();

  const numberOfResult = 8;

  const {
    data: userPlaylistsQuery,
    loading,
    error,
    fetchMore,
    networkStatus,
  } = useQuery<SearchPlaylistsQuery>(SEARCH_PLAYLIST_QUERY, {
    variables: {
      search: query,
      order:
        order == 'recent'
          ? { updated_at: 'DescNullsFirst' }
          : {
              updated_at: 'DescNullsFirst',
              likes_count: 'DescNullsFirst',
            },
      first: numberOfResult,
    },
    skip: !query,
  });
  const playlists = userPlaylistsQuery?.playlistCollection?.edges;
  const pageInfo = userPlaylistsQuery?.playlistCollection?.pageInfo;

  useEffect(() => {
    if (inView && pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          search: query,
          order:
            order == 'recent'
              ? { updated_at: 'DescNullsFirst' }
              : {
                  updated_at: 'DescNullsLast',
                  likes_count: 'DescNullsFirst',
                },
          first: numberOfResult,
          after: pageInfo?.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return {
            ...previousResult,
            playlistCollection: {
              ...previousResult.playlistCollection!,
              edges: [
                ...previousResult.playlistCollection!.edges,
                ...fetchMoreResult.playlistCollection!.edges,
              ],
              pageInfo: fetchMoreResult.playlistCollection!.pageInfo,
            },
          };
        },
      });
    }
  }, [fetchMore, inView, order, pageInfo, query]);

  if (!loading && !playlists?.length) {
    return <div>Aucun résultat.</div>;
  }

  return (
    <div className=" w-full flex flex-col gap-2">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8 gap-4 overflow-x-auto overflow-y-hidden">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={index}
                className="flex flex-col items-center bg-secondary h-full w-full rounded-xl p-2 gap-2"
              >
                {/* AVATAR */}
                <Skeleton className="bg-background h-[150px] w-[150px] rounded-xl" />
                {/* NAME */}
                <Skeleton className="bg-background h-5 w-20" />
                <Skeleton className="bg-background h-5 w-20 rounded-full" />
              </Skeleton>
            ))
          : playlists?.map(({ node }, index) => (
              <div
                key={node.id}
                ref={index === playlists.length - 1 ? ref : undefined}
              >
                <MoviePlaylistCard playlist={node} className={'w-full'} />
              </div>
            ))}
      </div>
    </div>
  );
}
