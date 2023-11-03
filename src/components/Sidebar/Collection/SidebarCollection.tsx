import { PlaylistButton } from "@/components/Playlist/Button/PlaylistEditButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Library } from "lucide-react";
import Link from "next/link";
import SidebarCollectionRoutes from "./SidebarCollectionRoutes";
import { UserPlaylists } from "@/components/User/UserPlaylists/UserPlaylists";
import { usePathname } from "next/navigation";
import { PlaylistCreateButton } from "@/components/Playlist/Button/PlaylistCreateButton";

export default function SidebarCollection({
    sidebarExpanded
} : {
    sidebarExpanded: boolean;
}) {
    const pathname = usePathname(); 
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