"use client"
import React, { useMemo } from 'react'

import {
    Search,
    Bookmark,
    ListMusic,
    Rss,
    Home,
    Zap,
    Compass,
    Radio,
    User,
    Library,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { Button, buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { AspectRatio } from './ui/aspect-ratio'
import { ImageWithFallback } from './ImageWithFallback'
import Script from 'next/script'
import Ads from '@/utils/adsense'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    skeleton?: boolean;
}

export function Sidebar({ className, skeleton}: SidebarProps) {
    const pathname = usePathname();
    const mainRoutes = useMemo(() => [
        {
            icon: Home,
            label: 'Accueil',
            active: pathname === '/',
            href: '/',
        },
        {
            icon: Zap,
            label: 'Feed',
            active: pathname.startsWith("/feed"),
            href: '/feed',
        },
        {
            icon: Search,
            label: 'Recherche',
            active: pathname.startsWith("/search") || pathname.startsWith("/movie"),
            href: '/search',
        }
    ], [pathname])

    const collectionRoutes = useMemo(() => [
        // {
        //     icon: ListMusic,
        //     label: 'Playlist',
        //     active: pathname === '/collection/playlist',
        //     href: '/collection/playlist',
        // },
        {
            icon: "https://misc.scdn.co/liked-songs/liked-songs-640.png",
            label: 'Watchlist',
            active: pathname.startsWith("/collection/watchlist"),
            href: '/collection/watchlist',
        },
        {
            icon: "https://misc.scdn.co/liked-songs/liked-songs-640.png",
            label: 'Guidelist',
            active: pathname.startsWith("/collection/guidelist"),
            href: '/collection/guidelist',
        }
    ], [pathname])

    return (
        <div className={cn("z-[50] hidden lg:block ", className)}>
            <div className="flex flex-col gap-2 h-full">
                {/* <div className="flex px-3 py-2 bg-background rounded-sm">
                    <Link href={"/"} className=" mb-2 px-4">
                        <Image src={"/paradisepictures_logo.svg"} alt={"Paradise Pictures Logo"} width={150} height={150}/>
                    </Link>
                </div> */}
                <div className="flex flex-col gap-1 px-3 py-2 bg-background rounded-md">
                    {/* <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Découvrir
                    </h2> */}

                        {mainRoutes.map((item) => (
                            <Button key={item.label} variant={item.active ? "secondary" : "ghost"} className="w-full justify-start" asChild>
                                <Link href={item.href}>
                                    <item.icon className="mr-2 h-6 w-6" />
                                    {item.label}
                                </Link>
                            </Button>
                        ))}
                </div>
                <div className="flex flex-col gap-4 px-3 py-2 bg-background rounded-md h-full">
                    <Button variant={pathname.startsWith("/collection") ? "secondary" : "ghost"} className="" asChild>
                        <Link href={"/collection"}>
                            <Library className="mr-2 h-6 w-6" />
                            Bibliothèque
                        </Link>
                    </Button>
                    <ScrollArea className="h-full">
                        {collectionRoutes.map((item) => (
                            <Button key={item.label} variant={item.active ? "secondary" : "ghost"} className="justify-start" asChild>
                                <Link href={item.href}>
                                    <div className={`w-[48px] shadow-2xl`}>
                                        <AspectRatio ratio={1/1}>
                                            <ImageWithFallback 
                                                src={item.icon ? item.icon : ""} 
                                                alt={item.label}
                                                fill
                                                className="rounded-md object-cover"
                                            />
                                        </AspectRatio>
                                    </div>
                                    {/* <item.icon className="mr-2 h-4 w-4" /> */}
                                    {item.label}
                                </Link>
                            </Button>
                        ))}
                        {/* {collectionRoutes.map((item) => (
                            <Button key={item.label} variant={item.active ? "secondary" : "ghost"} className="w-full justify-start" asChild>
                                <Link href={item.href}>
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.label}
                                </Link>
                            </Button>
                        ))} */}
                    </ScrollArea>
                </div>
                <Ads />
                {/* <div className="py-2 ">
                    <h2 className="relative px-7 text-lg font-semibold tracking-tight">
                    Roadlists
                    </h2>
                    <ScrollArea className="h-[250px] px-1">
                    <div className="space-y-1 p-2">
                        <Button
                            variant="ghost"
                            className="w-full justify-start font-normal"
                        >
                            <ListMusic className="mr-2 h-4 w-4" />
                            salut
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start font-normal"
                        >
                            <ListMusic className="mr-2 h-4 w-4" />
                            salut
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start font-normal"
                        >
                            <ListMusic className="mr-2 h-4 w-4" />
                            salut
                        </Button>
                    </div>
                    </ScrollArea>
                </div>*/}
            </div>
        </div>
    )
  }

