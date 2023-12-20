import { Box } from "@/components/Box/Box"
import { siteConfig } from "@/config/site"
import Image from "next/image"
import Link from "next/link"

export default function SidebarHeader({
    sidebarExpanded
} : {
    sidebarExpanded: boolean
}) {
    return (
        <Box
            className={`
            flex
            ${!sidebarExpanded && 'justify-center'}
            `}
        >
            <Link href={'/'} className={sidebarExpanded ? 'p-4' : 'py-1 px-1'}>
                <Image
                    src={
                    sidebarExpanded
                        ? siteConfig.logo.href
                        : siteConfig.icon.href
                    }
                    alt={siteConfig.logo.alt}
                    width={sidebarExpanded ? 200 : 50}
                    height={sidebarExpanded ? 200 : 50}
                    priority
                />
            </Link>
        </Box>
    )
}