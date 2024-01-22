import { Button } from '@/components/ui/button';
import {
  Bookmark,
  Compass,
  Heart,
  Home,
  Search,
  Send,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useMemo } from 'react';
import { SidebarContext } from '../Sidebar';

export default function SidebarCollectionRoutes() {
  const { sidebarExpanded } = useContext(SidebarContext);
  const pathname = usePathname();
  const collectionRoutes = useMemo(
    () => [
      {
        icon: (
          <CollectionIcon from="#e6619b" to="#e84749">
            <Heart fill="#fff" className="w-2/5 h-2/5" />
          </CollectionIcon>
        ),
        label: 'Coups de coeur',
        active: pathname.startsWith('/collection/likes'),
        href: '/collection/likes',
      },
      {
        icon: (
          <CollectionIcon from="#39BAED" to="#32509e">
            <Bookmark fill="#fff" className="w-2/5 h-2/5" />
          </CollectionIcon>
        ),
        label: 'Watchlist',
        active: pathname.startsWith('/collection/watchlist'),
        href: '/collection/watchlist',
      },
      {
        icon: (
          <CollectionIcon from="#FBE773" to="#F18E43">
            <Send fill="#fff" className="w-2/5 h-2/5" />
          </CollectionIcon>
        ),
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
          <Link
            href={item.href}
            className={`
                            relative h-fit flex items-center p-2 my-1
                            font-medium rounded-md transition-colors
                            group
                            ${sidebarExpanded ? 'w-full' : 'w-fit'}
                        `}
          >
            {item.icon}
            <span
              className={`
                                overflow-hidden transition-all line-clamp-1
                                ${sidebarExpanded ? ' ml-3' : 'w-0'}
                            `}
            >
              {item.label}
            </span>
            {!sidebarExpanded && (
              <div
                className={`
                                    z-[1]
                                    absolute left-full rounded-md px-2 py-1 ml-6
                                    bg-muted text-sm whitespace-nowrap
                                    invisible opacity-20 -translate-x-3 transition-all
                                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                                `}
              >
                {item.label}
              </div>
            )}
          </Link>
        </Button>
      ))}
    </>
  );
}

export function CollectionIcon({
  children,
  from,
  to,
}: {
  children: React.ReactNode;
  from: string;
  to: string;
}) {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to top right, ${from}, ${to})`,
      }}
      className={`w-[48px] aspect-square rounded-md flex items-center justify-center shrink-0 text-white`}
    >
      {children}
    </div>
  );
}
