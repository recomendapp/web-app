"use client"

import { usePathname } from "next/navigation";
import NavigationButton from "../modules/NavigationButton/NavigationButton";
import SearchBar from '@/components/modules/Search/SearchBar';

export default function HeaderLeftSide() {
    const pathname = usePathname();

    return (
        <>
            <NavigationButton />
            {pathname.startsWith('/search') && <SearchBar />}
        </>
    )
}