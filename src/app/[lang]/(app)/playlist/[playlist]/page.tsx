'use client';

import { useEffect, useState } from 'react';

// COMPONENTS
import PlaylistTable from '@/app/[lang]/(app)/playlist/[playlist]/components/table/PlaylistTable';
import PlaylistHeader from '@/app/[lang]/(app)/playlist/[playlist]/components/PlaylistHeader';
import { useAuth } from '@/context/auth-context';
import { supabase } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Playlist, PlaylistGuest, PlaylistItem } from '@/types/type.db';

export default function PlaylistPage({
  params,
}: {
  params: {lang: string, playlist: number };
}) {
  const { user } = useAuth();
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
            movie:tmdb_movie(
              *,
              data:tmdb_movie_translation(*),
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
        .eq('playlist_item.movie.data.language_id', params.lang)
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
            console.log('playlist_items changes');
            refetch();
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(playlistItemsChanges);
      };
    }
  }, [params.playlist, playlist, user, refetch, isAllowedToEdit]);

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
