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
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { supabase } from '@/lib/supabase/client';
import { Icons } from '@/components/icons';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader/Loader';
import { useMutation } from '@tanstack/react-query';
import { Switch } from '@/components/ui/switch';

// This can come from your database or API.

export function AccountForm() {

  const { user, session } = useAuth();

  const [loading, setLoading] = useState(false);

  const { mutateAsync: updateProfile } = useMutation({
    mutationFn: async (payload: any) => {
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
    }
  });


  const date = new Date();

  const dateLastUsernameUpdate = user?.username_updated_at
    ? new Date(user.username_updated_at)
    : new Date('01/01/1970');

  const profileFormSchema = z.object({
    username: z
      .string()
      .min(3, {
        message: "Le nom d'utilisateur doit comporter au moins 3 caractères.",
      })
      .max(15, {
        message: "Le nom d'utilisateur ne doit pas dépasser 15 caractères.",
      })
      .refine((value) => /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{2,14}$/.test(value), {
        message:
          "L'username ne doit contenir que des lettres, des chiffres et les symbole '_' et '.'",
      })
      .refine(
        async (value) => {
          if (value === user?.username) {
            return true;
          }
          const isUsernameExist = await checkUsernameExist(value);
          return !isUsernameExist;
        },
        {
          message: "Cet username n'est pas disponible.",
        }
      ),
    private: z.boolean(),
    email: z.string().email(),
  });

  type ProfileFormValues = z.infer<typeof profileFormSchema>;

  const defaultValues: Partial<ProfileFormValues> = {
    username: user?.username,
    private: user?.private,
    email: session?.user.email,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    user &&
      form.reset({
        username: user.username,
        private: user.private,
        email: session?.user.email,
      });
  }, [form, session?.user.email, user]);

  async function onSubmit(data: ProfileFormValues) {
    // if (user?.username === data.username) {
    //   toast.error('Aucun changement');
    //   return;
    // }
    try {
      setLoading(true);
      await updateProfile({
        username: data.username,
        private: data.private,
      });
      toast.success('Enregistré');
    } catch (error) {
      toast.error("Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  }

  if (!user) return <Loader />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between gap-4">
                <p>Nom d&apos;utilisateur</p>
                <p className="">{field?.value?.length ?? 0} / 15</p>
              </FormLabel>
              <FormControl>
                <Input
                  disabled={
                    (date.getTime() - dateLastUsernameUpdate.getTime()) /
                      (1000 * 60 * 60 * 24) <
                    30
                      ? true
                      : false
                  }
                  placeholder={"Nom d'utilisateur"}
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-justify">
                Ceci est votre nom d&apos;utilisateur par lequel les autres
                personnes peuvent vous trouver et accéder à votre profil. Vous
                ne pouvez le modifier qu&apos;une fois tous les 30 jours.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="private"
          render={({ field }) => (
            <FormItem className='flex items-center gap-2'>
              <FormLabel>Compte privé</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription className="text-justify">

              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse email </FormLabel>
              <FormControl>
                <Input placeholder={'Adresse mail'} {...field} disabled />
              </FormControl>
              <FormDescription className="flex flex-col md:flex-row w-full justify-between gap-4">
                <div className="text-justify">
                  Pour modifier votre adresse email contactez nous.
                </div>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Enregistrer
        </Button>
      </form>
    </Form>
  );
}

export async function checkUsernameExist(username: string) {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('username', username);
  if (error) throw error;
  if (data?.length) {
    return true;
  } else {
    return false;
  }
}
