'use client';

import { usePathname } from 'next/navigation';
import NavigationButton from '../NavigationButton/NavigationButton';
// import SearchBar from '@/components/Search/SearchBar';
import SearchBar from '@/components/Search/SearchBarOLD';
import { PlaylistCreateButton } from '@/components/Playlist/Button/PlaylistCreateButton';
import { cn } from '@/lib/utils';
import { SidebarTrigger } from '../ui/sidebar';

export default function HeaderLeftSide({
  className,
} : {
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <SidebarTrigger className='md:hidden'/>
      <NavigationButton />
      {pathname.startsWith('/search') && <SearchBar />}
      {/* <SearchBar /> */}
      {pathname == '/collection' && <PlaylistCreateButton />}
    </div>
  );
}
