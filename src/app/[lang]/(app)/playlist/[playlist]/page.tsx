'use client';

import { useEffect, useState } from 'react';

// COMPONENTS
import PlaylistTable from '@/components/Playlist/FilmPlaylist/PlaylistTable/PlaylistTable';
import PlaylistHeader from '@/app/[lang]/(app)/playlist/[playlist]/components/PlaylistHeader';
import { useAuth } from '@/context/AuthContext/auth-context';
import { supabase } from '@/lib/supabase/client';

// GRAPHQL
import { useQuery } from '@apollo/client';
import GET_PLAYLIST_BY_ID from '@/graphql/Playlist/Playlist/queries/GetPlaylistById';
import { GetPlaylistByIdQuery } from '@/graphql/__generated__/graphql';

export default function PlaylistPage({
  params,
}: {
  params: {lang: string, playlist: string };
}) {
  const { user } = useAuth();

  const { data: playlistQuery, refetch } = useQuery<GetPlaylistByIdQuery>(GET_PLAYLIST_BY_ID, {
    variables: {
      id: params.playlist,
      locale: params.lang
    },
    skip: !params.playlist || !params.lang,
  });
  const playlist = playlistQuery?.playlistCollection?.edges[0]?.node;

  const [playlist_item, setPlaylist_item] = useState(playlist?.playlist_item?.edges);

  const isAllowedToEdit = Boolean(
    user?.id &&
    playlist &&
    (
      user?.id === playlist?.user_id ||
      (
        playlist?.guests?.edges.some(
          ({ node }) => node.user_id === user?.id && node.edit
        ) &&
        playlist?.user?.subscriptions?.edges.length! > 0
      )
    )
  );

  useEffect(() => {
    if (isAllowedToEdit) {
      const playlistItemsChanges = supabase
        .channel(`movie_playlist:${params.playlist}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'playlist_item',
            filter: `playlist_id=eq.${params.playlist }`,
          },
          () => {
            console.log('refetch');
            refetch();
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(playlistItemsChanges);
      };
    }
  }, [params.playlist, playlist, refetch, user, isAllowedToEdit]);

  useEffect(() => {
    if (playlist?.playlist_item?.edges) {
      setPlaylist_item(playlist?.playlist_item?.edges);
    }
  }, [playlist?.playlist_item]);

  if (!playlist) return null;

  return (
    <main>
      <PlaylistHeader playlist={playlist} />
      <div className="p-4">
        {playlist && playlist_item && <PlaylistTable playlist={playlist} playlist_item={playlist_item} setPlaylist_item={setPlaylist_item as any} isAllowedToEdit={isAllowedToEdit}/>}
      </div>
    </main>
  );
}
