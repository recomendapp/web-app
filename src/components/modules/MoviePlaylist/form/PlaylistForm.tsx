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
import { databases, storage } from '@/lib/appwrite';
import { Dispatch, useState } from 'react';
import PlaylistPictureUpload from '../_components/PlaylistPictureUpload';
import Compressor from 'compressorjs';
import { usePathname, useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';

import CREATE_PLAYLIST_MUTATION from '@/components/modules/MoviePlaylist/form/mutations/createPlaylistMutation'
import UPDATE_PLAYLIST_MUTATION from '@/components/modules/MoviePlaylist/form/mutations/updatePlaylistMutation'
import USER_PLAYLISTS_QUERY from '@/components/modules/UserPlaylists/queries/userPlaylistsQuery';
import compressPicture from '@/lib/utils/compressPicture';
import { supabase } from '@/lib/supabase';

interface PlaylistFormProps extends React.HTMLAttributes<HTMLDivElement> {
  success: () => void;
  userId: string;
  movieId?: number;
  playlist?: any;
  setPlaylist?: Dispatch<any>;
}

export function PlaylistForm({
  success,
  userId,
  movieId,
  playlist,
  setPlaylist,
}: PlaylistFormProps) {
  
  const router = useRouter();
  const pathname = usePathname();

  const [ loading, setLoading ] = useState(false);

  const [ newPoster, setNewPoster ] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  
  const [ createPlaylist ] = useMutation(CREATE_PLAYLIST_MUTATION, {
   refetchQueries: [{ query: USER_PLAYLISTS_QUERY}]
    // update(cache, { data }) {
    //   const playlistData = cache.readQuery<any>({
    //     query: USER_PLAYLISTS_QUERY,
    //     variables: { id: userId }
    //   })
    //   console.log('test', playlistData)
    //   cache.writeQuery({
    //     query: USER_PLAYLISTS_QUERY,
    //     variables: { id: userId },
    //     data: {
    //       playlistCollection: [
    //         ...playlistData.playlistCollection,
    //         { node: data.insertIntoplaylistCollection.records[0], __typename: 'playlistEdge' },
    //       ]
    //     }
    //   })
    // }
  });

  const [ updatePlaylist ] = useMutation(UPDATE_PLAYLIST_MUTATION);
  

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
    title: playlist ? playlist.title : '',
    description: playlist ? playlist.description : '',
    is_public: playlist ? playlist.is_public : true,
  };

  const form = useForm<CreatePlaylistFormValues>({
    resolver: zodResolver(CreatePlaylistFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function handleCeatePlaylist(data: CreatePlaylistFormValues) {
    try {
      setLoading(true);
      const { errors } = await createPlaylist({
        variables: {
          user_id: userId,
          title: data.title,
          description: data.description,
          is_public: data.is_public,
        }
      })
      if (errors) throw errors;
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
      const payload: Record<string, any> = {
        id: playlist.id,
        title: data.title,
        description: data.description,
      }
      if (newPoster) {
        const newPosterUrl = await uploadPoster(newPoster, playlist.id);
        payload.poster_url = newPosterUrl
      }
      const { errors } = await updatePlaylist({
        variables: payload
      })
      if (errors) return errors;
      toast.success('Enregistré');
      success();
    } catch (error) {
      console.log(error)
      toast.error("Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  }

  async function deletePlaylist() {
    try {
      await databases.deleteDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST),
        playlist.$id
      );
      playlist.poster_path &&
        (await storage.deleteFile(
          String(process.env.NEXT_PUBLIC_APPWRITE_STORAGE_PLAYLISTS_POSTER),
          playlist.$id
        ));
      if (playlist && pathname == '/playlist/' + playlist.$id) router.push('/');
      toast.success('Enregistré');  
      success();
      return;
    } catch (error: any) {
      toast.error("Une erreur s'est produite");
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
        className="space-y-8"
      >
        <div className="grid gap-4 grid-cols-2 w-full">
          <div className="py-4">
            <PlaylistPictureUpload
              playlist={playlist}
              isUploading={isUploading}
              newPoster={newPoster}
              setNewPoster={setNewPoster}
            />
          </div>
          <div className="grid gap-4 py-4">
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
              type="button"
              variant={'destructive'}
              onClick={deletePlaylist}
            >
              Supprimer
            </Button>
          )}
          <Button type="submit">{playlist ? 'Sauvegarder' : 'Créer'}</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
