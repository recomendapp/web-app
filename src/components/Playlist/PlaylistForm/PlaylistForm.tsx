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
import PlaylistFormPictureUpload from './PlaylistFormPictureUpload';
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
import { useAuth } from '@/context/auth-context';
import { useSupabaseClient } from '@/context/supabase-context';
import { usePlaylistDeleteMutation, usePlaylistInsertMutation, usePlaylistUpdateMutation } from '@/features/client/playlist/playlistMutations';
import { usePathname, useRouter } from '@/lib/i18n/routing';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { v4 as uuidv4 } from "uuid";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TooltipBox } from '@/components/Box/TooltipBox';

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
  const { session } = useAuth();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [newPoster, setNewPoster] = useState<File>();

  // Mutations
  const insertPlaylistMutation = usePlaylistInsertMutation();
  const deletePlaylistMutation = usePlaylistDeleteMutation();
  const updatePlaylistMutation = usePlaylistUpdateMutation();

  // Form
  const typeOptions = [
    { value: 'movie', label: upperFirst(t('common.messages.film', { count: 2 })) },
    { value: 'tv_series', label: upperFirst(t('common.messages.tv_series', { count: 2 })) },
  ];
  const CreatePlaylistFormSchema = z.object({
    title: z
      .string()
      .min(1, {
        message: t('common.form.length.char_min', { count: 1 }),
      })
      .max(100, {
        message: t('common.form.length.char_max', { count: 100 }),
      })
      .regex(/^[a-zA-Z0-9\s\S]*$/, {
        message: t('common.form.format.only_letters_numbers_spaces'),
      }),
    description: z
      .string()
      .max(300, {
        message: t('common.form.length.char_max', { count: 300 }),
      })
      .optional(),
    type: z.enum(['movie', 'tv_series']),
    private: z.boolean(),
  });
  type CreatePlaylistFormValues = z.infer<typeof CreatePlaylistFormSchema>;
  const defaultValues: Partial<CreatePlaylistFormValues> = {
    title: playlist?.title ?? '',
    description: playlist?.description ?? '',
    private: playlist?.private ?? false,
    type: playlist?.type ?? 'movie',
  };
  const form = useForm<CreatePlaylistFormValues>({
    resolver: zodResolver(CreatePlaylistFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  // Handlers
  const handleCreatePlaylist = async (data: CreatePlaylistFormValues) => {
    try {
      setLoading(true);
      if (!session?.user.id) throw Error('Missing user id');
      const newPlaylist = await insertPlaylistMutation.mutateAsync({
        userId: session?.user.id,
        title: data.title ?? '',
        description: data.description?.trim() || null,
        private: data.private,
        type: data.type,
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
        await updatePlaylistMutation.mutateAsync({
          playlistId: newPlaylist.id,
          poster_url: newPosterUrl,
        });
      }
      toast.success(upperFirst(t('common.messages.saved', { gender: 'male', count: 1 })));
      success();
    } catch (error) {
      toast.error(upperFirst(t('common.messages.an_error_occurred')));
    } finally {
      setLoading(false);
    }
  };
  const handleUpdatePlaylist = async (data: CreatePlaylistFormValues) => {
    try {
      setLoading(true);
      if (!playlist?.id ) throw Error('Missing activity id');
      const payload = {
        title: data.title.replace(/\s+/g, ' ').trim(),
        description: data.description?.trim() || null,
        private: data.private,
        poster_url: playlist?.poster_url,
      };
      if (newPoster) {
        const newPosterUrl = await uploadPoster(newPoster, playlist?.id);
        payload.poster_url = newPosterUrl;
      }
      await updatePlaylistMutation.mutateAsync({
        playlistId: playlist.id,
        ...payload,
      });
      toast.success(upperFirst(t('common.messages.saved', { gender: 'male', count: 1 })));
      success();
    } catch (error) {
      toast.error(upperFirst(t('common.messages.an_error_occurred')));
    } finally {
      setLoading(false);
    }
  };
  const handleDeletePlaylist = async () => {
    try {
      setLoading(true);
      if (!playlist?.id) throw Error('Missing activity id');
      await deletePlaylistMutation.mutateAsync({
        playlistId: playlist.id,
      }, {
        onSuccess: () => {
          if (pathname.startsWith(`/playlist/${playlist.id}`)) router.push('/');
          toast.success(upperFirst(t('common.messages.deleted')));
          success();
        },
        onError: () => {
          toast.error(upperFirst(t('common.messages.an_error_occurred')));
        }
      });
    } finally {
      setLoading(false);
    }
  };
  const uploadPoster = async (file: File, playlistId: number) => {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${playlistId}.${uuidv4()}.${fileExt}`;
      const posterCompressed = await compressPicture(file, filePath, 400, 400);
      let { data, error } = await supabase.storage
        .from('playlist_posters')
        .upload(filePath, posterCompressed, {
          upsert: true,
        });
      if (error) throw error;
      if (!data) throw new Error('No data returned from upload');
      const { data: { publicUrl } } = supabase.storage
        .from('playlist_posters')
        .getPublicUrl(data.path);
      return publicUrl;
    } catch (error) {
      throw error;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          playlist ? handleUpdatePlaylist : handleCreatePlaylist
        )}
        className=" space-y-8 h-full flex flex-col justify-between"
      >
        <div className="flex flex-col gap-4 md:grid  md:grid-cols-2 w-full">
          <div className=" w-1/2 md:w-full">
            <PlaylistFormPictureUpload
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
                  <FormLabel>{upperFirst(t('common.messages.name'))}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={upperFirst(t('common.messages.add_a_name'))} />
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
                  <FormLabel>{upperFirst(t('common.messages.description'))}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={upperFirst(t('common.messages.add_a_description'))}
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
              name="type"
              disabled={!!playlist}
              render={({ field }) => (
                <TooltipBox tooltip={!!playlist ? upperFirst(t('common.messages.cannot_be_changed')) : undefined}>
                  <FormItem className={field.disabled ? 'text-muted-foreground cursor-not-allowed' : ''}>
                    <FormLabel>{upperFirst(t('common.messages.universe'))}</FormLabel>
                    <FormControl className="grid grid-cols-2 gap-2">
                      <RadioGroup value={field.value} onValueChange={field.onChange} disabled={field.disabled}>
                      {typeOptions.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`}>{option.label}</Label>
                          </div>
                      ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </TooltipBox>
              )}
            />
            <FormField
              control={form.control}
              name="private"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{upperFirst(t('common.messages.visibility'))}</FormLabel>
                  <FormControl className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="airplane-mode">
                        {field.value ? upperFirst(t('common.messages.private', { count: 1, gender: 'female' })) : upperFirst(t('common.messages.public'))}
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
                  {upperFirst(t('common.messages.delete'))}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{upperFirst(t('common.messages.are_u_sure'))}</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{upperFirst(t('common.messages.cancel'))}</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeletePlaylist}
                  >
                    {upperFirst(t('common.messages.delete'))}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Button disabled={loading} type="submit">
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {playlist ? upperFirst(t('common.messages.save')) : upperFirst(t('common.messages.create'))}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
