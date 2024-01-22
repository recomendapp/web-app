'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { DialogFooter } from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import toast from 'react-hot-toast';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import PlaylistPictureUpload from '../components/PlaylistPictureUpload';
import { usePathname, useRouter } from 'next/navigation';

import compressPicture from '@/lib/utils/compressPicture';
import { supabase } from '@/lib/supabase/client';
import { Icons } from '@/components/icons';

// GRAPHQL
import { useMutation } from '@apollo/client';
import CREATE_PLAYLIST_MUTATION from '@/graphql/Playlist/Playlist/mutations/CreatePlaylist';
import UPDATE_PLAYLIST_MUTATION from '@/graphql/Playlist/Playlist/mutations/UpdatePlaylist';
import DELETE_PLAYLIST_MUTATION from '@/graphql/Playlist/Playlist/mutations/DeletePlaylist';
import GET_PLAYLISTS_BY_USER_ID from '@/graphql/Playlist/Playlist/queries/GetPlaylistsByUserId';
import INSERT_PLAYLIST_ITEM_MUATION from '@/graphql/Playlist/PlaylistItem/mutations/InsertPlaylistItemMutation';
import { CreatePlaylistMutation, DeletePlaylistMutation, GetPlaylistsByUserIdQuery, PlaylistFragment, UpdatePlaylistMutation } from '@/graphql/__generated__/graphql';

interface PlaylistFormProps extends React.HTMLAttributes<HTMLDivElement> {
  success: () => void;
  userId: string;
  filmId?: string;
  playlist?: PlaylistFragment;
}

export function PlaylistForm({
  success,
  userId,
  filmId,
  playlist,
}: PlaylistFormProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);

  const [newPoster, setNewPoster] = useState<File>();

  const [createPlaylistMutation] = useMutation<CreatePlaylistMutation>(CREATE_PLAYLIST_MUTATION, {
    update: (store, { data }) => {
      const playlistData = store.readQuery<GetPlaylistsByUserIdQuery>({
        query: GET_PLAYLISTS_BY_USER_ID,
        variables: {
          user_id: userId,
          order: { updated_at: 'DescNullsFirst' },
        },
      });
      if (playlistData && playlistData.playlistCollection && data?.insertIntoplaylistCollection) {
        store.writeQuery({
          query: GET_PLAYLISTS_BY_USER_ID,
          variables: {
            user_id: userId,
            order: { updated_at: 'DescNullsFirst' },
          },
          data: {
            ...playlistData,
            playlistCollection: {
              ...playlistData.playlistCollection,
              edges: [
                ...playlistData.playlistCollection.edges,
                { playlist: data?.insertIntoplaylistCollection.records[0] },
              ],
            },
          },
        });
      }
    },
  });
  const [deletePlaylistMutation] = useMutation<DeletePlaylistMutation>(DELETE_PLAYLIST_MUTATION, {
    update: (store, { data }) => {
      const playlistData = store.readQuery<GetPlaylistsByUserIdQuery>({
        query: GET_PLAYLISTS_BY_USER_ID,
        variables: {
          user_id: userId,
          order: { updated_at: 'DescNullsFirst' },
        },
      });
      if (playlistData && playlistData.playlistCollection) {
        store.writeQuery({
          query: GET_PLAYLISTS_BY_USER_ID,
          variables: {
            user_id: userId,
            order: { updated_at: 'DescNullsFirst' },
          },
          data: {
            ...playlistData,
            playlistCollection: {
              ...playlistData.playlistCollection,
              edges: playlistData!.playlistCollection.edges.filter(({node}) => {
                node.id !== data?.deleteFromplaylistCollection.records[0].id;
              }),
            },
          },
        });
      }
    },
  });
  const [updatePlaylistMutation] = useMutation<UpdatePlaylistMutation>(UPDATE_PLAYLIST_MUTATION);
  const [insertPlaylistItemMutation, { error: errorInsertPlaylistItem }] =
    useMutation(INSERT_PLAYLIST_ITEM_MUATION);

  const CreatePlaylistFormSchema = z.object({
    title: z
      .string()
      .min(1, {
        message: 'Le nom est obligatoire',
      })
      .max(100, {
        message: 'Le nom ne doit pas dépasser 100 caractères.',
      })
      .regex(/^[a-zA-Z0-9\s\S]*$/),
    description: z
      .string()
      .max(300, {
        message: 'La description ne doit pas dépasser 300 caractères.',
      })
      .optional(),
    is_public: z.boolean().default(true),
  });

  type CreatePlaylistFormValues = z.infer<typeof CreatePlaylistFormSchema>;

  const defaultValues: Partial<CreatePlaylistFormValues> = {
    title: playlist?.title ?? '',
    description: playlist?.description ?? '',
    is_public: playlist?.is_public ?? true,
  };

  const form = useForm<CreatePlaylistFormValues>({
    resolver: zodResolver(CreatePlaylistFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function handleCeatePlaylist(data: CreatePlaylistFormValues) {
    try {
      setLoading(true);
      const { data: createOutput } = await createPlaylistMutation({
        variables: {
          user_id: userId,
          title: data.title.replace(/\s+/g, ' ').trim(),
          description: data.description?.replace(/\s+/g, ' ').trim(),
          is_public: data.is_public,
        },
      });
      if (filmId) {
        await insertPlaylistItemMutation({
          variables: {
            playlist_id:
              createOutput?.insertIntoplaylistCollection?.records[0]?.id,
            movie_id: filmId,
            user_id: userId,
            rank: String(1),
          },
        });
      }
      if (newPoster) {
        const newPlaylistId =
          createOutput?.insertIntoplaylistCollection?.records[0]?.id;
        if (!newPlaylistId) throw Error('Playlist id not found');
        const newPosterUrl = await uploadPoster(newPoster, newPlaylistId);
        await updatePlaylistMutation({
          variables: {
            id: newPlaylistId,
            poster_url: newPosterUrl,
          },
        });
      }
      toast.success('Enregistré');
      success();
    } catch (error) {
      toast.error("Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdatePlaylist(data: CreatePlaylistFormValues) {
    try {
      setLoading(true);
      if (!playlist?.id) throw Error('Playlist ID not found');
      const payload: Record<string, any> = {
        id: playlist.id,
        title: data.title.replace(/\s+/g, ' ').trim(),
        description: data.description?.replace(/\s+/g, ' ').trim(),
        is_public: data.is_public,
      };
      if (newPoster) {
        const newPosterUrl = await uploadPoster(newPoster, playlist.id);
        payload.poster_url = newPosterUrl;
      }
      await updatePlaylistMutation({
        variables: payload,
      });
      toast.success('Enregistré');
      success();
    } catch (error) {
      toast.error("Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletePlaylist() {
    try {
      setLoading(true);
      if (!playlist?.id) throw Error('Playlist ID not found');
      await deletePlaylistMutation({
        variables: {
          id: playlist.id,
        },
      });
      toast.success('Supprimé');
      if (playlist && pathname == '/playlist/' + playlist.id) router.push('/');
      else success();
    } catch (error) {
      toast.error("Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  }

  async function uploadPoster(file: File, playlistId: string) {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${playlistId}-${Math.random()}.${fileExt}`;

      const posterCompressed = await compressPicture(file, filePath, 400, 400);

      let { error } = await supabase.storage
        .from('playlist_posters')
        .upload(filePath, posterCompressed);

      if (error) throw error;

      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/playlist_posters/${filePath}`;
    } catch (error) {
      throw error;
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          playlist ? handleUpdatePlaylist : handleCeatePlaylist
        )}
        className=" space-y-8 h-full flex flex-col justify-between"
      >
        <div className="flex flex-col gap-4 lg:grid  lg:grid-cols-2 w-full">
          <div className=" w-1/2 lg:w-full">
            <PlaylistPictureUpload
              playlist={playlist}
              loading={loading}
              newPoster={newPoster}
              setNewPoster={setNewPoster}
            />
          </div>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ajoutez un nom" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Ajoutez une description..."
                      className="resize-none h-32"
                      maxLength={300}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_public"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visibilité</FormLabel>
                  <FormControl className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="airplane-mode">
                        {field.value ? 'Public' : 'Privée'}
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <DialogFooter>
          {playlist && (
            <Button
              disabled={loading}
              type="button"
              variant={'destructive'}
              onClick={handleDeletePlaylist}
            >
              Supprimer
            </Button>
          )}
          <Button disabled={loading} type="submit">
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {playlist ? 'Sauvegarder' : 'Créer'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
