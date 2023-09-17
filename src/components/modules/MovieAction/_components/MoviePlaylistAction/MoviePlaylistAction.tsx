'use client';
import { AlertCircle, ListPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState } from 'react';
import { databases } from '@/db/appwrite';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  DialogTrigger,
} from '@/components/ui/dialog';

import { toast } from 'react-toastify';

import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { PlaylistButton } from '@/components/modules/MoviePlaylist/PlaylistButton';
import handlePlaylists from '@/hooks/movie/playlist/handlePlaylists';
import { useQuery, useQueryClient } from 'react-query';
import { useUser } from '@/context/UserProvider';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/icons';
import { Query } from 'appwrite';

interface MoviePlaylistActionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  movieId: number;
}

export function MoviePlaylistAction({
  movieId,
}: MoviePlaylistActionProps) {

  const { user } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState('');

  const {
    data: playlists,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user', user?.$id, 'playlists'],
    queryFn: () => handlePlaylists(user.$id),
    enabled: user?.$id !== undefined && user?.$id !== null,
    // staleTime: 30_000
  });

  const handleAddToPlaylist = async (id: string, title: string) => {
    try {
      const { documents } = await databases.listDocuments(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST_ITEM),
        [
          Query.orderDesc("rank"),
          Query.limit(1)
        ]
      )
      await databases.createDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST_ITEM),
        'unique()',
        {
          movieId: movieId,
          playlistId: id,
          playlist: id,
          user: user.$id,
          rank: documents.length ? (documents[0].rank + 100) : 100
        }
      );
      queryClient.invalidateQueries(['playlist', id])
      toast.success('Ajouté à ' + title);
      return;
    } catch (error: any) {
      if (error.response.code === 409) {
        toast.error('La playlist contient déjà cet élément');
      } else {
        toast.error("Une erreru s'est produite");
      }
    }
  };

  if (!user) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
              <Button
                onClick={() => router.push('/login')}
                disabled={(isLoading || isError) && true}
                size="icon"
                variant={'action'}
                className="rounded-full"
              >
                {isLoading ? (
                  <Icons.spinner className="animate-spin" />
                ) : isError ? (
                  <AlertCircle />
                ) : (
                  <ListPlus />
                )}
              </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Connectez-vous
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  disabled={(isLoading || isError) && true}
                  size="icon"
                  variant={'action'}
                  className="rounded-full"
                >
                  <ListPlus />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Ajouter à une playlist
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <PopoverContent className="w-[200px] p-0" align="end">
          <Command>
            <CommandInput
              value={search}
              onValueChange={setSearch}
              placeholder="Rechercher une playlist..."
              className="h-9"
            />
            <CommandList>
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setOpenDialog(true)
                    }}
                  >
                    Créer une playlist
                  </CommandItem>
                </CommandGroup>
              <DropdownMenuSeparator />
              <CommandGroup>
                {playlists?.map((item) => (
                  <CommandItem
                    key={item.$id}
                    onSelect={() => {
                      item.items_count < 5000  ? handleAddToPlaylist(item.$id, item.title) : toast.error("La playlist est déjà remplie (5000 films)")
                      setOpen(false);
                    }}
                  >
                    {item.title}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandEmpty>Aucune playlist trouvée.</CommandEmpty>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <PlaylistButton open={openDialog} setOpen={(setOpenDialog)} userId={user?.$id} movieId={movieId} />
    </>
  );
}
