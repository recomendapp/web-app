'use client';
import { Skeleton } from '../../ui/skeleton';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { useQuery } from '@apollo/client';
import SEARCH_PLAYLIST_QUERY from '../../../graphql/Search/SearchPlaylists';
import MoviePlaylistCard from '@/components/Playlist/FilmPlaylist/MoviePlaylistCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { SearchPlaylistsQuery } from '@/graphql/__generated__/graphql';

export default function SearchPlaylistsSmall({
  query,
}: {
  query: string | undefined;
}) {
  const numberOfResult = 8;

  const { data: userPlaylistsQuery, loading } = useQuery<SearchPlaylistsQuery>(
    SEARCH_PLAYLIST_QUERY,
    {
      variables: {
        search: query,
        order: {
          updated_at: 'DescNullsFirst',
          likes_count: 'DescNullsFirst',
        },
        first: numberOfResult,
      },
      skip: !query,
    }
  );
  const playlists = userPlaylistsQuery?.playlistCollection?.edges;
  const pageInfo = userPlaylistsQuery?.playlistCollection?.pageInfo;

  if (loading) {
    return (
      <div className=" w-full flex flex-col gap-2">
        {/* USERS TITLE */}
        <div className="flex justify-between items-end">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-32" />
        </div>
        {/* USERS CONTAINER */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto overflow-y-hidden flex-wrap">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className="flex flex-col items-center bg-secondary h-full rounded-xl p-2 gap-2"
            >
              {/* AVATAR */}
              <Skeleton className="bg-background h-[150px] w-[150px] rounded-xl" />
              {/* NAME */}
              <Skeleton className="bg-background h-5 w-20" />
              <Skeleton className="bg-background h-5 w-20 rounded-full" />
            </Skeleton>
          ))}
        </div>
      </div>
    );
  }

  if (!loading && !playlists?.length) return null;

  return (
    <div className=" w-full flex flex-col gap-2">
      {/* USERS TITLE */}
      <div className="flex justify-between items-end">
        <div className="text-2xl font-bold">Playlists</div>
        {pageInfo?.hasNextPage && (
          <Button variant="link" className="p-0 h-full" asChild>
            <Link href={`/search/playlists?q=${query}`}>Tout afficher</Link>
          </Button>
        )}
      </div>
      {/* USERS CONTAINER */}
      <ScrollArea className="pb-4">
        <div className="flex gap-4">
          {playlists?.map(({ node }) => (
            <MoviePlaylistCard
              key={node.id}
              playlist={node}
              className={'w-48'}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
