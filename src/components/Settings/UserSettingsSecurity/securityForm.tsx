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
// import { toast } from "@/components/ui/use-toast"
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext/auth-context';
import { supabase } from '@/lib/supabase/client';

export function SecurityForm() {
  const { user, userRefresh } = useAuth();

  const profileFormSchema = z.object({
    // password: z.string(),
    newpassword: z
      .string()
      .min(8, {
        message: 'Le mot de passe doit contenir moins 8 caractères.',
      })
      .max(50, {
        message: 'Le mot de passe ne doit pas dépasser 128 caractères.',
      })
      .refine((value) => /^[a-zA-Z0-9!@#$%^&*_\-]*$/.test(value), {
        message:
          'Le mot de passe peut inclure des caractères alphabétiques, numériques et spéciaux.',
      }),
    confirmnewpassword: z.string(),
  });

  type ProfileFormValues = z.infer<typeof profileFormSchema>;

  const defaultValues: Partial<ProfileFormValues> = {
    // password: '',
    newpassword: '',
    confirmnewpassword: '',
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: ProfileFormValues) {
    if (data.newpassword !== data.confirmnewpassword) {
      form.setError('newpassword', {
        message: '',
      });
      form.setError('confirmnewpassword', {
        message: 'Les mots de passe ne correspondent pas.',
      });
      return;
    }
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.newpassword,
      });
      if (error) throw error;
      toast.success('Enregistré');
      form.reset();
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe actuel</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="current-password"
                  placeholder={'Mot de passe actuel'}
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="newpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="new-password"
                  placeholder={'Nouveau mot de passe'}
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmnewpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="new-password"
                  placeholder={'Confirmer le nouveau mot de passe'}
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enregistrer</Button>
      </form>
    </Form>
  );
}
