'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
}

export function SettingsNav({ className, ...props }: SidebarNavProps) {
  const t = useTranslations('settings');
  const pathname = usePathname();

  const settingsNavItems = [
    {
      title: t('profile.label'),
      href: '/settings/profile',
    },
    {
      title: t('account.label'),
      href: '/settings/account',
    },
    {
      title: t('appearance.label'),
      href: '/settings/appearance',
    },
    {
      title: t('subscription.label'),
      href: '/settings/subscription',
    },
    {
      title: t('security.label'),
      href: '/settings/security',
    },
  ];

  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
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
  );
}
