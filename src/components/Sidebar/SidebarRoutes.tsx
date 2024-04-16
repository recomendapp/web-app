import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {  useTranslations } from 'next-intl';
// CONTEXT
import { useUiContext } from '@/context/ui-context';
// COMPONENTS
import { Box } from '@/components/Box/Box';
// UI
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
// ICONS
import { Compass, Home, Search, Zap } from 'lucide-react';
// UTILS
import { cn } from '@/lib/utils';

export function SidebarRoutes({
  className 
}: {
  className?: string
}) {
  const { isSidebarCollapsed } = useUiContext();
  const t = useTranslations('routes');
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
    <Box className={cn('', className)}>
      {mainRoutes.map((item, i) => (
        isSidebarCollapsed ? (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
            <Link
              href={item.href}
              className={`
                relative flex items-center p-2 my-1
                font-medium rounded-md transition-all
                group
                ${
                  item.active
                    ? 'text-primary-foreground'
                    : 'text-primary-subued hover:text-primary-foreground'
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
                    ? 'text-primary-foreground'
                    : 'text-primary-subued hover:text-primary-foreground'
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
  )
}
