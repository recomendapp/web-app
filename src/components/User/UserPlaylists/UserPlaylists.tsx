import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext/auth-context';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import USER_PLAYLISTS_QUERY from '@/graphql/Playlist/Playlist/queries/GetPlaylistsByUserId';
import { Playlist } from '@/types/type.playlist';
import Loader from '@/components/Loader/Loader';
import MoviePlaylistCard from '@/components/Playlist/FilmPlaylist/MoviePlaylistCard';
import { GetPlaylistsByUserIdQuery } from '@/graphql/__generated__/graphql';

export function UserPlaylists({
  sidebarExpanded,
  grid = false,
}: {
  sidebarExpanded: boolean;
  grid?: boolean;
}) {
  const pathname = usePathname();
  const { user } = useAuth();
  const {
    data: userPlaylistsQuery,
    loading,
    error,
  } = useQuery<GetPlaylistsByUserIdQuery>(USER_PLAYLISTS_QUERY, {
    variables: {
      user_id: user?.id,
      order: { updated_at: 'DescNullsFirst' },
    },
    skip: !user,
  });
  const playlists = userPlaylistsQuery?.playlistCollection?.edges;

  if (loading) return <Loader />;

  if (!user) return null;

  if (!loading && !playlists) return null;

  if (grid) {
    return (
      <Fragment>
        {playlists?.map(({ node }) => (
          <MoviePlaylistCard playlist={node} key={node.id} />
          // <Button
          //     key={playlist.title}
          //     variant={
          //     pathname === `/playlist/${playlist.id}` ? 'secondary' : 'ghost'
          //     }
          //     className={`justify-start p-2`}
          //     asChild
          // >
          //     <Link
          //         href={'/playlist/' + playlist.id}
          //         className="h-fit w-full flex flex-col gap-2"
          //     >
          //         <div className={`w-full shadow-2xl shrink-0 aspect-square relative`}>
          //                 <ImageWithFallback
          //                     src={playlist.poster_url ?? ''}
          //                     alt={playlist.title}
          //                     fill
          //                     className="rounded-md object-cover"
          //                     type="playlist"
          //                 />
          //         </div>
          //         <section className="line-clamp-1">
          //             {playlist.title}
          //         </section>
          //     </Link>
          // </Button>
        ))}
      </Fragment>
    );
  }
  return (
    <Fragment>
      {playlists?.map(({ node }) => (
        <Button
          key={node.title}
          variant={
            pathname === `/playlist/${node.id}` ? 'secondary' : 'ghost'
          }
          className={`justify-start p-2`}
          asChild
        >
          <Link
            href={'/playlist/' + node.id}
            className="h-fit w-full flex gap-4"
          >
            <div className={`w-12 shadow-2xl shrink-0`}>
              <AspectRatio ratio={1 / 1}>
                <ImageWithFallback
                  src={node.poster_url ?? ''}
                  alt={node.title}
                  fill
                  className="rounded-md object-cover"
                  type="playlist"
                />
              </AspectRatio>
            </div>
            {sidebarExpanded && (
              <div>
                <p className="line-clamp-1">{node.title}</p>
                <p>{node.items_count} films</p>
              </div>
            )}
          </Link>
        </Button>
      ))}
    </Fragment>
  );
}
