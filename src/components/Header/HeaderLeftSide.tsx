'use client';

import { usePathname } from 'next/navigation';
import NavigationButton from '../NavigationButton/NavigationButton';
import SearchBar from '@/components/Search/SearchBar';
import { PlaylistCreateButton } from '@/components/Playlist/Button/PlaylistCreateButton';

export default function HeaderLeftSide() {
  const pathname = usePathname();
  return (
    <div className="flex gap-4 items-center">
      <NavigationButton />
      {pathname.startsWith('/search') && <SearchBar />}
      {pathname == '/collection' && <PlaylistCreateButton />}
    </div>
  );
}
