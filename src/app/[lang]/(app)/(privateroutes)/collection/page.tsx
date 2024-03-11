'use client'

import React, { useMemo } from 'react';
import { UserNav } from '@/components/User/UserNav/UserNav';
import { PlaylistCreateButton } from '@/components/Playlist/Button/PlaylistCreateButton';

import Link from 'next/link';
import { UserPlaylists } from '@/components/User/UserPlaylists/UserPlaylists';

// ICONS
import { Bookmark, Heart, Send } from 'lucide-react';

// COMPONENTS
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { UserPlaylistsLiked } from './_components/UserPlaylistsLiked';
import CollectionIcon from '@/components/Collection/CollectionIcon';

export default function Collection() {
  const collectionRoutes = useMemo(
    () => [
      {
        icon: (
          <CollectionIcon from="#e6619b" to="#e84749">
            <Heart fill="#fff" className="w-2/5 h-2/5" />
          </CollectionIcon>
        ),
        label: 'Coups de coeur',
        href: '/collection/likes',
      },
      {
        icon: (
          <CollectionIcon from="#39BAED" to="#32509e">
            <Bookmark fill="#fff" className="w-2/5 h-2/5" />
          </CollectionIcon>
        ),
        label: 'Watchlist',
        href: '/collection/watchlist',
      },
      {
        icon: (
          <CollectionIcon from="#FBE773" to="#F18E43">
            <Send fill="#fff" className="w-2/5 h-2/5" />
          </CollectionIcon>
        ),
        label: 'Guidelist',
        href: '/collection/guidelist',
      },
    ],
    []
  );
  return (
    <main className="h-full">
      <div className="flex justify-between items-center w-full lg:hidden p-4">
        <div className="flex gap-2 items-center">
          <div className="text-2xl font-bold">Bibliothèque</div>
          <PlaylistCreateButton />
        </div>
        <UserNav />
      </div>
      <Tabs defaultValue="personal" className='p-4'>
        <TabsList className="grid grid-cols-2 max-w-[400px]">
          <TabsTrigger value="personal">Ma Bibliothèque</TabsTrigger>
          <TabsTrigger value="external">Enregistré</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
          {collectionRoutes.map((item) => (
            <Button
              key={item.label}
              variant={'muted'}
              className={`justify-start p-2`}
              asChild
            >
              <Link href={item.href} className="h-full w-full flex flex-col gap-2 text-center">
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
          <UserPlaylists grid />
        </TabsContent>
        <TabsContent value="external" className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
          <UserPlaylistsLiked sidebarExpanded={false} grid />
        </TabsContent>
      </Tabs>
    </main>
  );
}
