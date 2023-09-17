'use client';

// CSS
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../../ui/button';

export default function SearchFilters({
  filter,
  query,
}: {
  filter: string | undefined;
  query: string | undefined;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchFilter, setSearchFilter] = useState<any>();

  // INIT SEARCHFILTER IF EXIST ON URL
  useEffect(() => {
    console.log('FILTER:', filter);
    filter && setSearchFilter(filter);
  }, [filter]);

  const selectSearchFilter = (filter: string) => {
    if (searchFilter === filter) {
      setSearchFilter('');
      let queryString = '';
      if (query) {
        queryString += `q=${query}`;
      }
      const url = queryString ? `${pathname}?${queryString}` : pathname;
      url && router.push(url);
    } else {
      setSearchFilter(filter);
      let queryString = '';
      if (query) {
        queryString += `q=${query}`;
      }
      if (filter !== '') {
        queryString += `${query ? '&' : ''}filter=${filter}`;
      }
      const url = queryString ? `${pathname}?${queryString}` : pathname;
      url && router.push(url);
    }
  };
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
        variant={searchFilter == 'movies' ? 'accent-1' : 'secondary'}
        className={`rounded-md`}
        onClick={() => selectSearchFilter('movies')}
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
