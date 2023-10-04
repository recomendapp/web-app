'use client';
import React, {
  createRef,
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
import { PlaylistButton } from '../MoviePlaylist/PlaylistButton';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import { UserPlaylists } from '../UserPlaylists/UserPlaylists';
import { Box } from '@/components/elements/Box/Box';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  skeleton?: boolean;
}

export function Sidebar({
  className,
}: SidebarProps) {
  // const { user } = useUser();

  const sidebarRef = createRef<HTMLDivElement>();
  const { user, userRefresh } = useAuth();

  const [ open, setOpen ] = useState(false);
  const [ sidebarExpanded, setSidebarExpanded ] = useState(true);

  // const {
  //   data: playlists,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ['collection', 'playlists'],
  //   queryFn: () => handlePlaylists(user.$id),
  //   enabled: user?.$id !== undefined && user?.$id !== null,
  // });

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
      <Box
        className={`
          flex
          ${!sidebarExpanded && 'justify-center'}
        `}
      >
        <Link href={'/'} className={sidebarExpanded ? 'p-4' : 'py-1 px-1'}>
          <Image
            src={
              sidebarExpanded
                ? siteConfig.logo.href
                : siteConfig.icon.href
            }
            alt={siteConfig.logo.alt}
            width={50}
            height={50}
          />
          {/* <h2 className='text-4xl font-bold text-accent-1'>{sidebarExpanded ? siteConfig.logo : siteConfig.icon}</h2> */}
        </Link>
      </Box>
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
              <PlaylistButton open={open} setOpen={setOpen} userId={user.id} />
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
                {sidebarExpanded && item.label}
              </Link>
            </Button>
          ))}
          <UserPlaylists sidebarExpanded={sidebarExpanded} />
        </ScrollArea>
      </div>
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
  );
}
