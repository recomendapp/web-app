"use client"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from 'next/navigation'

import {
    ChevronLeft,
    ChevronRight
} from "lucide-react"

import { UserNav } from "@/components/userNav"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import SearchBar from "@/components/search/searchbar"


interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Header({ className }: HeaderProps) {

    const router = useRouter();

    const pathname = usePathname()

    return (
        <header className={cn("sticky top-0 z-[50] bg-background flex justify-between items-center border-b p-4 lg:h-header lg:border-b-0", className)}>
            <div className="flex flex-col gap-4 w-full items-center lg:flex-row">
                <div className="hidden gap-4 lg:flex">
                    {/* NAVIGATION BUTTON */}
                    <Button onClick={router.back} variant='ghost' size='icon' className="rounded-full">
                        <ChevronLeft />
                    </Button>
                    <Button onClick={router.forward} variant='ghost' size='icon' className="rounded-full">
                        <ChevronRight />
                    </Button>
                    {/* PAGE TITLE */}
                </div>
                <div className=" h-full flex justify-center items-center w-full lg:hidden">
                    PARÆDISE
                </div>
                <SearchBar />
            </div>
            <div className="hidden lg:block">

            <UserNav />


            </div>
        
        </header>
    )
}
