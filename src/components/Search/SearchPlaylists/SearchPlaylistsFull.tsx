'use client';
import { useEffect, useState } from 'react';
import { Skeleton } from '../../ui/skeleton';
import { useInView } from 'react-intersection-observer';
import { Playlist } from '@/types/type.playlist';
import { useQuery } from '@apollo/client';
import SEARCH_PLAYLIST_QUERY from './queries/searchPlaylistsQuery';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MoviePlaylistCard from '@/components/Playlist/MoviePlaylist/MoviePlaylistCard';

export default function SearchPlaylistsFull({
  query,
}: {
  query: string | undefined;
}) {
  const [ order, setOrder ] = useState("popular");

    const { ref, inView } = useInView();

    const numberOfResult = 2;

    const { data: userPlaylistsQuery, loading, error, fetchMore, networkStatus } = useQuery(SEARCH_PLAYLIST_QUERY, {
        variables: {
            search: query,
            order: order == 'recent' ? 
                {"updated_at": "DescNullsFirst"}
              :
                {
                  "updated_at": "DescNullsFirst",
                  "likes_count": "DescNullsFirst"
                },
            first: numberOfResult,
        },
        skip: !query
    })
    const playlists: [ { playlist: Playlist }] = userPlaylistsQuery?.playlistCollection?.edges;
    const pageInfo: { hasNextPage: boolean, endCursor: string,} = userPlaylistsQuery?.playlistCollection?.pageInfo;

    useEffect(() => {
        if (inView && pageInfo?.hasNextPage) {
            fetchMore({
                variables: {
                    search: query,
                    order: order == 'recent' ? 
                        {"updated_at": "DescNullsFirst"}
                      :
                        {
                          "updated_at": "DescNullsLast",
                          "likes_count": "DescNullsFirst"
                        },
                    first: numberOfResult,
                    after: pageInfo?.endCursor
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    return {
                      playlistCollection: {
                        edges: [
                            ...previousResult.playlistCollection.edges,
                            ...fetchMoreResult.playlistCollection.edges,
                        ],
                        pageInfo: fetchMoreResult.playlistCollection.pageInfo
                      }
                    };
                  }
            });
        }
    }, [inView, pageInfo])


  // if (loading) {
  //   return (
  //     <div className=" w-full flex flex-col gap-2">
  //       {/* USERS TITLE */}
  //       <div className="flex justify-between items-end">
  //         <Skeleton className="h-8 w-32" />
  //         <Skeleton className="h-8 w-32" />
  //       </div>
  //       {/* USERS CONTAINER */}
  //       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto overflow-y-hidden flex-wrap">
  //         {Array.from({ length: 10 }).map((_, index) => (
  //           <Skeleton
  //             key={index}
  //             className="flex flex-col items-center bg-secondary h-full rounded-xl p-2 gap-2"
  //           >
  //             {/* AVATAR */}
  //             <Skeleton className="bg-background h-[150px] w-[150px] rounded-xl" />
  //             {/* NAME */}
  //             <Skeleton className="bg-background h-5 w-20" />
  //             <Skeleton className="bg-background h-5 w-20 rounded-full" />
  //           </Skeleton>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

  if (!loading && !playlists?.length) {
    return (
      <div>
        Aucun résultat.
      </div>
    )
  }

  return (
    <div className=" w-full flex flex-col gap-2">
      {/* USERS TITLE */}
      {/* <div className="flex justify-end items-end">
        <Select onValueChange={setOrder} defaultValue={order}>
            <SelectTrigger className="w-fit">
                <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
                <SelectItem value={"recent"}>Récents</SelectItem>
                <SelectItem value={"popular"}>Populaires</SelectItem>
            </SelectContent>
        </Select>
      </div> */}
      {/* USERS CONTAINER */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8 gap-4 overflow-x-auto overflow-y-hidden">
        {loading ? 
          Array.from({ length: 10 }).map((_, index) => (
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
        :
          playlists.map(({ playlist } : { playlist: Playlist}, index) => (
            <div key={playlist.id} ref={index === playlists.length - 1 ? ref : undefined}>
              <MoviePlaylistCard playlist={playlist} className={'w-full'} />
            </div>
          ))
        }
      </div>
    </div>
  );
}
