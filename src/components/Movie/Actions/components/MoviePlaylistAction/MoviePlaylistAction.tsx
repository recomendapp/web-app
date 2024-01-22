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

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext/auth-context';

// GRAPHQL
import { useMutation, useQuery } from '@apollo/client';
import USER_PLAYLISTS_QUERY from '@/graphql/Playlist/Playlist/queries/GetPlaylistsByUserId';
import INSERT_PLAYLIST_ITEM_MUATION from '@/graphql/Playlist/PlaylistItem/mutations/InsertPlaylistItemMutation';
import type { GetPlaylistsByUserIdQuery, PlaylistFragment } from '@/graphql/__generated__/graphql';

interface MoviePlaylistActionProps {
  movieId: string;
}

export function MoviePlaylistAction({ movieId }: MoviePlaylistActionProps) {
  const { user, loading: userLoading } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const {
    data: userPlaylistsQuery,
    loading,
    error,
  } = useQuery<GetPlaylistsByUserIdQuery>(USER_PLAYLISTS_QUERY, {
    variables: {
      user_id: user?.id,
      order: { updated_at: 'DescNullsFirst' },
    },
    skip: !user,
  });
  const playlists = userPlaylistsQuery?.playlistCollection?.edges;

  const [insertPlaylistItemMutation, { error: errorInsertPlaylistItem }] =
    useMutation(INSERT_PLAYLIST_ITEM_MUATION, {
      refetchQueries: [
        {
          query: USER_PLAYLISTS_QUERY,
          variables: {
            user_id: user?.id,
            order: { updated_at: 'DescNullsFirst' },
          },
        },
      ],
    });

  const handleAddToPlaylist = async (playlist: PlaylistFragment) => {
    try {
      if (!user || !movieId) throw Error("User or movieId doesn't exist");
      await insertPlaylistItemMutation({
        variables: {
          playlist_id: playlist.id,
          movie_id: movieId,
          user_id: user?.id,
          rank: null,
        },
      });
      toast.success(`Ajouté`);
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  };

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
          <TooltipContent side="bottom">Connectez-vous</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
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
                {playlists?.map(({ node }) => (
                  <CommandItem
                    key={node.id}
                    onSelect={() => {
                      Number(node.items_count) < 5000
                        ? handleAddToPlaylist(node)
                        : toast.error(
                            'La playlist est déjà remplie (5000 films)'
                          );
                      setOpen(false);
                    }}
                  >
                    {node.title}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandEmpty>Aucune playlist trouvée.</CommandEmpty>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
