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
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext/AuthProvider';

import USER_PLAYLISTS_QUERY from '@/components/modules/UserPlaylists/queries/userPlaylistsQuery'
import { useMutation, useQuery } from '@apollo/client';
import { Playlist } from '@/types/type.playlist';
import { Skeleton } from '@/components/ui/skeleton';

import INSERT_PLAYLIST_ITEM_MUATION from '@/components/modules/MovieAction/_components/MoviePlaylistAction/mutations/insertPlaylistItemMutation';

interface MoviePlaylistActionProps {
  filmId: string;
}

export function MoviePlaylistAction({
  filmId,
}: MoviePlaylistActionProps) {

  const { user, loading: userLoading } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState('');

  const { data: userPlaylistsQuery, loading, error } = useQuery(USER_PLAYLISTS_QUERY, {
    variables: {
        user_id: user?.id
    },
    skip: !user
  });
  const playlists: [ { playlist: Playlist } ] = userPlaylistsQuery?.playlistCollection?.edges;

  const [ insertPlaylistItemMutation, { error: errorInsertPlaylistItem} ] = useMutation(INSERT_PLAYLIST_ITEM_MUATION, {
    // update: (store, { data }) => {
    //   const filmActionData = store.readQuery<{ film_actionCollection: { edges: [{ action: FilmAction}]}}>({
    //     query: FILM_ACTION_QUERY,
    //     variables: {
    //       film_id: filmId,
    //       user_id: user?.id,
    //     },
    //   })
    //   store.writeQuery({
    //     query: FILM_ACTION_QUERY,
    //     variables: {
    //       film_id: filmId,
    //       user_id: user?.id,
    //     },
    //     data: {
    //       film_actionCollection: {
    //         edges: [
    //           ...filmActionData!.film_actionCollection.edges,
    //           { action: data.insertIntofilm_actionCollection.records[0] }
    //         ]
    //       }
    //     }
    //   })
    // },
  });
  const handleAddToPlaylist = async (playlist: Playlist) => {
    try {
      await insertPlaylistItemMutation({
        variables: {
          playlist_id: playlist.id,
          film_id: filmId,
          user_id: user?.id,
          rank: Number(playlist.items_count) + 1
        }
      });
      toast.success(`Ajouté à ${playlist.title}`);
    } catch (error) {
      console.log(error)
      toast.error('Une erreur s\'est produite');
    }
  }

  if (!user) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
              <Button
                onClick={() => router.push('/login')}
                size="icon"
                variant={'action'}
                className="rounded-full"
              >
                <ListPlus />
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
                  disabled={(loading || error) && true}
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
                {playlists?.map(({ playlist } : { playlist: Playlist}) => (
                  <CommandItem
                    key={playlist.id}
                    onSelect={() => {
                      Number(playlist.items_count) < 5000  ? handleAddToPlaylist(playlist) : toast.error("La playlist est déjà remplie (5000 films)")
                      setOpen(false);
                    }}
                  >
                    {playlist.title}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandEmpty>Aucune playlist trouvée.</CommandEmpty>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <PlaylistButton open={openDialog} setOpen={(setOpenDialog)} userId={user?.id} filmId={filmId} />
    </>
  );
}
