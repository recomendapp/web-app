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

import { toast } from 'react-toastify';
import { Textarea } from '@/components/ui/textarea';
import { Dispatch, useState } from 'react';
import PlaylistPictureUpload from '../components/PlaylistPictureUpload';
import { usePathname, useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';

import compressPicture from '@/lib/utils/compressPicture';
import { supabase } from '@/lib/supabase/supabase';
import { Icons } from '@/components/icons';
import { Playlist } from '@/types/type.playlist';
import CREATE_PLAYLIST_MUTATION from '@/components/modules/MoviePlaylist/mutations/createPlaylistMutation'
import UPDATE_PLAYLIST_MUTATION from '@/components/modules/MoviePlaylist/mutations/updatePlaylistMutation'
import DELETE_PLAYLIST_MUTATION from '@/components/modules/MoviePlaylist/mutations/deletePlaylistMutation';
import USER_PLAYLISTS_QUERY from '@/components/User/UserPlaylists/queries/userPlaylistsQuery';
import INSERT_PLAYLIST_ITEM_MUATION from '@/components/Film/FilmAction/components/MoviePlaylistAction/mutations/insertPlaylistItemMutation';

interface PlaylistFormProps extends React.HTMLAttributes<HTMLDivElement> {
  success: () => void;
  userId: string;
  filmId?: string;
  playlist?: any;
  setPlaylist?: Dispatch<any>;
}

export function PlaylistForm({
  success,
  userId,
  filmId,
  playlist,
  setPlaylist,
}: PlaylistFormProps) {
  
  const router = useRouter();
  const pathname = usePathname();

  const [ loading, setLoading ] = useState(false);

  const [ newPoster, setNewPoster ] = useState<File>();
  
  const [ createPlaylistMutation ] = useMutation(CREATE_PLAYLIST_MUTATION, {
   update: (store, { data }) => {
    const playlistData = store.readQuery<{ playlistCollection: { edges: [{ playlist: Playlist}]}}>({
      query: USER_PLAYLISTS_QUERY,
      variables: {
        user_id: userId,
        order: { "updated_at": "DescNullsFirst"}
      }
    })
    store.writeQuery({
      query: USER_PLAYLISTS_QUERY,
      variables: {
        user_id: userId,
        order: { "updated_at": "DescNullsFirst"}
      },
      data: {
        playlistCollection: {
          edges: [
            ...playlistData!.playlistCollection.edges,
            { playlist: data.insertIntoplaylistCollection.records[0] }
          ]
        }
      }
    })
  },
  });
  const [ deletePlaylistMutation ] = useMutation(DELETE_PLAYLIST_MUTATION, {
    update: (store, { data }) => {
      const playlistData = store.readQuery<{ playlistCollection: { edges: [{ playlist: Playlist}]}}>({
        query: USER_PLAYLISTS_QUERY,
        variables: {
          user_id: userId,
          order: { "updated_at": "DescNullsFirst"}
        }
      })
      store.writeQuery({
        query: USER_PLAYLISTS_QUERY,
        variables: {
          user_id: userId,
          order: { "updated_at": "DescNullsFirst"}
        },
        data: {
          playlistCollection: {
            edges: playlistData!.playlistCollection.edges.filter(edge => {
                edge.playlist.id !== data.deleteFromplaylistCollection.records[0]
            })
          }
        }
      })
    },
  });
  const [ updatePlaylistMutation ] = useMutation(UPDATE_PLAYLIST_MUTATION);
  const [ insertPlaylistItemMutation, { error: errorInsertPlaylistItem} ] = useMutation(INSERT_PLAYLIST_ITEM_MUATION);

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
          title: data.title,
          description: data.description,
          is_public: data.is_public,
        }
      })
      if (filmId) {
        await insertPlaylistItemMutation({
          variables: {
            playlist_id: createOutput?.insertIntoplaylistCollection?.records[0]?.id,
            film_id: filmId,
            user_id: userId,
            rank: String(1)
          }
        });
      }
      if (newPoster) {
        const newPlaylistId =  createOutput?.insertIntoplaylistCollection?.records[0]?.id;
        const newPosterUrl = await uploadPoster(newPoster, newPlaylistId);
        await updatePlaylistMutation({
          variables: {
            id: newPlaylistId,
            poster_url: newPosterUrl
          }
        })
      }
      toast.success('Enregistré');
      success();
    } catch (error) {
      console.log('error', error)
      toast.error("Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdatePlaylist(data: CreatePlaylistFormValues) {
    try {
      setLoading(true);
      const payload: Record<string, any> = {
        id: playlist.id,
        title: data.title,
        description: data.description,
        is_public: data.is_public,
      }
      if (newPoster) {
        const newPosterUrl = await uploadPoster(newPoster, playlist.id);
        payload.poster_url = newPosterUrl;
      }
      await updatePlaylistMutation({
        variables: payload
      })
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
      await deletePlaylistMutation({
        variables: {
          id: playlist.id
        }
      })
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
      const fileExt = file.name.split('.').pop()
      const filePath = `${playlistId}-${Math.random()}.${fileExt}`

      const posterCompressed = await compressPicture(file, filePath, 400, 400);

      let { error } = await supabase.storage.from('playlist_posters').upload(filePath, posterCompressed)
      
      if (error) throw error;

      return (`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/playlist_posters/${filePath}`);
    } catch (error) {
      throw error;
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(playlist ? handleUpdatePlaylist : handleCeatePlaylist)}
        className=" space-y-8"
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
                    <Input {...field} id="title" placeholder="Ajoutez un nom" />
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
                      id="name"
                      placeholder="Ajoutez une description facultative"
                      className='resize-none h-32'
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
          <Button
            disabled={loading}
            type="submit"
          >
            {loading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {playlist ? 'Sauvegarder' : 'Créer'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
