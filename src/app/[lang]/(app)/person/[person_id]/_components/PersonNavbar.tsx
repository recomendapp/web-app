'use client';

import { Link } from "@/lib/i18n/routing";
import { usePathname } from '@/lib/i18n/routing';

const type = 'person';

export default function PersonNavbar({
  personId,
}: {
  personId: string;
}) {
  const pathname = usePathname();
  const regex = `^/${type}/${personId}(-[a-z0-9-]*)?`;
  const routes = [
    {
      label: 'Général',
      active: pathname.match(new RegExp(regex + '$')),
      href: `/${type}/${personId}`,
    },
    {
      label: 'Films',
      active: pathname.match(new RegExp(regex + '/films')),
      href: `/${type}/${personId}/films`,
    },
    {
      label: 'Séries',
      active: pathname.match(new RegExp(regex + '/tv-series')),
      href: `/${type}/${personId}/tv-series`,
    },
  ];

  return (
    <div className="inline-flex h-10 items-center justify-center bg-muted p-1 text-muted-foreground w-full rounded-md mb-4">
      {routes.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`w-full rounded-md inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium ring-offset-background transition-all 
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                    disabled:pointer-events-none disabled:opacity-50 
                    ${item.active && 'bg-background text-accent-yellow shadow-sm'}`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
