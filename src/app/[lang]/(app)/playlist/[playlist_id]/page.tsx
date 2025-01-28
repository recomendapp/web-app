'use client';
import { useEffect, useRef, useState, use } from 'react';
import { useAuth } from '@/context/auth-context';
import { PlaylistItem } from '@/types/type.db';
import useDebounce from '@/hooks/use-debounce';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
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
  const params = use(props.params);
  const supabase = useSupabaseClient();
  const { user } = useAuth();
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const debouncedRefresh = useDebounce(shouldRefresh, 200);
  const { data: playlist, refetch } = usePlaylistFull(Number(params.playlist_id));
  const { data: isAllowedToEdit } = usePlaylistIsAllowedToEdit(playlist?.id);
  const { data: playlistItems } = usePlaylistItems(playlist?.id);
  const [playlistItemsRender, setPlaylistItemsRender] = useState<PlaylistItem[]>(playlistItems || []);
  const { mutate: updatePlaylistItemChanges } = useUpdatePlaylistItemChanges({
    playlistId: Number(params.playlist_id),
  });

  const eventBuffer = useRef<RealtimePostgresChangesPayload<{
    [key: string]: any;
  }>[] | null>(null);
  const eventBufferTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleEventBuffering = (payload: RealtimePostgresChangesPayload<{
    [key: string]: any;
  }>) => {
    if (!eventBuffer.current) {
      eventBuffer.current = [];
    }
    eventBuffer.current.push(payload);

    if (eventBufferTimeout.current) {
      clearTimeout(eventBufferTimeout.current);
    }

    eventBufferTimeout.current = setTimeout(() => {
      updatePlaylistItemChanges({
        events: eventBuffer.current,
      });
      eventBuffer.current = null;
    }, 10);
  };

  useEffect(() => {
    if (isAllowedToEdit) {
      const playlistItemsChanges = supabase
        .channel(`movie_playlist:${params.playlist_id}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'playlist_items',
            filter: `playlist_id=eq.${params.playlist_id }`,
          },
          async (payload) => {
            handleEventBuffering(payload);
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(playlistItemsChanges);
      };
    }
  }, [params.playlist_id, playlist, user, refetch, isAllowedToEdit]);

  useEffect(() => {
    if (debouncedRefresh) {
      refetch();
      setShouldRefresh(false);
    }
  }, [debouncedRefresh, refetch]);

  useEffect(() => {
    if (playlistItems) {
      setPlaylistItemsRender(playlistItems);
    }
  }, [playlistItems]);

  if (!playlist) return null;

  return (
    <>
      <PlaylistHeader playlist={playlist} totalRuntime={playlistItems?.reduce((total: number, item: PlaylistItem) => total + (item?.media?.runtime ?? 0), 0)} />
      <div className="p-4">
        {playlistItemsRender ? <PlaylistTable playlist={playlist} playlistItems={playlistItemsRender} setPlaylistItems={setPlaylistItemsRender} /> : null}
      </div>
    </>
  );
}
