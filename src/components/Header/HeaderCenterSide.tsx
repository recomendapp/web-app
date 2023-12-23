"use client"

import { usePathname } from "next/navigation";

export default function HeaderCenterSide() {
    const pathname = usePathname();
    return (
        <>
            {pathname.startsWith('/feed') && <div>Feed</div>}
		</>
    )
}