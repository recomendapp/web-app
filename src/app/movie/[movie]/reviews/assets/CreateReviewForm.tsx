'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn, getInitiales } from '@/lib/utils';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
// import { toast } from "@/components/ui/use-toast"
import { toast } from 'react-toastify';
import { useUser } from '@/context/user';
import { account, checkUsernameExist, databases } from '@/utils/appwrite';
import { useRouter } from 'next/navigation';

// ICONS
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { Icons } from '@/components/icons';

// This can come from your database or API.

export function CreateReviewForm({ user, movieId } : { user: any, movieId: number }) {

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const profileFormSchema = z.object({
        title: z
            .string()
            .max(50, {
            message: 'La titre ne doit pas dépasser 50 caractères.',
            })
            .optional(),
        body: z
            .string()
            .min(1, {
            message: 'La critique ne peut pas être vide.',
            })
            .max(3000, {
            message: 'La critique ne doit pas dépasser 3000 caractères.',
            })
    });

  type ProfileFormValues = z.infer<typeof profileFormSchema>;

  const defaultValues: Partial<ProfileFormValues> = {
    title: '',
    body: '',
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: ProfileFormValues) {

    setIsLoading(true);

    try {
      const { $id } = await databases.createDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_REVIEW),
        'unique()',
        {
            movieId: movieId,
            userId: user.$id,
            user: user.$id,
            title: data.title,
            body: data.body,

        }
      );
      toast.success(
        'Votre critique a été publié avec succès 👌'
      );
      setIsLoading(false);
      router.push(`/movie/${movieId}/review/${$id}`);
    } catch (error) {
      toast.error("Une erreur s'est produite 🤯");
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Link href={'/@' + user.username} className='flex gap-2 w-fit'>
            <Avatar className="w-[50px] h-[50px]">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback className="text-[25px]">
                {getInitiales(user)}
              </AvatarFallback>
            </Avatar>
            <div className="flex justify-center items-center gap-1">
              <span className='hover:underline'>
                {user.username}
              </span>
              {user.verify && <BsFillPatchCheckFill fill="#1D9BF0" size={16} />}
              <span className=' text-muted-foreground'>
                @{user.username}
              </span>
            </div>
        </Link>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Titre</FormLabel> */}
              <FormControl>
                <Input
                  placeholder="Titre (optionnel)"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Titre</FormLabel> */}
              <FormControl>
                <Textarea
                  placeholder="Ce film est a chier"
                  className=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='text-right'>
            <Button disabled={isLoading} type='submit'>
                {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Enregistrer
            </Button>
        </div>
        
      </form>
    </Form>
  );
}
