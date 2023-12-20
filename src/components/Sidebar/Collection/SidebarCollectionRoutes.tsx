import { Button } from "@/components/ui/button";
import { Bookmark, Compass, Heart, Home, Search, Send, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function SidebarCollectionRoutes({
    sidebarExpanded,
    className,
} : {
    sidebarExpanded: boolean;
    className?: string;
}) {
    const pathname = usePathname();
    const collectionRoutes = useMemo(
        () => [
            {
            icon: <CollectionIcon from="#e6619b" to="#e84749"><Heart fill="#fff"/></CollectionIcon>,
            label: 'Coups de coeur',
            active: pathname.startsWith('/collection/likes'),
            href: '/collection/likes',
            },
            {
            icon: <CollectionIcon from="#39BAED" to="#32509e"><Bookmark fill="#fff"/></CollectionIcon>,
            label: 'Watchlist',
            active: pathname.startsWith('/collection/watchlist'),
            href: '/collection/watchlist',
            },
            {
            icon: <CollectionIcon from="#FBE773" to="#F18E43"><Send fill="#fff"/></CollectionIcon>,
            label: 'Guidelist',
            active: pathname.startsWith('/collection/guidelist'),
            href: '/collection/guidelist',
            },
        ],
        [pathname]
    );
    return (
        <>
            {collectionRoutes.map((item) => (
                <Button
                    key={item.label}
                    variant={item.active ? 'secondary' : 'ghost'}
                    className={`justify-start p-2`}
                    asChild
                >
                    <Link href={item.href} className="h-fit w-full flex gap-4">
                        {item.icon}
                        {sidebarExpanded && item.label}
                    </Link>
                </Button>
            ))}
        </>
    )
}

export function CollectionIcon({
    children,
    from,
    to
} : {
    children: React.ReactNode,
    from: string,
    to: string
}) {
    return (
        <div
            style={{ 
                backgroundImage: `linear-gradient(to top right, ${from}, ${to})`, 
            }}
            className={`w-[48px] h-[48px] rounded-md flex items-center justify-center`}
        >
            {children}
        </div>
    )
}