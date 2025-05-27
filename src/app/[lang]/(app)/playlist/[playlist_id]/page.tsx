'use client';

import * as React from 'react';
import { useAuth } from '@/context/auth-context';
import { PlaylistItem } from '@/types/type.db';
import useDebounce from '@/hooks/use-debounce';
import { RealtimeChannel } from '@supabase/supabase-js';
import { useSupabaseClient } from '@/context/supabase-context';
import { usePlaylistFull, usePlaylistIsAllowedToEdit, usePlaylistItems } from '@/features/client/playlist/playlistQueries';
import { useUpdatePlaylistItemChanges } from '@/features/client/playlist/playlistMutations';
import PlaylistHeader from './_components/PlaylistHeader';
import PlaylistTable from './_components/table/PlaylistTable';

export default function PlaylistPage(
  props: {
    params: Promise<{lang: string, playlist_id: number }>;
  }
) {
  const params = React.use(props.params);
  const supabase = useSupabaseClient();
  const { user } = useAuth();
  const [shouldRefresh, setShouldRefresh] = React.useState(false);
  const debouncedRefresh = useDebounce(shouldRefresh, 200);
  const { data: playlist, refetch } = usePlaylistFull(Number(params.playlist_id));
  const { data: isAllowedToEdit } = usePlaylistIsAllowedToEdit(playlist?.id);
  const { data: playlistItems } = usePlaylistItems(playlist?.id);
  const [playlistItemsRender, setPlaylistItemsRender] = React.useState<PlaylistItem[]>(playlistItems || []);
  const { mutate: updatePlaylistItemChanges } = useUpdatePlaylistItemChanges({
    playlistId: Number(params.playlist_id),
  });

  React.useEffect(() => {
    if (isAllowedToEdit) {
      let playlistItemsChanges: RealtimeChannel;
      const setupRealtime = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session)  return;
        await supabase.realtime.setAuth(session.access_token);
        playlistItemsChanges = supabase
          .channel(`playlist:${params.playlist_id}`, {
            config: { private: true },
          })
          .on('broadcast', { event: '*' }, ({ event, payload } : { event: string, payload: { old: PlaylistItem, new: PlaylistItem } }) => {
            updatePlaylistItemChanges({
              event,
              payload,
            });
          })
          .subscribe();
        return playlistItemsChanges;
      }
      setupRealtime().catch(console.error);

      return () => {
        if (playlistItemsChanges) {
          supabase.removeChannel(playlistItemsChanges);
        }
      };
    }
  }, [params.playlist_id, playlist, user, refetch, isAllowedToEdit, supabase]);


  React.useEffect(() => {
    if (debouncedRefresh) {
      refetch();
      setShouldRefresh(false);
    }
  }, [debouncedRefresh, refetch]);

  React.useEffect(() => {
    if (playlistItems) {
      setPlaylistItemsRender(playlistItems);
    }
  }, [playlistItems]);

  if (!playlist) return null;

  return (
    <>
      <PlaylistHeader playlist={playlist} playlistItems={playlistItemsRender} />
      <div className="p-4">
        {playlistItemsRender ? <PlaylistTable playlist={playlist} playlistItems={playlistItemsRender} setPlaylistItems={setPlaylistItemsRender} /> : null}
      </div>
    </>
  );
}
