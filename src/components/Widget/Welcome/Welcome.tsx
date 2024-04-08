'use client';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Button } from '../../ui/button';

// WIDGETS
import { MovieNowPlayingWidget } from '@/components/Widget/MovieNowPlayingWidget/MovieNowPlayingWidget';
import { MovieUpcomingWidget } from '@/components/Widget/MovieUpcomingWidget/MovieUpcomingWidget';
import { ImageWithFallback } from '../../utils/ImageWithFallback';
import { AspectRatio } from '../../ui/aspect-ratio';

export default function Welcome() {
  return (
    <main className="flex flex-col gap-2">
      <div className=" bg-background-border w-full flex flex-col p-4 items-center">
        <h3 className="text-lg font-bold">Bienvenue sur</h3>
        <div className="relative w-full h-[10vh]">
          <Image
            src={siteConfig.logo.href}
            alt={siteConfig.logo.alt}
            fill
            className="object-scale-down"
          />
        </div>
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
