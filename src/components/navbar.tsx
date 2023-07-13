"use client"

import { cn } from "@/lib/utils"

import { useUser } from "@/context/user"
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import {
    Search,
    Home,
    Library,
    Rss,
    Zap,
    Music2,
    Compass,
    Radio,
    User,
} from "lucide-react"

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {

}

export function Navbar({ className }: NavbarProps) {
    const { user } = useUser();
    const pathname = usePathname();
    const routes = useMemo(() => [
        {
            icon: Home,
            label: 'Accueil',
            active: pathname === '/',
            href: '/',
        },
        {
            icon: Search,
            label: 'Recherche',
            active: pathname.startsWith("/search") || pathname.startsWith("/movie"),
            href: '/search',
        },
        {
            icon: Zap,
            label: 'Feed',
            active: pathname.startsWith("/feed"),
            href: '/feed',
        },
        {
            icon: Library,
            label: 'Bibliothèque',
            active: 
                pathname.startsWith("/collection") || 
                pathname.startsWith("/login") || 
                pathname.startsWith("/signup") || 
                pathname.startsWith("/forgotPassword") ||
                pathname.startsWith("/resetPassword") ||
                pathname.startsWith("/verifyEmail"),
            href: user ? '/collection' : '/login',
        }
    ], [pathname, user])

    return (
        <div className={cn("bg-navbar justify-around items-center flex border-t", className)}>
            {routes.map((item) => (
                <Link key={item.label} href={item.href} className={` opacity-100 ${!item.active && " opacity-70" } w-full h-full flex items-center justify-center`}>
                    <div className="flex flex-col items-center gap-1">
                        <item.icon className="h-6 w-6" />
                        <div className=" text-xs">{item.label}</div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

