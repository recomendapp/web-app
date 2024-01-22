import { Compass, Home, Search, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useMemo } from 'react';
import { Box } from '../Box/Box';
import { useLocale, useTranslations } from 'next-intl';
import { SidebarContext } from './Sidebar';

export function SidebarRoutes({ className }: { className?: string }) {
  const t = useTranslations('routes');
  const { sidebarExpanded } = useContext(SidebarContext);
  const pathname = usePathname();
  const mainRoutes = useMemo(
    () => [
      {
        icon: Home,
        label: t('home'),
        active: pathname === '/',
        href: '/',
      },
      {
        icon: Compass,
        label: t('explore'),
        active: pathname === '/explore',
        href: '/explore',
      },
      {
        icon: Zap,
        label: t('feed'),
        active: pathname.startsWith('/feed'),
        href: '/feed',
      },
      {
        icon: Search,
        label: t('search'),
        active: pathname.startsWith('/search') || pathname.startsWith('/movie'),
        href: '/search',
      },
    ],
    [pathname, t]
  );
  return (
    <Box
      className={`
                    flex flex-col
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
            >
              <item.icon />
              <span
                className={`
                                    overflow-hidden transition-all
                                    ${sidebarExpanded ? 'w-52 ml-3' : 'w-0'}
                                `}
              >
                {item.label}
              </span>
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
