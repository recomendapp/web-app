// "use client"

// import { useEffect, useState } from 'react'
import { Metadata } from 'next';
import { Skeleton } from '@/components/ui/skeleton';
import FeaturedPlaylists from '@/components/modules/MoviePlaylist/FeaturedPlaylists';
import SearchResultsUsers from '@/components/modules/Search/SearchResultsUsers';
import SearchFilms from '@/components/modules/Search/SearchFilms/SearchFilms';
import SearchPlaylists from '@/components/modules/Search/SearchPlaylists/SearchPlaylists';
import SearchFilters from '@/components/modules/Search/SearchFilters';
import SearchBar from '@/components/modules/Search/SearchBar';
import SearchFilmsFull from '@/components/modules/Search/SearchFilms/SearchFilmsFull';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams?.q) {
    return {
      title: 'Rechercher',
    };
  }
  return {
    title: `${searchParams.q} - Recherche`,
  };
}

export default function Search({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: {
    q: string | undefined,
    filter: string | undefined
  };
}) {
  // const skeleton = Array.from({ length: 20 }, (_, index) => (
  //   <div key={index} className="flex items-center space-x-4">
  //     <Skeleton className="h-12 w-12 rounded-full" />
  //     <div className="space-y-2">
  //       <Skeleton className="h-4 w-[50px]" />
  //       <Skeleton className="h-4 w-[100px]" />
  //     </div>
  //   </div>
  // ));
  // const divs = Array.from({ length: 100 }, (_, index) => (
  //   <div key={index} className="flex items-center space-x-4">
  //       <div className="h-12 w-12 rounded-full bg-green-500" />
  //       <div className="space-y-2">
  //         <div className="h-4 w-[50px]">{index + 1}</div>
  //         <div className="h-4 w-[100px]">identifiant:{index + 1}</div>
  //       </div>
  //   </div>
  // ));

  // const [isLoading, setIsLoading ] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);
  if (searchParams?.q ||searchParams?.filter)
    return (
      <div className="flex flex-col gap-2">
        <SearchFilters
          filter={searchParams.filter}
          query={searchParams.q}
        />
        {(!searchParams.filter || searchParams.filter === "films") &&
          <SearchFilms
            query={searchParams?.q}
            filter={searchParams.filter}
          />
        }
        {(!searchParams.filter || searchParams.filter === "users") &&
          <SearchResultsUsers
            query={searchParams?.q}
            // filter={searchParams.filter}
            />
        }
        {(!searchParams.filter || searchParams.filter === "playlists") &&
          <SearchPlaylists
            query={searchParams?.q}
            filter={searchParams.filter}
          />
        }
        {searchParams.filter === "films" &&
          <SearchFilmsFull
            query={searchParams?.q}
          />
        }
      </div>
    )

  return <FeaturedPlaylists />
}
