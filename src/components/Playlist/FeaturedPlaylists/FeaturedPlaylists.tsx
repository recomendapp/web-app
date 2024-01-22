'use client';

import MoviePlaylistCard from '../FilmPlaylist/MoviePlaylistCard';
import { useInView } from 'react-intersection-observer';

// GRAPHQL
import { GetPlaylistsByUserIdQuery, GetPlaylistsQuery } from '@/graphql/__generated__/graphql';
import GET_PLAYLISTS from '@/graphql/Playlist/Playlist/queries/GetPlaylists';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';


export default function FeaturedPlaylists() {

  // const {
  //   data: featuredPlaylists,
  //   isLoading: loading,
  //   // fetchNextPage,
  //   // isFetchingNextPage,
  //   // hasNextPage,
  // } = useQuery({
  //   queryKey: ['search', 'featuredPlaylists'],
  //   queryFn: async ({ pageParam = 1 }) =>
  //     await supabase
  //       .from('playlist')
  //       .select('*')
  //       .eq('featured', 'true')
  //       .order('updated_at', { ascending: false })
  //       .limit(numberOfResult),

    // (query, user?.language, pageParam),
    // getNextPageParam: (results, pages) => {
    //     return results?.length == numberOfResult ? pages.length + 1 : undefined
    // },
  // });

  const [selectedOrder, setSelectedOrder] = useState('date-desc');

  const [order, setOrder] = useState<any>([{ updated_at: 'DescNullsFirst' }]);

  const { ref, inView } = useInView();

  const numberOfResult = 20;

  const {
    data: playlistsQuery,
    fetchMore,
  } = useQuery<GetPlaylistsQuery>(GET_PLAYLISTS, {
    variables: {
      filter: {
        featured: { eq: true },
      },
      orderBy: order,
      first: numberOfResult,
    },
  });
  const featuredPlaylists = playlistsQuery?.playlistCollection?.edges;
  const pageInfo = playlistsQuery?.playlistCollection?.pageInfo;

  useEffect(() => {
    if (inView && pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          filter: {
            featured: { eq: true },
          },
          orderBy: order,
          first: numberOfResult,
          after: pageInfo?.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return {
            ...previousResult,
            userCollection: {
              ...previousResult.playlistCollection,
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
  }, [fetchMore, inView, pageInfo, order]);


  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      {featuredPlaylists?.length! > 0 &&
        featuredPlaylists?.map(({ node }) => (
          <MoviePlaylistCard key={node.id} playlist={node} />
        ))}
    </div>
  );
}
