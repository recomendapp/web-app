import { Collection } from '@/components/Collection/Collection';
import { UserNav } from '@/components/User/UserNav/UserNav';
import { PlaylistCreateButton } from '@/components/Playlist/Button/PlaylistCreateButton';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Bibliothèque',
};

export default async function CollectionPage() {
  return (
    <main className="h-full">
      <div className="flex justify-between items-center w-full lg:hidden p-4">
        <div className='flex gap-2 items-center'>
          <div className="text-2xl font-bold">Bibliothèque</div>
          <PlaylistCreateButton />
        </div>
        <UserNav />
      </div>
      <Collection />
    </main>
  );
}
