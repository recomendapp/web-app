'use client';
import { handleSearchMovies } from '@/hooks/tmdb';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Badge } from '../../../ui/badge';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Skeleton } from '../../../ui/skeleton';
import { ImageWithFallback } from '../../../elements/Tools/ImageWithFallback';
import { AspectRatio } from '../../../ui/aspect-ratio';
import SearchPlaylistsSmall from './SearchPlaylistsSmall';
import SearchPlaylistsFull from './SearchPlaylistsFull';

export default function SearchPlaylists({
  query,
  filter
}: {
  query: string | undefined;
  filter: string | undefined;
}) {
  console.log('query', query)
  if (!filter)
    return <SearchPlaylistsSmall query={query} />

  return <SearchPlaylistsFull query={query} />
}
