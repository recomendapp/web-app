import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Library } from 'lucide-react';
import Link from 'next/link';
import SidebarCollectionRoutes from './SidebarCollectionRoutes';
import { UserPlaylists } from '@/components/User/UserPlaylists/UserPlaylists';
import { usePathname } from 'next/navigation';
import { PlaylistCreateButton } from '@/components/Playlist/Button/PlaylistCreateButton';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { Box } from '@/components/Box/Box';
import { Button } from '@/components/ui/button';
import { useContext, useMemo } from 'react';
import { SidebarContext } from '../Sidebar';
import { useTranslations } from 'next-intl';

// ICONS
import { HelpCircle, Info, Store } from 'lucide-react';

export default function SidebarCollection() {
  const { sidebarExpanded } = useContext(SidebarContext);
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) return <Skeleton className="w-full h-full" />;

  if (!user) return <SidebarCollectionNotConnected />;

  return (
    <Box
      className={`
                flex flex-col gap-1 h-full overflow-x-hidden
                `}
      // ${sidebarExpanded ? 'px-3' : 'px-1 items-center'}
    >
      <div
        className={`
                    flex items-center
                    ${
                      sidebarExpanded
                        ? 'flex justify-between'
                        : 'justify-center'
                    }
                `}
      >
        <Link
          href={'/collection'}
          className={`
                        relative flex items-center p-2 my-1
                        font-medium rounded-md transition-colors
                        group
                        ${
                          pathname == '/collection'
                            ? 'text-primary'
                            : 'text-primary-subued hover:text-primary'
                        }
                    `}
        >
          <Library className="transition-colors" />
          <span
            className={`
                            overflow-hidden transition-all
                            ${sidebarExpanded ? 'w-52 ml-3' : 'w-0'}
                        `}
          >
            Bibliothèque
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
              Bibliothèque
            </div>
          )}
        </Link>
        {sidebarExpanded && <PlaylistCreateButton />}
      </div>
      <ScrollArea>
        <SidebarCollectionRoutes />
        <UserPlaylists sidebarExpanded={sidebarExpanded} />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </Box>
  );
}

export function SidebarCollectionNotConnected() {
  const t = useTranslations('routes');
  const { sidebarExpanded } = useContext(SidebarContext);
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
    <Box
      className={`
                    flex flex-col h-full
                    ${!sidebarExpanded && 'items-center'}
            `}
    >
      <ul>
        {mainRoutes.map((item) => (
          <li key={item.label}>
            <Link
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
              target={item.external_link ? '_blank' : ''}
            >
              <item.icon />
              <div
                className={`
                                    flex justify-between overflow-hidden transition-all
                                    ${sidebarExpanded ? 'w-full ml-3' : 'w-0'}
                                `}
              >
                <span>{item.label}</span>
                {item.external_link && <span>↗</span>}
              </div>
              {/* {sidebarExpanded && item.label} */}
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
          </li>
        ))}
      </ul>
    </Box>
  );
}
