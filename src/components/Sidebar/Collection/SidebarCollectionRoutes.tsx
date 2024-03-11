import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// CONTEXT
import { useUiContext } from '@/context/ui-context';
// COMPONENTS
import SidebarCollectionContainerIcon from '@/components/Sidebar/Collection/SidebarCollectionContainerIcon';
// UI
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
// ICONS
import {
  Bookmark,
  Heart,
  Send,
} from 'lucide-react';

export default function SidebarCollectionRoutes() {
  const { isSidebarCollapsed } = useUiContext();
  const pathname = usePathname();
  const collectionRoutes = useMemo(
    () => [
      {
        icon: <Send fill="#fff" className="w-2/5 h-2/5" />,
        bgFrom: '#FBE773',
        bgTo: '#F18E43',
        label: 'Guidelist',
        active: pathname.startsWith('/collection/guidelist'),
        href: '/collection/guidelist',
      },
      {
        icon: <Bookmark fill="#fff" className="w-2/5 h-2/5" />,
        bgFrom: '#39BAED',
        bgTo: '#32509e',
        label: 'Watchlist',
        active: pathname.startsWith('/collection/watchlist'),
        href: '/collection/watchlist',
      },
      {
        icon: <Heart fill="#fff" className="w-2/5 h-2/5" />,
        bgFrom: '#e6619b',
        bgTo: '#e84749',
        label: 'Coups de coeur',
        active: pathname.startsWith('/collection/likes'),
        href: '/collection/likes',
      },
    ],
    [pathname]
  );
  return (
    <>
      {collectionRoutes.map((item, i) => (
        isSidebarCollapsed ? (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <Button
                key={item.label}
                variant={item.active ? 'secondary' : 'ghost'}
                className={`justify-start p-2`}
                asChild
              >
                <Link
                  href={item.href}
                  className={`
                    relative flex items-center justify-center
                    font-medium rounded-md transition-all w-full h-full
                    ${
                      item.active
                        ? 'text-primary'
                        : 'text-primary-subued hover:text-primary'
                    }
                  `}
                >
                  <SidebarCollectionContainerIcon from={item.bgFrom} to={item.bgTo}>
                    {item.icon}
                  </SidebarCollectionContainerIcon>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button
            key={i}
            variant={item.active ? 'secondary' : 'ghost'}
            className={`justify-start p-2`}
            asChild
          >
            <Link
              href={item.href}
              className={`
                  relative h-fit flex items-center p-2
                  font-medium rounded-md transition-colors
                  ${!isSidebarCollapsed ? 'w-full' : 'w-fit'}
              `}
            >
              <SidebarCollectionContainerIcon from={item.bgFrom} to={item.bgTo}>
                    {item.icon}
              </SidebarCollectionContainerIcon>
              <span
                className={`
                    overflow-hidden transition-all line-clamp-1
                    ${!isSidebarCollapsed ? ' ml-3' : 'w-0'}
                `}
              >
                  {item.label}
              </span>
            </Link>
          </Button>
        )
      ))}
    </>
  )
}
