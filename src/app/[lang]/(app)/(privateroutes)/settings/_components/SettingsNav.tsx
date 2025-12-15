'use client'

import { Link } from "@/lib/i18n/navigation";
import { usePathname } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useT } from "@/lib/i18n/client";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {}

export function SettingsNav({ className, ...props }: SidebarNavProps) {
  const { t } = useT();
  const pathname = usePathname();

  const settingsNavItems = [
    {
      title: t('pages.settings.profile.label'),
      href: '/settings/profile',
    },
    {
      title: t('pages.settings.account.label'),
      href: '/settings/account',
    },
    {
      title: t('pages.settings.appearance.label'),
      href: '/settings/appearance',
    },
    {
      title: t('pages.settings.subscription.label'),
      href: '/settings/subscription',
    },
    {
      title: t('pages.settings.security.label'),
      href: '/settings/security',
    },
    {
      title: t('pages.settings.notifications.label'),
      href: '/settings/notifications',
    },
    {
      title: t('pages.settings.data.label'),
      href: '/settings/data',
    },
  ];

  return (
    <ScrollArea>
      <nav
        className={cn(
          'flex space-x-2 pb-2 lg:pb-0 lg:flex-col lg:space-x-0 lg:space-y-1',
          className
        )}
        {...props}
      >
        {settingsNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              pathname === item.href
                ? 'bg-muted hover:bg-muted'
                : 'hover:bg-transparent hover:underline',
              'justify-start'
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
