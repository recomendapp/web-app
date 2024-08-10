'use client';

import { useEffect, useRef, useState } from 'react';

// COMPONENTS
import PlaylistTable from '@/app/[lang]/(app)/playlist/[playlist]/_components/table/PlaylistTable';
import PlaylistHeader from '@/app/[lang]/(app)/playlist/[playlist]/_components/PlaylistHeader';
import { useAuth } from '@/context/auth-context';
import { supabase } from '@/lib/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Playlist, PlaylistGuest, PlaylistItem } from '@/types/type.db';
import useDebounce from '@/hooks/use-debounce';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export default function PlaylistPage({
  params,
}: {
  params: {lang: string, playlist: number };
}) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const debouncedRefresh = useDebounce(shouldRefresh, 200);
  const {
    data: playlist,
    refetch,
  } = useQuery({
    queryKey: ['playlist', Number(params.playlist)],
    queryFn: async () => {
      if (!params.playlist || !params.lang) throw new Error('No playlist id or locale');
      const { data } = await supabase
        .from('playlist')
        .select(`
          *,
          user(*),
          items:playlist_item(
            *,
            movie(*)
          ),
          guests:playlist_guest(
            *,
            user:user(*)
          )
        `)
        .eq('id', params.playlist)
        .eq('playlist_item.movie.language', params.lang)
        .order('rank', { ascending: true, referencedTable: 'playlist_item' })
        .returns<Playlist[]>()
        .single();
      return data;
    },
    enabled: !!params.playlist && !!params.lang,
  });
  const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>(playlist?.items);

  const isAllowedToEdit = Boolean(
    user?.id &&
    playlist &&
    (
      user?.id === playlist?.user_id ||
      (
        playlist?.guests?.some(
          (guest: PlaylistGuest) => guest?.user_id === user?.id && guest?.edit
        ) &&
        playlist?.user?.premium
      )
    )
  );

  const eventBuffer = useRef<RealtimePostgresChangesPayload<{
    [key: string]: any;
  }>[] | null>(null);
  const eventBufferTimeout = useRef<NodeJS.Timeout | null>(null);

  const applyBufferedChanges = async () => {
    if (!eventBuffer.current) return;
    
    const bufferedEvents = [...eventBuffer.current];
    eventBuffer.current = null;

    const newPlaylistItems = [...playlist?.items];

    for (const payload of bufferedEvents) {
      switch (payload.eventType) {
        /*
        * INSERT:
        *  - Check if the new item rank is n + 1 from the last item rank => if not, return false
        *  - If everything is ok, ask supabase for the new item and add it to the playlist.items
        */
        case 'INSERT':
          if (payload.new.rank !== newPlaylistItems.length + 1) return false;
          const { error: insertError, data: insertData } = await supabase
            .from('playlist_item')
            .select(`
              *,
              movie(*)
            `)
            .eq('id', payload.new.id)
            .eq('movie.language', params.lang)
            .single();
          if (insertError || !insertData) return false;
          newPlaylistItems.push(insertData);
          break;
        /*
        * UPDATE:
        *  - Check if the item exists in the playlist.items => if not, return false
        *  - If everything is ok, update the item from payload.new and re-order the playlist.items
        */
        case 'UPDATE':
          const itemIndex = newPlaylistItems.findIndex(item => item?.id === payload.new.id);
          if (itemIndex === -1) return false;
          newPlaylistItems[itemIndex] = { ...newPlaylistItems[itemIndex], ...payload.new } as PlaylistItem;
          break;
        /*
        * DELETE:
        *  - Check if the item exists in the playlist.items => if not, return false
        */
        case 'DELETE':
          const deleteIndex = newPlaylistItems.findIndex(item => item?.id === payload.old.id);
          if (deleteIndex === -1) return false;
          newPlaylistItems.splice(deleteIndex, 1);
          break;
        default:
          break;
      }
    }

    newPlaylistItems.sort((a, b) => a!.rank - b!.rank);
    queryClient.setQueryData(['playlist', Number(params.playlist)], (oldData: Playlist) => {
      if (!oldData) return null;
      return {
        ...oldData,
        items: newPlaylistItems,
      };
    });
  };

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
      const success = applyBufferedChanges();
      if (!success) {
        eventBuffer.current = null;
        setShouldRefresh(true);
      }
    }, 250);
  };

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
          async (payload) => {
            handleEventBuffering(payload);
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(playlistItemsChanges);
      };
    }
  }, [params.playlist, playlist, user, refetch, isAllowedToEdit]);

  useEffect(() => {
    if (debouncedRefresh) {
      refetch();
      setShouldRefresh(false);
    }
  }, [debouncedRefresh, refetch]);

  useEffect(() => {
    if (playlist?.items) {
      setPlaylistItems(playlist?.items);
    }
  }, [playlist?.items]);

  if (!playlist) return null;

  return (
    <main>
      <PlaylistHeader playlist={playlist} />
      <div className="p-4">
        {playlist && playlistItems && <PlaylistTable playlist={playlist} playlistItems={playlistItems} setPlaylistItems={setPlaylistItems} isAllowedToEdit={isAllowedToEdit}/>}
      </div>
    </main>
  );
}
