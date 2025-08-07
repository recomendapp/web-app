'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';
import PictureUpload from './pictureUpload';
import { useAuth } from '@/context/auth-context';
import { Icons } from '@/config/icons';
import { useEffect, useState } from 'react';
import compressPicture from '@/lib/utils/compressPicture';
import Loader from '@/components/Loader';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { useSupabaseClient } from '@/context/supabase-context';
import { upperFirst } from 'lodash';

export function ProfileForm() {
  const supabase = useSupabaseClient();
  const t = useTranslations('pages.settings');
  const common = useTranslations('common');
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const { mutateAsync: updateProfile } = useMutation({
    mutationFn: async (payload: Record<string, any>) => {
      if (!user?.id) throw new Error('No user id');
      const {
        data,
        error
      } = await supabase
        .from('user')
        .update(payload)
        .eq('id', user?.id)
        .select('*');
      if (error) throw error;
      return data;
    },
    onError: (error) => {
      throw new Error(error.message);
    }
  });

  const [newAvatar, setNewAvatar] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);

  const profileFormSchema = z.object({
    full_name: z
      .string()
      .min(1, {
        message: t('profile.full_name.form.min_length'),
      })
      .max(30, {
        message: t('profile.full_name.form.max_length'),
      })
      .regex(/^(?!\s+$)[a-zA-Z0-9\s\S]*$/),
    bio: z
      .string()
      .max(150, {
        message: t('profile.bio.form.max_length'),
      })
      .optional(),
    website: z
      .string()
      .url({
        message: t('profile.url.form.invalid'),
      })
      .or(z.literal(''))
      .optional(),
  });

  type ProfileFormValues = z.infer<typeof profileFormSchema>;

  const defaultValues: Partial<ProfileFormValues> = {
    full_name: user?.full_name,
    bio: user?.bio ?? undefined,
    // favorite_movies: userFavoriteMovies ? userFavoriteMovies.map(({ movie_id }) => movie_id) : [],
    website: user?.website ?? undefined,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    if (user)
    {
      form.setValue('full_name', user.full_name);
      form.setValue('bio', user?.bio ?? undefined);
      form.setValue('website', user?.website ?? undefined);
    }
  }, [form, user]);

  async function onSubmit(data: ProfileFormValues) {
    try {
      if (!user) return;

      setLoading(true);
      
      // check if profile has been updated
      if (newAvatar || user.full_name !== data.full_name || user.bio !== data.bio || user.website !== data.website) {
        const userPayload: Record<string, any> = {
          full_name: data.full_name,
          bio: data.bio?.trim() || null,
          website: data.website?.trim() || null,
        };
        if (newAvatar) {
          const newAvatarUrl = await uploadAvatar(newAvatar, user.id);
          userPayload.avatar_url = newAvatarUrl;
        }
        await updateProfile(userPayload);
      }

      toast.success(upperFirst(common('messages.saved', { gender: 'male', count: 1 })));
    } catch (error: any) {
      toast.error(upperFirst(common('messages.an_error_occurred')));
      // toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteAvatar() {
    try {
      await updateProfile({
        avatar_url: null,
      });
      toast.success(upperFirst(common('messages.saved', { gender: 'male', count: 1 })));
    } catch (error) {
      toast.error(upperFirst(common('messages.an_error_occurred')));
    } finally {
      setLoading(false);
    }
  }

  async function uploadAvatar(file: File, userId: string) {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}.${fileExt}`;
      const avatarCompressed = await compressPicture(file, filePath, 400, 400);
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarCompressed, {
          upsert: true
        });
      if (error) throw error;
      if (!data) throw new Error('No data returned from upload');
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(data.path);
      return publicUrl
    } catch (error) {
      throw error;
    }
  }

  if (!user) return <Loader />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-4 items-center">
          <PictureUpload
            user={user}
            isUploading={isUploading}
            newAvatar={newAvatar}
            setNewAvatar={setNewAvatar}
          />
          {user.avatar_url && (
            <Button type='button' variant={'destructive'} onClick={deleteAvatar}>
              {t('profile.avatar.delete')}
            </Button>
          )}
        </div>
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between gap-4">
                <p>{t('profile.full_name.label')}</p>
                <p className="">{field?.value?.length ?? 0} / 50</p>
              </FormLabel>
              <FormControl>
                <Input placeholder={t('profile.full_name.placeholder')} {...field} />
              </FormControl>
              <FormDescription className="text-justify">
                {t('profile.full_name.description')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between gap-4">
                <p>{t('profile.bio.label')}</p>
                <p>{field?.value?.length ?? 0} / 150</p>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('profile.bio.placeholder')}
                  className="resize-none h-32"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'website'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('profile.url.label')}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="https://examples.com"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {upperFirst(common('messages.save'))}
        </Button>
      </form>
    </Form>
  );
}
