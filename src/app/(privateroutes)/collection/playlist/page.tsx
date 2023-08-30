'use client';
import { useUser } from '@/context/user';
import { databases } from '@/utils/appwrite';
import { Query } from 'appwrite';
import { Models } from 'appwrite/types/models';
import React, { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, PlusCircleIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { PlaylistButton } from '@/components/movie/playlist/PlaylistButton';
import { useQuery, useQueryClient } from 'react-query';
import handlePlaylists from '@/hooks/movie/playlist/handlePlaylists';

export default function Guidelist() {
  const { user } = useUser();

  const {
    data: playlists,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user', user?.$id, 'playlists'],
    queryFn: () => handlePlaylists(user.$id),
    enabled: user.$id !== undefined && user.$id !== null,
    // staleTime: 30_000
  });

  return (
    <main className="h-full flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between ">
        <div>PLAYLIST</div>
        <PlaylistButton userId={user.$id}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Créer une playlist
            </Button>
          </DialogTrigger>
        </PlaylistButton>
      </div>
      {playlists ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {playlists.map((item: any, index: number) => (
            <Link
              key={index}
              href={'/playlist/' + item.$id}
              className="flex w-full flex-col items-center bg-secondary hover:bg-secondary-hover overflow-hidden rounded-md gap-2 p-2"
            >
              {/* AVATAR */}
              <div
                className={`w-full shadow-2xl bg-[rgb(${
                  (index + 1) * 10
                },72,99)]`}
              >
                <AspectRatio ratio={1 / 1}>
                  <ImageWithFallback
                    src={item.poster_path ? item.poster_path : ''}
                    alt={item.title}
                    fill
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              </div>

              {/* PLAYLIST TITLE */}
              <div>{item.title}</div>

              {/* PLAYLIST OWNER */}
              <div>By @{item.userId.username}</div>

              <Badge>{item.is_public ? 'Public' : 'Privée'}</Badge>
            </Link>
          ))}
        </div>
      ) : (
        <Loader2 />
      )}
    </main>
  );
}
