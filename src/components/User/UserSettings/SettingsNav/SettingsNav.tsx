'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils/utils';
import { buttonVariants } from '@/components/ui/button';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
}

export function SettingsNav({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  const settingsNavItems = [
    {
      title: 'Profil',
      href: '/settings/profile',
    },
    {
      title: 'Compte',
      href: '/settings/account',
    },
    {
      title: 'Sécurité',
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
