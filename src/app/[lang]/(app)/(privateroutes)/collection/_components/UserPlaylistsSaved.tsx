import { useAuth } from '@/context/auth-context';
import { Fragment, useEffect } from 'react';
import Loader from '@/components/Loader/Loader';
import { useInView } from 'react-intersection-observer';
import { Playlist } from '@/types/type.db';
import { useSupabaseClient } from '@/context/supabase-context';
import { CardPlaylist } from '@/components/Card/CardPlaylist';
import { useUserPlaylistsSavedInfiniteQuery } from '@/features/client/user/userQueries';
import { usePathname } from '@/lib/i18n/routing';

export function UserPlaylistsSaved({
  sidebarExpanded,
  grid = false,
}: {
  sidebarExpanded: boolean;
  grid?: boolean;
}) {
  const supabase = useSupabaseClient();
  const { user } = useAuth();
	const pathname = usePathname();
	const { ref, inView } = useInView();

  const {
    data: playlists,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useUserPlaylistsSavedInfiniteQuery({
    userId: user?.id,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, playlists, fetchNextPage]);

  if (isLoading) return <Loader />;

  if (!user) return null;

  if (!isLoading && !playlists?.pages[0]?.length) return null;


  if (grid) {
    return (
      <Fragment>
        {playlists?.pages.map((page, i) => (
          page?.map(({ playlist }) => (
            <CardPlaylist playlist={playlist as Playlist} key={playlist?.id} />
          ))
        ))}
      </Fragment>
    );
  }
  return (
    <Fragment>
      {playlists?.pages.map((page, i) => (
        page?.map(({ playlist }, index) => (
          <CardPlaylist
          key={i}
          ref={(i === playlists.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
          playlist={playlist}
          />
        ))
      ))}
    </Fragment>
  );
}
