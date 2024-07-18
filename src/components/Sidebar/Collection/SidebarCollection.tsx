import { useContext, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

// CONTEXT
import { useAuth } from '@/context/auth-context';

// COMPONENTS
import SidebarCollectionRoutes from '@/components/Sidebar/Collection/SidebarCollectionRoutes';
import { PlaylistCreateButton } from '@/components/Playlist/Button/PlaylistCreateButton';
// import { UserPlaylists } from '@/components/User/UserPlaylists/UserPlaylists';
import { Box } from '@/components/Box/Box';

// UI
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

// ICONS
import { HelpCircle, Info, Store } from 'lucide-react';
import { Library } from 'lucide-react';
import { useUiContext } from '@/context/ui-context';
import { cn } from '@/lib/utils';
import SidebarCollectionPlaylists from './SidebarCollectionPlaylists';

export default function SidebarCollection({
  className,
}: {
  className?: string;
}) {
  const { isSidebarCollapsed } = useUiContext();
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) return <Skeleton className="w-full h-full" />;

  if (!user) return <SidebarCollectionNotConnected />;

  return (
    <Box className={cn('p-0 h-full', className)}>
      <div className='px-2 pt-2'>
        {isSidebarCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
            <Link
              href={'/collection'}
              className={`
                relative flex items-center p-2 my-1
                font-medium rounded-md transition-all
                group
                ${pathname == '/collection'
                  ? 'text-primary'
                  : 'text-primary-subued hover:text-primary'
                }
              `}
            >
              <Library />
            </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              Bibliothèque
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className='flex items-center justify-between'>
            <Link
              href={'/collection'}
              className={`
                  relative flex items-center p-2 my-1
                  font-medium rounded-md transition-all
                  group
                  ${pathname == '/collection'
                    ? 'text-primary'
                    : 'text-primary-subued hover:text-primary'
                  }
              `}
            >
              <Library className=' shrink-0'/>
              <span
                  className={`
                      overflow-hidden transition-all
                      ${!isSidebarCollapsed ? 'w-52 ml-3' : 'w-0'}
                  `}
              >
                Bibliothèque
              </span>
            </Link>
            {!isSidebarCollapsed && <PlaylistCreateButton />}
          </div>
        )}
      </div>
      <ScrollArea className='w-full group-[[data-collapsed=false]]:px-2'>
        <SidebarCollectionRoutes />
        <SidebarCollectionPlaylists />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </Box>
  );
}

export function SidebarCollectionNotConnected() {
  const t = useTranslations('routes');
  const { isSidebarCollapsed } = useUiContext();
  const pathname = usePathname();
  const mainRoutes = useMemo(
    () => [
      {
        icon: Store,
        label: t('shop'),
        active: false,
        href: 'https://shop.recomend.app',
        external_link: true,
      },
      {
        icon: HelpCircle,
        label: t('help'),
        active: false,
        href: 'https://help.recomend.app',
        external_link: true,
      },
      {
        icon: Info,
        label: t('about'),
        active: pathname.startsWith('/about'),
        href: '/about',
        external_link: false,
      },
    ],
    [pathname, t]
  );

  return (
    <Box className='h-full'>
      {mainRoutes.map((item, i) => (
        isSidebarCollapsed ? (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
            <Link
              href={item.href}
              className={`
                relative flex items-center p-2 my-1 justify-center
                font-medium rounded-md transition-all
                group
                ${
                  item.active
                    ? 'text-primary'
                    : 'text-primary-subued hover:text-primary'
                }
              `}
            >
              <item.icon />
            </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ) : (
          <Link
            key={i}
            href={item.href}
            className={`
                relative flex items-center p-2 my-1
                font-medium rounded-md transition-all
                group
                ${
                  item.active
                    ? 'text-primary'
                    : 'text-primary-subued hover:text-primary'
                }
            `}
          >
            <item.icon className=' shrink-0'/>
            <span
                className={`
                    overflow-hidden transition-all
                    ${!isSidebarCollapsed ? 'w-52 ml-3' : 'w-0'}
                `}
            >
                {item.label}
            </span>
          </Link>
        )
      ))}
    </Box>
  );
}
