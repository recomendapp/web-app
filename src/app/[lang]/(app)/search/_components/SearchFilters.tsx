'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// UI
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type Route = {
  label: string;
  filter: string;
  active: boolean;
};

export default function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');
  const [searchFilter, setSearchFilter] = useState<string | undefined>(
    getInitialFilter()
  );

  const routes: Route[] = [
    {
      label: 'Tout',
      filter: '',
      active: !searchFilter
    },
    {
      label: 'Films',
      filter: 'films',
      active: searchFilter === 'films'
    },
    {
      label: 'Séries',
      filter: 'tv_series',
      active: searchFilter === 'tv_series'
    },
    {
      label: 'Playlists',
      filter: 'playlists',
      active: searchFilter === 'playlists'
    },
    {
      label: 'Utilisateurs',
      filter: 'users',
      active: searchFilter === 'users'
    },
    {
      label: 'Crew & Cast',
      filter: 'crew-cast',
      active: searchFilter === 'crew-cast'
    }
  ]

  function selectSearchFilter(route: Route) {
    const segments = pathname.split('/');
    segments[2] = route.filter;
    const updatedPathname = segments.join('/');
    const queryParams = new URLSearchParams();
    if (searchQuery) {
      queryParams.set('q', searchQuery);
    }
    const queryString = queryParams.toString();
    const url = queryString
      ? `${updatedPathname}?${queryString}`
      : updatedPathname;

    router.push(url);
  }

  function getInitialFilter() {
    const segments = pathname.split('/');
    if (segments.length > 2) {
      const filter = segments[2];
      if (['films', 'tv_series', 'playlists', 'users', 'crew-cast'].includes(filter)) {
        return filter;
      }
    }
    return undefined;
  }

  useEffect(() => {
    setSearchFilter(getInitialFilter());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!searchQuery) return null;

  return (
    <ScrollArea>
      <div className="flex gap-4 pb-2">
        {routes.map((route, index) => (
          <Button
            key={index}
            variant={route.active ? 'accent-1' : 'secondary'}
            className={`rounded-md shrink-0`}
            onClick={() => selectSearchFilter(route)}
          >
            {route.label}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
