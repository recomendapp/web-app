import { ImageWithFallback } from "@/components/tools/ImageWithFallback";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Compass, Home, Search, Zap } from "lucide-react";
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
            icon: 'https://misc.scdn.co/liked-songs/liked-songs-640.png',
            label: 'Coups de coeur',
            active: pathname.startsWith('/collection/likes'),
            href: '/collection/likes',
            },
            {
            icon: 'https://misc.scdn.co/your-episodes/SE-64.png',
            label: 'Watchlist',
            active: pathname.startsWith('/collection/watchlist'),
            href: '/collection/watchlist',
            },
            {
            icon: 'https://misc.scdn.co/your-episodes/SE-64.png',
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
                        <div className={`w-[48px] shadow-2xl`}>
                            <AspectRatio ratio={1 / 1}>
                                <ImageWithFallback
                                    src={item.icon ? item.icon : ''}
                                    alt={item.label}
                                    fill
                                    className="rounded-md object-cover"
                                />
                            </AspectRatio>
                        </div>
                        {sidebarExpanded && item.label}
                    </Link>
                </Button>
            ))}
        </>
    )
}