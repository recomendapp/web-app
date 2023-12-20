import { ScrollArea } from "@/components/ui/scroll-area";
import { Library } from "lucide-react";
import Link from "next/link";
import SidebarCollectionRoutes from "./SidebarCollectionRoutes";
import { UserPlaylists } from "@/components/User/UserPlaylists/UserPlaylists";
import { usePathname } from "next/navigation";
import { PlaylistCreateButton } from "@/components/Playlist/Button/PlaylistCreateButton";
import { useAuth } from "@/context/AuthContext/auth-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Box } from "@/components/Box/Box";
import { Button } from "@/components/ui/button";

export default function SidebarCollection({
    sidebarExpanded
} : {
    sidebarExpanded: boolean;
}) {
    const { user, loading } = useAuth();
    const pathname = usePathname(); 

    if (loading)
        return <Skeleton className="w-full h-full" />
    
    if (!user) {
        return (
            <Box className="h-full flex flex-col items-center justify-center gap-4 bg-[url('https://c4.wallpaperflare.com/wallpaper/304/589/139/dune-movie-denis-villeneuve-digital-art-movie-poster-hd-wallpaper-preview.jpg')] ">
                <Button variant={"accent-1"} asChild>
                    <Link href="https://shop.recomend.app" target="_blank">
                        Shop
                    </Link>
                </Button>
                <Button variant={"accent-1"} asChild>
                    <Link href="/about">
                        About
                    </Link>
                </Button>
                <Button variant={"link"} asChild>
                    <Link href="https://help.recomend.app" target="_blank">
                        Help
                    </Link>
                </Button>
            </Box>
        )
    }

    return (
        <div
            className={`flex flex-col gap-4 py-2 bg-background rounded-md overflow-hidden h-full ${
            sidebarExpanded ? 'px-3' : 'px-1 items-center'
            }`}
        >
            <div className="flex items-center justify-between">
            <Link
                href={'/collection'}
                className={`flex items-center gap-2 text-base h-[40px] py-1 px-3 font-bold hover:text-primary transition-all
                    ${
                    pathname == '/collection'
                        ? 'text-primary'
                        : 'text-primary-subued'
                    }
                `}
            >
                <Library className=" h-6 w-6" />
                {sidebarExpanded && 'Bibliothèque'}
            </Link>
            {sidebarExpanded && (
                <PlaylistCreateButton />
            )}
            </div>
            <ScrollArea
            className={`h-full w-full
                ${sidebarExpanded && 'pr-4'}
            `}
            >
                <SidebarCollectionRoutes sidebarExpanded={sidebarExpanded}/>
                <UserPlaylists sidebarExpanded={sidebarExpanded} />
            </ScrollArea>
        </div>
    )
}