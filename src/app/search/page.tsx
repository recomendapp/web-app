// "use client"

// import { useEffect, useState } from 'react'
import { Metadata } from 'next'
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Rechercher',
  description: '...',
}

export default function Search() {
  const skeleton = Array.from({ length: 20 }, (_, index) => (
    <div key={index} className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[50px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  ));
  const divs = Array.from({ length: 100 }, (_, index) => (
    <div key={index} className="flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-green-500" />
        <div className="space-y-2">
          <div className="h-4 w-[50px]">{index + 1}</div>
          <div className="h-4 w-[100px]">identifiant:{index + 1}</div>
        </div>
    </div>
  ));

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
      <div>Resultats :</div>
      <div className="mx-10 grid grid-cols-1 lg:grid-cols-4 gap-5">
        {divs}
        {/* {isLoading ? <>{skeleton}</> : <>{divs}</>} */}
      </div>
    </main>
  );
}