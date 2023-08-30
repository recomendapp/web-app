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
import { databases, storage } from '@/utils/appwrite';
import { Dispatch, useState } from 'react';
import PlaylistPictureUpload from './PlaylistPictureUpload';
import Compressor from 'compressorjs';
import { usePathname, useRouter } from 'next/navigation';

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
  const [newPicture, setNewPicture] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const CreatePlaylistFormSchema = z.object({
    name: z
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
    name: playlist ? playlist.title : '',
    description: playlist ? playlist.description : '',
    is_public: playlist ? playlist.is_public : true,
  };

  const form = useForm<CreatePlaylistFormValues>({
    resolver: zodResolver(CreatePlaylistFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function createPlaylist(data: CreatePlaylistFormValues) {
    try {
      const { $id } = await databases.createDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST),
        'unique()',
        {
          title: data.name,
          description: data.description,
          userId: userId,
          is_public: data.is_public,
        }
      );
      if (newPicture) {
        await uploadPlaylistPicture(newPicture, $id);
      }
      if (movieId) {
        await databases.createDocument(
          String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
          String(
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST_ITEM
          ),
          'unique()',
          {
            movieId: movieId,
            playlistId: $id,
            playlist: $id,
            user: userId,
          }
        );
      }
      toast.success('La playlist a été créé avec succès 👌');
      success();
      return;
    } catch (error: any) {
      toast.error("Une erreur s'est produite 🤯");
    }
  }

  async function updatePlaylist(data: CreatePlaylistFormValues) {
    try {
      if (newPicture) {
        await uploadPlaylistPicture(
          newPicture,
          playlist.$id,
          playlist.poster_path
        );
      }
      const newPlaylist = await databases.updateDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST),
        playlist.$id,
        {
          title: data.name,
          description: data.description,
          is_public: data.is_public,
        }
      );
      setPlaylist && setPlaylist(newPlaylist);
      toast.success('Les informations ont bien été enregistrée 👌');
      success();
      return;
    } catch (error: any) {
      toast.error("Une erreur s'est produite 🤯");
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
      toast.success('La playlist a bien été supprimée 👌');
      success();
      return;
    } catch (error: any) {
      toast.error("Une erreur s'est produite 🤯");
    }
  }

  const uploadPlaylistPicture = async (
    file: File,
    playlistId: string,
    oldPathToPlaylistPicture?: string
  ) => {
    try {
      new Compressor(file, {
        quality: 1,
        resize: 'cover',
        convertTypes: ['image/png', 'image/webp'],
        convertSize: 10000,
        width: 1000,
        height: 1000,
        success: async (compressedImage) => {
          // RENAME IMAGE
          const image = new File(
            [compressedImage],
            String(
              playlistId +
                compressedImage.name.substring(
                  file.name.lastIndexOf('.'),
                  compressedImage.name.length
                )
            ),
            { type: compressedImage.type }
          );
          // UPLOAD THE PLAYLIST PICTURE
          const { $id } = await storage.createFile(
            String(process.env.NEXT_PUBLIC_APPWRITE_STORAGE_PLAYLISTS_POSTER),
            playlistId,
            image
          );
          // UPDATE PATH TO PLAYLIST PICTURE
          await databases.updateDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST),
            playlistId,
            {
              poster_path: `${process.env.NEXT_PUBLIC_APPWRITE_END_POINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_STORAGE_PLAYLISTS_POSTER}/files/${$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`,
            }
          );

          // DELETE OLD PLAYLIST PICTURE
          if (oldPathToPlaylistPicture) {
            await storage.deleteFile(
              String(process.env.NEXT_PUBLIC_APPWRITE_STORAGE_PLAYLISTS_POSTER),
              oldPathToPlaylistPicture.split('/').reverse()[1]
            );
          }
          return;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(playlist ? updatePlaylist : createPlaylist)}
        className="space-y-8"
      >
        <div className="grid gap-4 grid-cols-2 w-full">
          <div className="py-4">
            <PlaylistPictureUpload
              playlist={playlist}
              isUploading={isUploading}
              newPicture={newPicture}
              setNewPicture={setNewPicture}
            />
          </div>
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input {...field} id="name" placeholder="Ajoutez un nom" />
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
