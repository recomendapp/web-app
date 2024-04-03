'use client';

import Link from 'next/link';

export default function PersonNavbar({
  focus,
  personId,
}: {
  focus: string;
  personId: number;
}) {
  const routes = [
    {
      label: 'Œuvres',
      active: focus === 'oeuvre',
      href: `/person/${personId}`,
    },
    // {
    //   label: 'Prix',
    //   active: focus === 'awards',
    //   href: `/person/${personId}/awards`,
    // },
    {
      label: 'À propos',
      active: focus === 'about',
      href: `/person/${personId}/about`,
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
                    ${item.active && 'bg-background text-accent-1 shadow-sm'}`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
