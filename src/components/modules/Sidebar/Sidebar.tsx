'use client';
import React, {
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

import { cn } from '@/lib/utils/utils';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AspectRatio } from '../../ui/aspect-ratio';
import { ImageWithFallback } from '../../elements/Tools/ImageWithFallback';
import { useQuery } from 'react-query';
import { useUser } from '@/context/UserProvider';
import handlePlaylists from '@/hooks/movie/playlist/handlePlaylists';
import { PlaylistButton } from '../MoviePlaylist/PlaylistButton';
import { DialogTrigger } from '../../ui/dialog';
import { siteConfig } from '@/config/site';
import Image from 'next/image';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  skeleton?: boolean;
}

export function Sidebar({
  className,
}: SidebarProps) {
  const { user } = useUser();

  const sidebarRef = createRef<HTMLDivElement>();

  const [ open, setOpen ] = useState(false);
  const [ sidebarExpanded, setSidebarExpanded ] = useState(true);

  const {
    data: playlists,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['collection', 'playlists'],
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
    <nav
      ref={sidebarRef}
      className={cn(
        `transition-all hidden lg:flex flex-col gap-2 h-full overflow-hidden
        ${sidebarExpanded ? 'w-[300px]' : 'w-[80px]'}
        `,
        className
      )}
    >
      <div
        className={`flex items-center py-2 bg-background rounded-sm
          ${!sidebarExpanded && 'justify-center'}
        `}
      >
        <Link href={'/'} className={sidebarExpanded ? 'p-4' : 'py-1 px-1'}>
          <Image
            src={
              sidebarExpanded
                ? siteConfig.logo.href
                : siteConfig.logo.href
            }
            alt={'Paradise Pictures Logo'}
            width={50}
            height={50}
          />
          {/* <h2 className='text-4xl font-bold text-accent-1'>{sidebarExpanded ? siteConfig.logo : siteConfig.icon}</h2> */}
        </Link>
      </div>
      <div
        className={`flex flex-col gap-1 py-2 bg-background rounded-md ${
          sidebarExpanded ? 'px-3' : 'px-1  items-center'
        }`}
      >
        {mainRoutes.map((item) => (
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
        ))}
      </div>
      <div
        className={`flex flex-col gap-4 py-2 bg-background rounded-md overflow-hidden h-full ${
          sidebarExpanded ? 'px-3' : 'px-1 items-center'
        }`}
      >
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
            <>
              <Button
                variant={'ghost'}
                size={'icon'}
                className="rounded-full"
                onClick={() => setOpen(true)}
              >
                <Plus />
              </Button>
              <PlaylistButton open={open} setOpen={setOpen} userId={user.$id} />
            </>
          )}
        </div>
        <ScrollArea className="h-full w-full">
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
                  <div className={`w-12 shadow-2xl`}>
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
                      <div className='line-clamp-1'>{item.title}</div>
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
