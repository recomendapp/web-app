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
import { useUI } from '@/context/ui-context';
import FollowedUserListButton from '@/components/FollowedUsers/FollowedUserListButton';

export default function Collection() {
  const { device } = useUI();
  const collectionRoutes = useMemo(
    () => [
      {
        icon: (
          <CollectionIcon from="#FBE773" to="#F18E43">
            <Send fill="#fff" className="w-2/5 h-2/5" />
          </CollectionIcon>
        ),
        label: 'Guidelist',
        href: '/collection/guidelist',
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
          <CollectionIcon from="#e6619b" to="#e84749">
            <Heart fill="#fff" className="w-2/5 h-2/5" />
          </CollectionIcon>
        ),
        label: 'Coups de coeur',
        href: '/collection/likes',
      },
    ],
    []
  );
  return (
    <main className="h-full @container/collection overflow-y-auto relative">
      {device === "mobile" ? <div className="flex justify-between items-center w-full p-4 sticky top-0">
        <div className="flex gap-2 items-center">
          <div className="text-2xl font-bold">Bibliothèque</div>
          <PlaylistCreateButton />
        </div>
        <div className='flex items-center gap-4'>
          <FollowedUserListButton />
          <UserNav />
        </div>
      </div> : null}
      <Tabs defaultValue="personal" className='p-4'>
        <TabsList className="grid grid-cols-2 max-w-[400px]">
          <TabsTrigger value="personal">Ma Bibliothèque</TabsTrigger>
          <TabsTrigger value="external">Enregistré</TabsTrigger>
        </TabsList>
        {/* <TabsContent value="personal" className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2"> */}
        <TabsContent value="personal" className="grid gap-6 grid-cols-3 @xl/collection:grid-cols-4 @2xl/collection:grid-cols-5 @4xl/collection:grid-cols-6 @6xl/collection:grid-cols-7 @7xl/collection:grid-cols-8">
          {collectionRoutes.map((item) => (
            <Button
              key={item.label}
              variant={'muted'}
              className={`justify-start p-2`}
              asChild
            >
              <Link href={item.href} className="h-full w-full flex flex-col gap-2 text-center line-clamp-2">
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
          <UserPlaylists grid />
        </TabsContent>
        <TabsContent value="external" className="grid gap-2 grid-cols-3 @md/collection:grid-cols-4 @2xl/collection:grid-cols-6 @4xl/collection:grid-cols-8 @6xl/collection:grid-cols-10 @7xl/collection:grid-cols-12">
          <UserPlaylistsLiked sidebarExpanded={false} grid />
        </TabsContent>
      </Tabs>
    </main>
  );
}
