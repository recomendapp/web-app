"use client"
import { useMemo } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { ImageWithFallback } from "../tools/ImageWithFallback";
import { UserPlaylists } from "../User/UserPlaylists/UserPlaylists";
import { Bookmark, Heart, Send } from "lucide-react";

export function Collection() {
    const collectionRoutes = useMemo(
        () => [
            {
            icon: <CollectionIcon from="#e6619b" to="#e84749"><Heart fill="#fff"/></CollectionIcon>,
            label: 'Coups de coeur',
            href: '/collection/likes',
            },
            {
            icon: <CollectionIcon from="#39BAED" to="#32509e"><Bookmark fill="#fff"/></CollectionIcon>,
            label: 'Watchlist',
            href: '/collection/watchlist',
            },
            {
            icon: <CollectionIcon from="#FBE773" to="#F18E43"><Send fill="#fff"/></CollectionIcon>,
            label: 'Guidelist',
            href: '/collection/guidelist',
            },
        ],
        []
    );
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 px-4 pb-4">
            {collectionRoutes.map((item) => (
                <Button
                    key={item.label}
                    variant={'ghost'}
                    className={`justify-start p-2`}
                    asChild
                >
                    <Link href={item.href} className="h-full w-full flex flex-col gap-2">
                        {item.icon}
                        {item.label}
                    </Link>
                </Button>
            ))}
            <UserPlaylists sidebarExpanded={false} grid />
        </div>
    )
}

export function CollectionIcon({
    children,
    from,
    to
} : {
    children: React.ReactNode,
    from: string,
    to: string
}) {
    return (
        <div
            style={{ 
                backgroundImage: `linear-gradient(to top right, ${from}, ${to})`, 
            }}
            className={`w-full h-full rounded-md flex items-center justify-center`}
        >
            {children}
        </div>
    )
}