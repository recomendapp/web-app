import { ImageWithFallback } from "@/components/elements/Tools/ImageWithFallback";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import USER_PLAYLISTS_QUERY from '@/components/modules/UserPlaylists/queries/userPlaylistsQuery'
import { Playlist } from "@/types/type.playlist";
import Loader from "@/components/elements/Loader/Loader";

export function UserPlaylists({ sidebarExpanded } : { sidebarExpanded: boolean}) {
    const pathname = usePathname();
    const { user } = useAuth();
    const { data: getUserPlaylists, loading, error } = useQuery(USER_PLAYLISTS_QUERY, {
        variables: { userId: user?.id },
        skip: !user
    });
    const playlists = getUserPlaylists?.playlistCollection?.edges;

    if (!user)
        return null

    if (loading && !playlists)
        return <Loader />
    
    if (!loading && !playlists)
        return null

    return (
        <Fragment>
            {playlists.map(({ node: item } : { node: Playlist}) => (
                    <Button
                        key={item.title}
                        variant={
                        pathname === `/playlist/${item.id}` ? 'secondary' : 'ghost'
                        }
                        className={`justify-start p-2`}
                        asChild
                    >
                        <Link
                            href={'/playlist/' + item.id}
                            className="h-fit w-full flex gap-4"
                        >
                        <div className={`w-12 shadow-2xl`}>
                            <AspectRatio ratio={1 / 1}>
                                <ImageWithFallback
                                    src={item.poster_url ?? ''}
                                    alt={item.title}
                                    fill
                                    className="rounded-md object-cover"
                                />
                            </AspectRatio>
                        </div>
                        {sidebarExpanded && (
                            <div>
                            <div className='line-clamp-1'>{item.title}</div>
                            {/* <div>{item.items_count} films</div> */}
                            </div>
                        )}
                        </Link>
                    </Button>
            ))}
        </Fragment>
    )
}