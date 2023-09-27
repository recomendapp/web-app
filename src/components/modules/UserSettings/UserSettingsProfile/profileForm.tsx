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
// import { toast } from "@/components/ui/use-toast"
import { toast } from 'react-toastify';
import PictureUpload from './pictureUpload';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import { useMutation } from '@apollo/client';
import UPDATE_PROFILE_MUTATION from './mutations/updateProfileMutation';
import { Icons } from '@/components/icons';
import { useState } from 'react';
import { supabase } from '@/lib/supabase/supabase';
import Compressor from 'compressorjs';
import compressPicture from '@/lib/utils/compressPicture';

export function ProfileForm() {
  const { user } = useAuth();
  const [ loading, setLoading ] = useState(false);

  const [ updateProfile ] = useMutation(UPDATE_PROFILE_MUTATION);

  const [ newAvatar, setNewAvatar ] = useState<File>();
  const [ isUploading, setIsUploading ] = useState(false);

  const profileFormSchema = z.object({
    full_name: z
      .string()
      .min(1, {
        message: 'Le nom doit comporter au moins 1 caractère.',
      })
      .max(50, {
        message: 'Le nom ne doit pas dépasser 50 caractères.',
      })
      .regex(/^[a-zA-Z0-9\s\S]*$/),
    bio: z
      .string()
      .max(150, {
        message: 'La bio ne doit pas dépasser 150 caractères.',
      })
      .optional(),
    website: z.
      string()
      .url({ 
        message: 'Veuillez entrer une URL valide.'
      })
      .optional(),
  });

  type ProfileFormValues = z.infer<typeof profileFormSchema>;

  const defaultValues: Partial<ProfileFormValues> = {
    full_name: user?.full_name,
    bio: user?.bio ?? undefined,
    website: user?.website ?? undefined,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      if (!user)
        return

      setLoading(true);

      const payload: Record<string, any> = {
        id: user?.id,
        full_name: data.full_name,
        bio: data.bio,
        website: data.website
      }
      if (newAvatar) {
        const newAvatarUrl = await uploadAvatar(newAvatar, user.id);
        payload.avatar_url = newAvatarUrl
      }

      const { errors } = await updateProfile({
        variables: payload
      });
      if (errors) throw errors;
      toast.success('Enregistré');   
    } catch(error) {
      toast.error("Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  }

  async function deleteAvatar() {
    try {
      const { errors } = await updateProfile({
        variables: {
          avatar_url: '',
        }
      });
      if (errors) throw errors;
      toast.success('Enregistré');  
    } catch(error) {
      console.log(error)
      toast.error("Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  }

  async function uploadAvatar(file: File, userId: string) {
    try {
      const fileExt = file.name.split('.').pop()
      const filePath = `${userId}-${Math.random()}.${fileExt}`

      const avatarCompressed = await compressPicture(file, filePath, 400, 400);

      let { error } = await supabase.storage.from('avatars').upload(filePath, avatarCompressed)
      
      if (error) throw error;

      return (`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${filePath}`);
    } catch (error) {
      throw error;
    }
  }

  if (!user)
    return null

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className='flex gap-4 items-center'>
          <PictureUpload
            user={user}
            isUploading={isUploading}
            newAvatar={newAvatar}
            setNewAvatar={setNewAvatar}
          />
          {user.avatar_url && <Button variant={'destructive'} onClick={deleteAvatar}>
            Supprimer
          </Button>}
        </div>
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex justify-between gap-4'>
                <p>Nom</p>
                <p className=''>{field?.value?.length ?? 0} / 50</p>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nom"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-justify">
                Il s&apos;agit du nom qui sera affiché sur votre profil et dans
                les emails.
              </FormDescription>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex justify-between gap-4'>
                <p>Bio</p>
                <p>{field?.value?.length ?? 0} / 150</p>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Dites-nous un peu à votre sujet."
                  className="resize-none h-32"
                  {...field}
                />
              </FormControl>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"website"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                URL
              </FormLabel>
              <FormControl>
                <Input
                type='text'
                placeholder='https://examples.com'
                  {...field}
                />
                {/* <div className="flex items-center gap-4">
                  <Input {...field} />
                  <Button
                    variant="ghost"
                    size="icon"
                    className=" rounded-full"
                    onClick={() => remove(index)}
                  >
                    <X />
                  </Button>
                </div> */}
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
            {loading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Enregistrer
        </Button>
      </form>
    </Form>
  );
}
