'use client';

import Link from 'next/link';

export default function PersonNavbar({
  focus,
  personId,
}: {
  focus: string;
  personId: string;
}) {
  const routes = [
    {
      label: 'Description',
      active: focus === 'description',
      href: `/person/${personId}`,
    },
    {
      label: 'Critiques',
      active: focus === 'reviews',
      href: `/person/${personId}/reviews`,
    },
    {
      label: 'Playlists',
      active: focus === 'playlists',
      href: `/person/${personId}/playlists`,
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
