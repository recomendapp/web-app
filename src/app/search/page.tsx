// "use client"

// import { useEffect, useState } from 'react'
import { Metadata } from 'next'
import { Skeleton } from '@/components/ui/skeleton';
import FeaturedPlaylists from '@/components/FeaturedPlaylists';
import SearchResultsUsers from '@/components/search/SearchResultsUsers';
import SearchResultsMovies from '@/components/search/SearchResultsMovies';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if(!searchParams?.q) {
      return {
          title: "Rechercher"
      }
  }
  return {
      title: `${searchParams.q} - Recherche`
  }
  
}

export default function Search({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
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

  return (
    <main className="p-4">
      {searchParams?.q ? (
        <div className='flex flex-col gap-2'>
          <SearchResultsMovies query={searchParams?.q} />
          <SearchResultsUsers query={searchParams?.q} />
        </div>
      ) : (
        <FeaturedPlaylists />
      )}
    </main>
  );
}