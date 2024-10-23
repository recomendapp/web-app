'use client';

import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Button } from '../../ui/button';

// WIDGETS
import { MovieNowPlayingWidget } from '@/components/Widget/MovieNowPlayingWidget/MovieNowPlayingWidget';
import { MovieUpcomingWidget } from '@/components/Widget/MovieUpcomingWidget/MovieUpcomingWidget';
import { Icons } from '@/config/icons';

export default function Welcome() {
  return (
    <main className="flex flex-col gap-2">
      <div className=" bg-background-border w-full flex flex-col p-4 items-center">
        <h3 className="text-lg font-bold">Bienvenue sur</h3>
        <Icons.site.logo className="fill-accent-1 w-3/5 md:w-1/5 mx-auto" />
        <Button variant={'link'} asChild>
          <Link href={'/auth/login'}>Getting started</Link>
        </Button>
      </div>
      <div className="px-4 pb-4">
        <MovieNowPlayingWidget />
        <MovieUpcomingWidget />
      </div>
    </main>
  );
}
