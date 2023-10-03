// "use client"

// import { useEffect, useState } from 'react'
import { Metadata } from 'next';
import { Skeleton } from '@/components/ui/skeleton';
import FeaturedPlaylists from '@/components/modules/MoviePlaylist/FeaturedPlaylists';
import SearchResultsUsers from '@/components/modules/Search/SearchResultsUsers';
import SearchResultsMovies from '@/components/modules/Search/SearchFilms/SearchFilms';
import SearchResultsPlaylists from '@/components/modules/Search/SearchPlaylists/SearchPlaylistsSmall';
import SearchFilters from '@/components/modules/Search/SearchFilters';
import SearchBar from '@/components/modules/Search/SearchBar';

export default function Search({
    children
}: {
    children: React.ReactNode;
}) {
  return (
    <main className="p-4">
      <div className="flex flex-col gap-4 pb-4 lg:hidden">
        <div className="text-4xl font-bold">Recherche</div>
        <SearchBar />
      </div>
      {children}
    </main>
  );
}
