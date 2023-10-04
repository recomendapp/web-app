'use client';

// CSS
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';

export default function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q')
  const [searchFilter, setSearchFilter] = useState<string | undefined>(getInitialFilter());

  function selectSearchFilter(filter: string) {
    const segments = pathname.split('/');
    segments[2] = filter;
    const updatedPathname = segments.join('/');
    const queryParams = new URLSearchParams();
    if (searchQuery) {
      queryParams.set('q', searchQuery);
    }
    const queryString = queryParams.toString();
    const url = queryString ? `${updatedPathname}?${queryString}` : updatedPathname;
    console.log('url', url)
    router.push(url);
  }

  function getInitialFilter() {
    const segments = pathname.split('/');
    if (segments.length > 2) {
      const filter = segments[2];
      if (['films', 'playlists', 'users'].includes(filter)) {
        return filter;
      }
    }
    return undefined;
  }

  useEffect(() => {
    setSearchFilter(getInitialFilter());
  }, [pathname]);

  if (!searchQuery)
    return null

    console.log('searchQuery', searchQuery)

  return (
    <div className="flex gap-4 pb-2">
      <Button
        variant={!searchFilter ? 'accent-1' : 'secondary'}
        className={`rounded-md`}
        onClick={() => selectSearchFilter('')}
      >
        Tout
      </Button>
      <Button
        variant={searchFilter == 'films' ? 'accent-1' : 'secondary'}
        className={`rounded-md`}
        onClick={() => selectSearchFilter('films')}
      >
        Films
      </Button>
      <Button
        variant={searchFilter == 'playlists' ? 'accent-1' : 'secondary'}
        className={`rounded-md`}
        onClick={() => selectSearchFilter('playlists')}
      >
        Playlists
      </Button>
      <Button
        variant={searchFilter == 'users' ? 'accent-1' : 'secondary'}
        className={`rounded-md`}
        onClick={() => selectSearchFilter('users')}
      >
        Utilisateurs
      </Button>
    </div>
  );
}
