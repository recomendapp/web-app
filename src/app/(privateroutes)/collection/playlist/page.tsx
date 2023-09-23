'use client';
import { useUser } from '@/context/UserProvider';
import { databases } from '@/lib/appwrite';
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
import { ImageWithFallback } from '@/components/elements/Tools/ImageWithFallback';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Plus, PlusCircleIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { PlaylistButton } from '@/components/modules/MoviePlaylist/PlaylistButton';
import { useQuery, useQueryClient } from 'react-query';
import handlePlaylists from '@/hooks/movie/playlist/handlePlaylists';

export default function Guidelist() {
  const { user } = useUser();

  const [ open, setOpen ] = useState(false);

  const {
    data: playlists,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['collection', 'playlists'],
    queryFn: () => handlePlaylists(user.$id),
    enabled: user?.$id !== undefined && user?.$id !== null,
  });

  return (
    <main className="h-full flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between ">
        <div>PLAYLIST</div>
        <>
              <Button
                variant={'ghost'}
                size={'icon'}
                className="rounded-full"
                onClick={() => setOpen(true)}
              >
                <Plus />
              </Button>
              <PlaylistButton open={open} setOpen={setOpen} userId={user.$id} />
        </>
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
