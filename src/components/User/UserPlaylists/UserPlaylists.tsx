import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect } from 'react';
import USER_PLAYLISTS_QUERY from '@/graphql/Playlist/Playlist/queries/GetPlaylistsByUserId';
import Loader from '@/components/Loader/Loader';
import MoviePlaylistCard from '@/components/Playlist/FilmPlaylist/MoviePlaylistCard';
import { GetPlaylistsByUserIdQuery } from '@/graphql/__generated__/graphql';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Playlist } from '@/types/type.db';
import { useSupabaseClient } from '@/context/supabase-context';

export function UserPlaylists({
  grid = false,
}: {
  grid?: boolean;
}) {
  const supabase = useSupabaseClient();
  const { user } = useAuth();
	const pathname = usePathname();
	const { ref, inView } = useInView();
	const numberOfResult = 20;

  const {
    data: playlists,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['user', user?.id, 'playlists', { order: 'updated_at-desc'}],
    queryFn: async ({ pageParam = 1 }) => {
      if (!user?.id) return;
      let from = (pageParam - 1) * numberOfResult;
      let to = from - 1 + numberOfResult;

      const { data, error } = await supabase
        .from('playlist')
        .select(`*`)
        .eq('user_id', user.id)
        .range(from, to)
        .order('updated_at', { ascending: false});
      if (error) throw error;
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.length == numberOfResult ? pages.length + 1 : undefined;
    },
    enabled: !!user?.id,
  });

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
          page?.map((playlist: Playlist, index) => (
            <MoviePlaylistCard playlist={playlist} key={playlist?.id} />
          ))
        ))}
      </Fragment>
    );
  }
  return (
    <Fragment>
      {playlists?.pages.map((page, i) => (
        page?.map((playlist: Playlist, index) => (
          <Button
            key={playlist?.id}
            variant={
              pathname === `/playlist/${playlist?.id}` ? 'secondary' : 'ghost'
            }
            className={`justify-start p-2`}
            ref={(i === playlists.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
            asChild
          >
            <Link
              href={'/playlist/' + playlist?.id}
              className="h-fit w-full flex gap-4"
            >
              <div className={`w-12 shadow-2xl shrink-0`}>
                <AspectRatio ratio={1 / 1}>
                  <ImageWithFallback
                    src={playlist?.poster_url ?? ''}
                    alt={playlist?.title ?? ''}
                    fill
                    className="rounded-md object-cover"
                    type="playlist"
                  />
                </AspectRatio>
              </div>
              <div>
                <p className="line-clamp-1">{playlist?.title}</p>
                <p>{playlist?.items_count} films</p>
              </div>
            </Link>
          </Button>
        ))
      ))}
    </Fragment>
  );
}
