'use client';
import React, {
  Dispatch,
  SetStateAction,
  createRef,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Search,
  Home,
  Zap,
  Library,
  ChevronLeft,
  ChevronRight,
  Plus,
  Compass,
} from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AspectRatio } from './ui/aspect-ratio';
import { ImageWithFallback } from './ImageWithFallback';
import { useQuery } from 'react-query';
import { useUser } from '@/context/user';
import handlePlaylists from '@/hooks/movie/playlist/handlePlaylists';
import Image from 'next/image';
import Ads from '@/utils/adsense';
import { PlaylistButton } from './movie/playlist/PlaylistButton';
import { DialogTrigger } from './ui/dialog';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  skeleton?: boolean;
  sidebarWidth?: number;
  setSidebarWidth: (value: number) => void;
  sidebarExpanded: boolean;
  setSidebarExpanded: (value: boolean) => void;
}

export function Sidebar({
  className,
  skeleton,
  sidebarWidth,
  setSidebarWidth,
  sidebarExpanded,
  setSidebarExpanded,
}: SidebarProps) {
  const { user } = useUser();

  const sidebarRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (sidebarRef.current) {
      if (!sidebarWidth) {
        setSidebarWidth(sidebarRef.current?.clientWidth);
        return;
      }

      sidebarRef.current.style.width = `${sidebarWidth}px`;
    }
  }, [sidebarRef, sidebarWidth, setSidebarWidth]);

  const {
    data: playlists,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user', user?.$id, 'playlists'],
    queryFn: () => handlePlaylists(user.$id),
    enabled: user?.$id !== undefined && user?.$id !== null,
  });

  const pathname = usePathname();
  const mainRoutes = useMemo(
    () => [
      {
        icon: Home,
        label: 'Accueil',
        active: pathname === '/',
        href: '/',
      },
      {
        icon: Compass,
        label: 'Carte',
        active: pathname === '/map',
        href: '/map',
      },
      {
        icon: Zap,
        label: 'Feed',
        active: pathname.startsWith('/feed'),
        href: '/feed',
      },
      {
        icon: Search,
        label: 'Recherche',
        active: pathname.startsWith('/search') || pathname.startsWith('/movie'),
        href: '/search',
      },
    ],
    [pathname]
  );

  const collectionRoutes = useMemo(
    () => [
      {
        icon: 'https://misc.scdn.co/liked-songs/liked-songs-640.png',
        label: 'Coups de coeur',
        active: pathname.startsWith('/collection/likes'),
        href: '/collection/likes',
      },
      {
        icon: 'https://misc.scdn.co/your-episodes/SE-64.png',
        label: 'Watchlist',
        active: pathname.startsWith('/collection/watchlist'),
        href: '/collection/watchlist',
      },
      {
        icon: 'https://misc.scdn.co/your-episodes/SE-64.png',
        label: 'Guidelist',
        active: pathname.startsWith('/collection/guidelist'),
        href: '/collection/guidelist',
      },
    ],
    [pathname]
  );
  return (
    // <nav className={cn("z-[50] hidden lg:block h-full overflow-hidden", className)}>
    <nav
      ref={sidebarRef}
      className={cn(
        ' transition-all hidden lg:flex flex-col gap-2 h-full overflow-hidden',
        className
      )}
    >
      <div
        className={`flex justify-between items-center py-2 bg-background rounded-sm ${
          sidebarExpanded ? 'px-3' : 'px-1'
        }`}
      >
        {/* <Link 
                        href={"/"} 
                        className={`p-4 overflow-hidden transition-all
                            ${sidebarExpanded ? "block" : "hidden"}
                        `}
                    
                    >
                        <Image src={"/paradisepictures_logo.svg"} alt={"Paradise Pictures Logo"} width={150} height={150}/>
                    </Link> */}
        {/* <button 
                        onClick={() => setSidebarExpanded(!sidebarExpanded)}
                        className={sidebarExpanded ? "p-4" : "py-1 px-1"}
                    
                    >
                        <Image src={sidebarExpanded ? "/paradisepictures_logo.svg" : "/paradisepictures_icon.svg"} alt={"Paradise Pictures Logo"} width={150} height={150}/>
                    </button> */}
        {/* <Button onClick={() => setSidebarExpanded(!sidebarExpanded)} size={"icon"} variant={"ghost"} className='rounded-full'>
                        {sidebarExpanded ? <ChevronLeft /> : <ChevronRight />}
                    </Button> */}
        <Link href={'/'} className={sidebarExpanded ? 'p-4' : 'py-1 px-1'}>
          <Image
            src={
              sidebarExpanded
                ? '/paradisepictures_logo.svg'
                : '/paradisepictures_icon.svg'
            }
            alt={'Paradise Pictures Logo'}
            width={150}
            height={150}
          />
        </Link>
      </div>
      <div
        className={`flex flex-col gap-1 py-2 bg-background rounded-md ${
          sidebarExpanded ? 'px-3' : 'px-1  items-center'
        }`}
      >
        {/* <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Découvrir
                    </h2> */}

        {mainRoutes.map((item) => (
          // <Button key={item.label} className="w-full justify-start py-1 px-3" asChild>
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-2 text-base h-[40px] py-1 px-3 font-bold hover:text-primary transition-all
                                        ${
                                          item.active
                                            ? 'text-primary'
                                            : 'text-primary-subued'
                                        }
                                    `}
          >
            <item.icon className="h-6 w-6" />
            {sidebarExpanded && item.label}
          </Link>
          // </Button>
        ))}
      </div>
      <div
        className={`flex flex-col gap-4 py-2 bg-background rounded-md overflow-hidden h-full ${
          sidebarExpanded ? 'px-3' : 'px-1 items-center'
        }`}
      >
        {/* <Button variant={pathname.startsWith("/collection") ? "secondary" : "ghost"} className="w-full justify-start py-1 px-3" asChild>
                        <Link href={"/collection"} className='flex gap-2'>
                            <Library className=" h-6 w-6" />
                            {sidebarExpanded && "Bibliothèque"}
                        </Link>
                    </Button> */}
        <div className="flex items-center justify-between">
          <Link
            href={'/collection'}
            className={`flex items-center gap-2 text-base h-[40px] py-1 px-3 font-bold hover:text-primary transition-all
                                ${
                                  pathname == '/collection'
                                    ? 'text-primary'
                                    : 'text-primary-subued'
                                }
                            `}
          >
            <Library className=" h-6 w-6" />
            {sidebarExpanded && 'Bibliothèque'}
          </Link>
          {sidebarExpanded && user && (
            <PlaylistButton userId={user.$id}>
              <DialogTrigger asChild>
                <Button
                  variant={'ghost'}
                  size={'icon'}
                  className="rounded-full"
                >
                  <Plus />
                </Button>
              </DialogTrigger>
            </PlaylistButton>
          )}
        </div>
        <ScrollArea className="h-full">
          {collectionRoutes.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? 'secondary' : 'ghost'}
              className={`justify-start p-2`}
              asChild
            >
              <Link href={item.href} className="h-fit w-full flex gap-4">
                <div className={`w-[48px] shadow-2xl`}>
                  <AspectRatio ratio={1 / 1}>
                    <ImageWithFallback
                      src={item.icon ? item.icon : ''}
                      alt={item.label}
                      fill
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>
                {/* <item.icon className="mr-2 h-4 w-4" /> */}
                {sidebarExpanded && item.label}
              </Link>
            </Button>
          ))}
          {playlists &&
            playlists.map((item) => (
              <Button
                key={item.title}
                variant={
                  pathname === `/playlist/${item.$id}` ? 'secondary' : 'ghost'
                }
                className={`justify-start p-2`}
                asChild
              >
                <Link
                  href={'/playlist/' + item.$id}
                  className="h-fit w-full flex gap-4"
                >
                  <div className={`w-[48px] shadow-2xl`}>
                    <AspectRatio ratio={1 / 1}>
                      <ImageWithFallback
                        src={item.poster_path ? item.poster_path : ''}
                        alt={item.title}
                        fill
                        className="rounded-md object-cover"
                      />
                    </AspectRatio>
                  </div>
                  {/* <item.icon className="mr-2 h-4 w-4" /> */}
                  {sidebarExpanded && (
                    <div>
                      <div>{item.title}</div>
                      <div>{item.items_count} films</div>
                    </div>
                  )}
                </Link>
              </Button>
            ))}
          {/* {lol()} */}
        </ScrollArea>
      </div>
      {/* <div className="bg-background rounded-md p-2">
                    <Ads />
                </div> */}
      {/* <div className="py-2 ">
                    <h2 className="relative px-7 text-lg font-semibold tracking-tight">
                    Roadlists
                    </h2>
                    <ScrollArea className="h-[250px] px-1">
                    <div className="space-y-1 p-2">
                        <Button
                            variant="ghost"
                            className="w-full justify-start font-normal"
                        >
                            <ListMusic className="mr-2 h-4 w-4" />
                            salut
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start font-normal"
                        >
                            <ListMusic className="mr-2 h-4 w-4" />
                            salut
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start font-normal"
                        >
                            <ListMusic className="mr-2 h-4 w-4" />
                            salut
                        </Button>
                    </div>
                    </ScrollArea>
                </div>*/}
      <div className="flex justify-center items-center px-3 py-2 bg-background rounded-sm">
        <Link
          href={'/about'}
          className={` overflow-hidden transition-all
                            ${sidebarExpanded ? ' w-full px-3 py-2' : 'w-0'}
                        `}
        >
          À propos
        </Link>
        <Button
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
          size={'icon'}
          variant={'ghost'}
          className="rounded-full"
        >
          {sidebarExpanded ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>
    </nav>
    // </nav>
  );
}
