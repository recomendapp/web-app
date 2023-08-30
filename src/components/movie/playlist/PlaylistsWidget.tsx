'use client';
import { useUser } from '@/context/user';
import handlePlaylists from '@/hooks/movie/playlist/handlePlaylists';
import { useQuery } from 'react-query';

export function PlaylistsWidget() {
  const { user } = useUser();

  const {
    data: playlists,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user', user?.$id, 'playlists'],
    queryFn: () => handlePlaylists(user.$id),
    enabled: user?.$id !== undefined && user?.$id !== null,
    // staleTime: 30_000
  });
  return <>salut</>;
}
