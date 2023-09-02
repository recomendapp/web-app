'use client';
import { ListPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState } from 'react';
import { databases } from '@/utils/appwrite';

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
import { PlaylistButton } from '@/components/movie/playlist/PlaylistButton';
import handlePlaylists from '@/hooks/movie/playlist/handlePlaylists';
import { useQuery } from 'react-query';

interface MoviePlaylistActionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  userId: string;
  movieId: number;
}

export function MoviePlaylistAction({
  userId,
  movieId,
}: MoviePlaylistActionProps) {

  // const [playlist, setPlaylist] = useState<Models.Document[]>();

  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  // useEffect(() => {
  //   userId &&
  //     movieId &&
  //     databases
  //       .listDocuments(
  //         String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
  //         String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST),
  //         [Query.equal('userId', userId)]
  //       )
  //       .then((response) => {
  //         console.log('respnose', response.documents);
  //         setPlaylist(response.documents);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  // }, [userId, movieId]);

  const {
    data: playlists,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user', userId, 'playlists'],
    queryFn: () => handlePlaylists(userId),
    enabled: userId !== undefined && userId !== null,
    // staleTime: 30_000
  });

  const handleAddToPlaylist = async (id: string, title: string) => {
    try {
      await databases.createDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST_ITEM),
        'unique()',
        {
          movieId: movieId,
          playlistId: id,
          playlist: id,
          user: userId,
        }
      );
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

  return (
    <PlaylistButton userId={userId} movieId={movieId}>
      <Popover open={open} onOpenChange={setOpen}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  disabled={(isLoading || isError) && true}
                  size="icon"
                  variant={'accent-1-enabled'}
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
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput
              value={search}
              onValueChange={setSearch}
              placeholder="Rechercher une playlist..."
              className="h-9"
            />
            <CommandList>
              <DialogTrigger asChild>
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                    }}
                  >
                    Créer une playlist
                  </CommandItem>
                </CommandGroup>
              </DialogTrigger>
              <DropdownMenuSeparator />
              <CommandGroup>
                {playlists?.map((item) => (
                  <CommandItem
                    key={item.$id}
                    onSelect={() => {
                      handleAddToPlaylist(item.$id, item.title);
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
    </PlaylistButton>
  );
}
