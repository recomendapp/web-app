import { ImageWithFallback } from "@/components/tools/ImageWithFallback";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import USER_PLAYLISTS_QUERY from '@/components/User/UserPlaylists/queries/userPlaylistsQuery'
import { Playlist } from "@/types/type.playlist";
import Loader from "@/components/Loader/Loader";

export function UserPlaylists({ sidebarExpanded } : { sidebarExpanded: boolean}) {
    const pathname = usePathname();
    const { user } = useAuth();
    const { data: userPlaylistsQuery, loading, error } = useQuery(USER_PLAYLISTS_QUERY, {
        variables: {
            user_id: user?.id,
            order: { "updated_at": "DescNullsFirst"}
        },
        skip: !user
    });
    const playlists = userPlaylistsQuery?.playlistCollection?.edges;

    if (loading)
        return <Loader />

    if (!user)
        return null
    
    if (!loading && !playlists)
        return null

    return (
        <Fragment>
            {playlists.map(({ playlist } : { playlist: Playlist}) => (
                <Button
                    key={playlist.title}
                    variant={
                    pathname === `/playlist/${playlist.id}` ? 'secondary' : 'ghost'
                    }
                    className={`justify-start p-2`}
                    asChild
                >
                    <Link
                        href={'/playlist/' + playlist.id}
                        className="h-fit w-full flex gap-4"
                    >
                    <div className={`w-12 shadow-2xl`}>
                        <AspectRatio ratio={1 / 1}>
                            <ImageWithFallback
                                src={playlist.poster_url ?? ''}
                                alt={playlist.title}
                                fill
                                className="rounded-md object-cover"
                            />
                        </AspectRatio>
                    </div>
                    {sidebarExpanded && (
                        <div>
                        <div className='line-clamp-1'>{playlist.title}</div>
                        {/* <div>{item.items_count} films</div> */}
                        </div>
                    )}
                    </Link>
                </Button>
            ))}
        </Fragment>
    )
}