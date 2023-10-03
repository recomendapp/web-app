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
import SearchFilmsSmall from './SearchFilmsSmall';
import SearchFilmsFull from './SearchFilmsFull';

export default function SearchFilms({
  query,
  filter
}: {
  query: string | undefined;
  filter: string | undefined;
}) {
  if (!filter)
    return <SearchFilmsSmall query={query} />

  return <SearchFilmsFull query={query} />
}
