"use client"
import { useMemo } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { ImageWithFallback } from "../tools/ImageWithFallback";
import { UserPlaylists } from "../User/UserPlaylists/UserPlaylists";

export function Collection() {
    const collectionRoutes = useMemo(
        () => [
          {
            icon: 'https://misc.scdn.co/liked-songs/liked-songs-640.png',
            label: 'Coups de coeur',
            href: '/collection/likes',
          },
          {
            icon: 'https://misc.scdn.co/your-episodes/SE-64.png',
            label: 'Watchlist',
            href: '/collection/watchlist',
          },
          {
            icon: 'https://misc.scdn.co/your-episodes/SE-64.png',
            label: 'Guidelist',
            href: '/collection/guidelist',
          },
        ],
        []
    );
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {collectionRoutes.map((item) => (
                <Button
                    key={item.label}
                    variant={'ghost'}
                    className={`justify-start p-2`}
                    asChild
                >
                <Link href={item.href} className="h-fit w-full flex flex-col gap-2">
                    <div className={`w-full shadow-2xl`}>
                        <AspectRatio ratio={1 / 1}>
                            <ImageWithFallback
                                src={item.icon ? item.icon : ''}
                                alt={item.label}
                                fill
                                className="rounded-md object-cover"
                            />
                        </AspectRatio>
                    </div>
                    <section className=" line-clamp-1">
                        {item.label}
                    </section>
                </Link>
                </Button>
            ))}
            <UserPlaylists sidebarExpanded={false} grid />
        </div>
    )
}