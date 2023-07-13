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
} from "lucide-react"

import { cn } from "@/lib/utils"

import { Button, buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    skeleton?: boolean;
}

export function Sidebar({ className, skeleton}: SidebarProps) {
    const pathname = usePathname();
    const routes = useMemo(() => [
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
    return (
        <div className={cn("pb-12 z-[50]", className)}>
            <div className="space-y-4 py-4">
                <div className="flex px-3 py-2">
                    <Link href={"/"} className=" mb-2 px-4">
                        <Image src={"/paradisepictures_logo.svg"} alt={"Paradise Pictures Logo"} width={150} height={150}/>
                    </Link>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Découvrir
                    </h2>
                    <div className="space-y-1">
                        {routes.map((item) => (
                            <Button key={item.label} variant={item.active ? "secondary" : "ghost"} className="w-full justify-start" asChild>
                                <Link href={item.href}>
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Bibliothèque
                    </h2>
                    <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start">
                        <ListMusic className="mr-2 h-4 w-4" />
                        Roadlists
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href={"/collection/watchlist"}>
                            <Bookmark className="mr-2 h-4 w-4" />
                            Watchlist
                        </Link>
                    </Button>
                    </div>
                </div>
                <div className="py-2 ">
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
                        {/* {playlists?.map((playlist, i) => (
                        <Button
                            key={`${playlist}-${i}`}
                            variant="ghost"
                            className="w-full justify-start font-normal"
                        >
                            <ListMusic className="mr-2 h-4 w-4" />
                            {playlist}
                        </Button>
                        ))} */}
                    </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
  }

