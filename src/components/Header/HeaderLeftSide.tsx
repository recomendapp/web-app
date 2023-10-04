"use client"

import { usePathname } from "next/navigation";
import NavigationButton from "../NavigationButton/NavigationButton";
import SearchBar from '@/components/Search/SearchBar';

export default function HeaderLeftSide() {
    const pathname = usePathname();

    return (
        <>
            <NavigationButton />
            {pathname.startsWith('/search') && <SearchBar />}
        </>
    )
}