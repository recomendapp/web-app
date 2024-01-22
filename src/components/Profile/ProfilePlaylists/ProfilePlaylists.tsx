'use client';

import MoviePlaylistCard from '@/components/Playlist/FilmPlaylist/MoviePlaylistCard';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@apollo/client';
import { User } from '@/types/type.user';

// GRAPHQL
import { GetPlaylistsByUserIdQuery } from '@/graphql/__generated__/graphql';
import GET_PLAYLISTS_BY_USER_ID from '@/graphql/Playlist/Playlist/queries/GetPlaylistsByUserId';

interface UserPlaylistsProps {
  profile: User;
}

export default function ProfilePlaylists({ profile }: UserPlaylistsProps) {

  const [selectedOrder, setSelectedOrder] = useState('date-desc');

  const [order, setOrder] = useState<any>([{ updated_at: 'DescNullsFirst' }]);

  const { ref, inView } = useInView();

  const numberOfResult = 20;

  const {
    data: playlistsQuery,
    loading,
    error,
    fetchMore,
  } = useQuery<GetPlaylistsByUserIdQuery>(GET_PLAYLISTS_BY_USER_ID, {
    variables: {
      user_id: profile.id,
      orderBy: order,
      first: numberOfResult,
    },
    skip: !profile.id,
  });
  const playlists = playlistsQuery?.playlistCollection?.edges;
  const pageInfo = playlistsQuery?.playlistCollection?.pageInfo;

  useEffect(() => {
    if (inView && pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          user_id: profile.id,
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
  }, [fetchMore, inView, pageInfo, profile.id, order]);

  const changeOrder = (orderSelected: string) => {
    if (orderSelected === 'date-desc')
      setOrder([{ updated_at: 'DescNullsFirst' }]);
    else if (orderSelected === 'date-asc')
      setOrder([{ updated_at: 'AscNullsLast' }]);
    else if (orderSelected === 'popular-desc')
      setOrder([{ likes_count: 'DescNullsFirst' }]);
    else if (orderSelected === 'popular-asc')
      setOrder([{ likes_count: 'AscNullsLast' }]);
    setSelectedOrder(orderSelected);
  }

  if (!playlists?.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-4 items-center">
        <h3 className="font-semibold text-xl text-accent-1">Playlists</h3>
        <Select onValueChange={changeOrder} defaultValue={selectedOrder}>
          <SelectTrigger className="w-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectGroup>
              <SelectLabel>Date</SelectLabel>
              <SelectItem value={'date-desc'}>Plus récentes</SelectItem>
              <SelectItem value={'date-asc'}>Plus anciennes</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Popularité</SelectLabel>
              <SelectItem value={'popular-desc'}>Plus populaires</SelectItem>
              <SelectItem value={'popular-asc'}>Plus méconnus</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {playlists?.length ? (
        <div className="grid gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 2xl:grid-cols-8">
          {playlists?.map(({ node }, index) => (
            <div
              key={node.id}
              ref={index === playlists.length - 1 ? ref : undefined}
            >
              <MoviePlaylistCard playlist={node} className={'w-full'} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center font-semibold">Aucune playlist</p>
      )}
    </div>
  );
}
