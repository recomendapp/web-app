'use client';

import { useEffect, useState } from 'react';

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
            movie:movies(
              *,
              genres:tmdb_movie_genre(
                id,
                genre:tmdb_genre(
                  *,
                  data:tmdb_genre_translation(*)
                )
              ),
              directors:tmdb_movie_credits(
                id,
                person:tmdb_person(*)
              )
            )
          ),
          guests:playlist_guest(
            *,
            user:user(*)
          )
        `)
        .eq('id', params.playlist)
        .eq('playlist_item.movie.language', params.lang)
        .eq('playlist_item.movie.genres.genre.data.language', params.lang)
        .eq('playlist_item.movie.directors.job', 'Director')
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

  const applyLocalChanges = async (payload: RealtimePostgresChangesPayload<{
    [key: string]: any;
  }>) => {
    console.log('payload', payload);
    console.log('playlistItems', playlist?.items);
    switch (payload.eventType) {
      /*
      * INSERT:
      *  - Check if the new item rank is n + 1 from the last item rank => if not, return false
      *  - If everything is ok, ask supabase for the new item and add it to the playlist.items
      */
      case 'INSERT':
        if (payload.new.rank !== playlist?.items.length + 1) return false;
        const { error, data } = await supabase
          .from('playlist_item')
          .select(`
            *,
            movie:movies(
              *,
              genres:tmdb_movie_genre(
                id,
                genre:tmdb_genre(
                  *,
                  data:tmdb_genre_translation(*)
                )
              ),
              directors:tmdb_movie_credits(
                id,
                person:tmdb_person(*)
              )
            )
          `)
          .eq('id', payload.new.id)
          .single();
        if (error || !data) return false;
        queryClient.setQueryData(['playlist', Number(params.playlist)], (oldData: Playlist) => {
          if (!oldData) return null;
          return {
            ...oldData,
            items: [...oldData.items, data],
          };
        });
        break;
      
      /*
      * UPDATE:
      *  - Check if the item exists in the playlist.items => if not, return false
      *  - If everything is ok, update the item from payload.new and re-order the playlist.items
      */
      case 'UPDATE':
        if (!playlist?.items?.some((item: PlaylistItem) => item?.id === payload.new.id)) return false;
        queryClient.setQueryData(['playlist', Number(params.playlist)], (oldData: Playlist) => {
          if (!oldData) return null;
          const updatedItems = oldData.items.map((item: PlaylistItem) => {
            if (item?.id === payload.new.id) {
              return {
                ...item,
                ...payload.new,
              };
            }
            return item;
          });
          updatedItems.sort((a: PlaylistItem, b: PlaylistItem) => a!.rank - b!.rank);
          return {
            ...oldData,
            items: updatedItems,
          };
        });
        break;
      /*
      * DELETE:
      *  - Check if the item exists in the playlist.items => if not, return false
      */
      case 'DELETE':
        if (!playlist?.items?.some((item: PlaylistItem) => item?.id === payload.old.id)) return false;
        queryClient.setQueryData(['playlist', Number(params.playlist)], (oldData: Playlist) => {
          if (!oldData) return null;
          return {
            ...oldData,
            items: oldData.items.filter((item: PlaylistItem) => item?.id !== payload.old.id),
          };
        });
        break;
      default:
        break
    }
    return true;
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
            const success = await applyLocalChanges(payload);
            if (!success)
              setShouldRefresh(true);
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
      refetch(); // Exécuter le rafraîchissement après le délai de débordement
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
