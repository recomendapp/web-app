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
import { useUser } from '@/context/UserProvider';
import { account, databases } from '@/db/appwrite';
import PictureUpload from './pictureUpload';

// This can come from your database or API.

export function ProfileForm() {
  const { user, userRefresh } = useUser();

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
    link: z.
      string()
      .url({ 
        message: 'Veuillez entrer une URL valide.'
      })
      .optional(),
  });

  type ProfileFormValues = z.infer<typeof profileFormSchema>;

  const defaultValues: Partial<ProfileFormValues> = {
    full_name: user.full_name,
    bio: user.bio ? user.bio : '',
    link: user.link,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      await account.updateName(data.full_name);
      await databases.updateDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER),
        user.$id,
        {
          full_name: data.full_name,
          bio: data.bio,
          link: data.link
        }
      );
      await userRefresh();
      toast.success(
        'Toutes les modifications ont été enregistrées avec succès 👌'
      );
    } catch (error) {
      await userRefresh();
      toast.error("Une erreur s'est produite 🤯");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <PictureUpload user={user} userRefresh={userRefresh} />
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex justify-between gap-4'>
                <p>Nom</p>
                <p className=''>{field.value.length} / 50</p>
              </FormLabel>
              <FormControl>
                <Input
                  disabled={!user.emailVerification ? true : false}
                  placeholder={user.full_name}
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
                <p>{field?.value?.length} / 150</p>
              </FormLabel>
              <FormControl>
                <Textarea
                  disabled={!user.emailVerification ? true : false}
                  placeholder="Dites-nous un peu à votre sujet."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"link"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                URL
              </FormLabel>
              <FormControl>
                <Input
                type='url'
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
        <Button disabled={!user.emailVerification ? true : false} type="submit">
          Enregistrer
        </Button>
      </form>
    </Form>
  );
}
