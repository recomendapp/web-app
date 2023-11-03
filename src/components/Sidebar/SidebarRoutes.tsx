import { Compass, Home, Search, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Box } from "../Box/Box";
import { useLocale, useTranslations } from "next-intl";


export function SidebarRoutes({
    sidebarExpanded,
    className,
} : {
    sidebarExpanded: boolean;
    className?: string;
}) {
    const t = useTranslations('sidebar');
    const pathname = usePathname();
    const mainRoutes = useMemo(
        () => [
        {
            icon: Home,
            label: t('routes.home'),
            active: pathname === '/',
            href: '/',
        },
        {
            icon: Compass,
            label: t('routes.explore'),
            active: pathname === '/explore',
            href: '/explore',
        },
        {
            icon: Zap,
            label: t('routes.feed'),
            active: pathname.startsWith('/feed'),
            href: '/feed',
        },
        {
            icon: Search,
            label: t('routes.search'),
            active: pathname.startsWith('/search') || pathname.startsWith('/movie'),
            href: '/search',
        },
        ],
        [pathname]
    );
    return (
        <Box
            className={`flex flex-col gap-1 py-2
                ${sidebarExpanded ? 'px-3' : 'px-1 items-center'}
            `}
        >
            {mainRoutes.map((item) => (
            <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2 text-base h-[40px] py-1 px-3 font-bold hover:text-primary transition-all
                ${
                    item.active
                    ? 'text-primary'
                    : 'text-primary-subued'
                }
                `}
            >
                <item.icon className="h-6 w-6" />
                {sidebarExpanded && item.label}
            </Link>
            ))}
        </Box>
    )
}