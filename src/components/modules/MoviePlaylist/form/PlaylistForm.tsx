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

import compressPicture from '@/lib/utils/compressPicture';
import { Icons } from '@/config/icons';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Playlist } from '@/types/type.db';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/auth-context';
import { useSupabaseClient } from '@/context/supabase-context';
import { useDeletePlaylist } from '@/features/client/playlist/playlistMutations';
import { userKeys } from '@/features/client/user/userKeys';
import { usePathname, useRouter } from '@/lib/i18n/routing';

interface PlaylistFormProps extends React.HTMLAttributes<HTMLDivElement> {
  success: () => void;
  filmId?: string;
  playlist?: Playlist;
}

export function PlaylistForm({
  success,
  filmId,
  playlist,
}: PlaylistFormProps) {
  const supabase = useSupabaseClient();
  const { user } = useAuth();

  const router = useRouter();

  const queryClient = useQueryClient();

  const pathname = usePathname();

  const [loading, setLoading] = useState(false);

  const [newPoster, setNewPoster] = useState<File>();

  const deletePlaylistMutation = useDeletePlaylist({
    userId: user?.id,
  })

  const { mutateAsync: insertPlaylistMutation } = useMutation({
    mutationFn: async (
      payload: {
        user_id: string;
        title: string;
        description: string;
        private: boolean;
      }
    ) => {
      const {data: response, error } = await supabase
        .from('playlists')
        .insert(payload)
        .select(`*`)
        .single()
      if (error) throw error;
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.playlists({ userId: user?.id as string }),
      });
      // queryClient.setQueryData(['user', user?.id, 'playlists', { order: 'updated_at-desc'}], (oldData: InfiniteData<Playlist[], unknown>) => {
      //   if (!oldData || !oldData.pages) {
      //       return oldData;
      //   }
      //   const newPage = [data, ...oldData.pages[0]];
      //   const newData: InfiniteData<Playlist[], unknown> = {
      //     ...oldData,
      //     pages: [newPage, ...oldData.pages.slice(1)],
      //   };
      //   return newData;
      // });
    },
  });

  const { mutateAsync: updatePlaylistMutation } = useMutation({
    mutationFn: async ({
      playlistId,
      payload
    } : {
      playlistId: number,
      payload: {
        title?: string;
        description?: string;
        private?: boolean;
        poster_url?: string | null;
      }
    }) => {
      if (!playlistId) throw Error('Missing activity id');
      const {data: response, error } = await supabase
        .from('playlists')
        .update(payload)
        .eq('id', playlistId)
        .select(`*`)
        .single()
      if (error) throw error;
      return response;
    }
  });

  // const { mutateAsync: deletePlaylistMutation } = useMutation({
  //   mutationFn: async ({
  //     playlistId
  //   } : {
  //     playlistId: number
  //   }) => {
  //     if (!playlistId) throw Error('Missing playlist id');
  //     const { error } = await supabase
  //       .from('playlist')
  //       .delete()
  //       .eq('id', playlistId)
  //     if (error) throw error;
  //     return (playlist);
  //   },
  //   onSuccess: (data, variables) => {
  //     queryClient.setQueryData(['user', user?.id, 'playlists', { order: 'updated_at-desc'}], (oldData: any) => {
  //       if (!oldData || !oldData.pages) {
  //           return oldData;
  //       }
  //       const updatedPages = oldData.pages.map((page: Playlist[]) => {
  //           return page.filter((playlist) => playlist?.id !== data?.id);
  //       });
  //       return { ...oldData, pages: updatedPages };
  //     });
  //     queryClient.setQueryData(playlistKeys.detail(data?.id as number), null);
  //   }
  // });

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
    private: z.boolean(),
  });

  type CreatePlaylistFormValues = z.infer<typeof CreatePlaylistFormSchema>;

  const defaultValues: Partial<CreatePlaylistFormValues> = {
    title: playlist?.title ?? '',
    description: playlist?.description ?? '',
    private: playlist?.private ?? false,
  };

  const form = useForm<CreatePlaylistFormValues>({
    resolver: zodResolver(CreatePlaylistFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function handleCeatePlaylist(data: CreatePlaylistFormValues) {
    try {
      setLoading(true);
      if (!user?.id) throw Error('Missing user id');
      const newPlaylist = await insertPlaylistMutation({
        user_id: user?.id,
        title: data.title ?? '',
        // title: data.title.replace(/\s+/g, ' ').trim(),
        description: data.description?.trim() ?? '',
        // description: data.description
        //   ?.replace(/[\r\n]+/g, '\n') // Multiple new lines
        //   .replace(/[^\S\r\n]+/g, ' ') // Multiple spaces
        //   .trim() ?? '',
        private: data.private,
      });
      // if (filmId) {
      //   await insertPlaylistItemMutation({
      //     variables: {
      //       playlist_id:
      //         createOutput?.insertIntoplaylistCollection?.records[0]?.id,
      //       movie_id: filmId,
      //       user_id: userId,
      //       rank: String(1),
      //     },
      //   });
      // }
      if (newPoster) {
        if (!newPlaylist.id) throw Error('Playlist id not found');
        const newPosterUrl = await uploadPoster(newPoster, newPlaylist.id);
        await updatePlaylistMutation({
          playlistId: newPlaylist.id,
          payload: {
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
      if (!playlist?.id ) throw Error('Missing activity id');
      const payload = {
        title: data.title.replace(/\s+/g, ' ').trim(),
        description: data.description?.trim() ?? '',
        // description: data.description
        //   ?.replace(/[\r\n]+/g, '\n') // Multiple new lines
        //   .replace(/[^\S\r\n]+/g, ' ') // Multiple spaces
        //   .trim() ?? '',
        private: data.private,
        poster_url: playlist?.poster_url,
      };
      if (newPoster) {
        const newPosterUrl = await uploadPoster(newPoster, playlist?.id);
        payload.poster_url = newPosterUrl;
      }
      await updatePlaylistMutation({
        playlistId: playlist.id,
        payload,
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
      if (!playlist?.id) throw Error('Missing activity id');
      await deletePlaylistMutation.mutateAsync({
        playlistId: playlist.id,
      }, {
        onSuccess: () => {
          if (pathname.startsWith(`/playlist/${playlist.id}`)) router.push('/');
          toast.success('Supprimé');
          success();
        },
        onError: () => {
          toast.error("Une erreur s'est produite");
        }
      });
    } finally {
      setLoading(false);
    }
  }

  async function uploadPoster(file: File, playlistId: number) {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${playlistId}-${Math.random()}.${fileExt}`;

      const posterCompressed = await compressPicture(file, filePath, 400, 400);

      let { data, error } = await supabase.storage
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
        <div className="flex flex-col gap-4 md:grid  md:grid-cols-2 w-full">
          <div className=" w-1/2 md:w-full">
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
                      onChange={(e) => {
                        const description = e.target.value
                          .replace(/[\r\n]+/g, '\n') // Multiple new lines
                          .replace(/[^\S\r\n]+/g, ' ') // Multiple spaces
                        form.setValue('description', description);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="private"
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
                        {field.value ? 'Privée' : 'Public'}
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant={'outline'}
                >
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>T&apos;es sur ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cela supprimera <strong className='text-foreground'>{playlist.title}</strong> définitivement.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeletePlaylist}
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            // <Button
            //   disabled={loading}
            //   type="button"
            //   variant={'destructive'}
            //   onClick={handleDeletePlaylist}
            // >
            //   Supprimer
            // </Button>
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
