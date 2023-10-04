'use client';
import { useEffect, useState } from 'react';
import { Skeleton } from '../../ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '../../ui/button';

export default function SearchResultsUsers({
  query,
}: {
  query: string | undefined;
}) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any | null>(null);



  if (loading) {
    return (
      <div className=" w-full flex flex-col gap-2">
        {/* USERS TITLE */}
        <div className="flex justify-between items-end">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-32" />
        </div>
        {/* USERS CONTAINER */}
        <div className=" flex h-[250px] gap-4 overflow-x-auto overflow-y-hidden flex-wrap">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              className="flex flex-col items-center bg-secondary h-full rounded-xl p-2 gap-2"
            >
              {/* AVATAR */}
              <Skeleton className="bg-background h-[150px] w-[150px] rounded-full" />
              {/* NAME */}
              <Skeleton className="bg-background h-5 w-20" />
              <Skeleton className="bg-background h-5 w-20 rounded-full" />
            </Skeleton>
          ))}
        </div>
      </div>
    );
  }

  if (!loading && !results) {
    return null;
  }

  const getInitiales = (username: any) => {
    const words = username.normalize('NFKC').toUpperCase().split(' ');
    let initials = '';
    if (words.length === 1) {
      initials = words[0].charAt(0);
    } else if (words.length >= 2) {
      for (let i = 0; i < 2; i++) {
        initials += words[i].charAt(0);
      }
    }
    return initials;
  };

  return (
    <div className=" w-full flex flex-col gap-2">
      {/* USERS TITLE */}
      <div className="flex justify-between items-end">
        <div className="text-2xl font-bold">Utilisateurs</div>
        <Button variant="link" className="p-0 h-full">
          Tout afficher
        </Button>
      </div>
      {/* USERS CONTAINER */}
      <div className=" flex h-[250px] gap-4 overflow-x-auto overflow-y-hidden flex-wrap">
        {results?.slice(0, 10).map((item) => (
          <Link
            key={item.username}
            href={'/@' + item.username}
            className="flex flex-col items-center bg-secondary hover:bg-secondary-hover h-full rounded-xl p-2 gap-2"
          >
            {/* AVATAR */}
            <Avatar className="h-[150px] w-[150px] shadow-2xl">
              <AvatarImage src={item.avatar} alt={item.username} />
              <AvatarFallback className="text-primary bg-background text-[50px]">
                {getInitiales(item.username)}
              </AvatarFallback>
            </Avatar>
            {/* NAME */}
            <div>{item.username}</div>
            <Badge className="bg-accent-1 shadow-2xl">Utilisateur</Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
