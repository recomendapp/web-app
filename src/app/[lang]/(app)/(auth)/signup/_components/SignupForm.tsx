'use client';

import { useState } from 'react';
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
import { Icons } from '@/components/icons';
import checkUsernameExist from '@/components/Auth/hooks/checkUsernameExist';
import { useAuth } from '@/context/auth-context';

export function SignupForm() {
  const router = useRouter();

  const { signup } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signupFormSchema = z.object({
    email: z.string().email({
      message: 'Adresse email invalide.',
    }),
    name: z
      .string()
      .min(1, {
        message: 'Le nom doit comporter au moins 1 caractère.',
      })
      .max(50, {
        message: 'Le nom ne doit pas dépasser 50 caractères.',
      })
      .regex(/^[a-zA-Z0-9\s\S]*$/),
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
          const isUsernameExist = await checkUsernameExist(value);
          return !isUsernameExist;
        },
        {
          message: "Ce nom d'utilisateur n'est pas disponible.",
        }
      ),
    password: z
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
    confirmpassword: z
      .string()
      .min(8, {
        message: 'Les mots de passe ne correspondent pas.',
      })
      .max(50, {
        message: 'Les mots de passe ne correspondent pas.',
      })
      .refine((value) => /^[a-zA-Z0-9!@#$%^&*_\-]*$/.test(value), {
        message: 'Les mots de passe ne correspondent pas.',
      }),
  });

  type SignupFormValues = z.infer<typeof signupFormSchema>;

  const defaultValues: Partial<SignupFormValues> = {
    email: '',
    name: '',
    username: '',
    password: '',
  };

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: SignupFormValues) {
    if (data.password !== data.confirmpassword) {
      form.setError('password', {
        message: '',
      });
      form.setError('confirmpassword', {
        message: 'Les mots de passe ne correspondent pas.',
      });
      return;
    }

    try {
      const isUsernameExist = await checkUsernameExist(data.username);
      if (!isUsernameExist) {
        try {
          setIsLoading(true);
          await signup(data.email, data.name, data.username, data.password);
          toast.success('Un email de confirmation vient de vous être envoyé');
          router.push('/login');
        } catch (error) {
          toast.error("Une erreur s'est produite");
        } finally {
          setIsLoading(false);
        }
      } else {
        form.setError('username', {
          message: "Ce nom d'utilisateur n'est pas disponible.",
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Une erreur s'est produite");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse email</FormLabel>
              <FormControl>
                <Input
                  autoComplete="email"
                  disabled={isLoading}
                  placeholder="jeanluc.godard@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormDescription className="flex flex-col md:flex-row w-full justify-between gap-4"></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between gap-4">
                <p>Nom</p>
                <p className="">{field?.value?.length ?? 0} / 50</p>
              </FormLabel>
              <FormControl>
                <Input
                  autoComplete="given-name"
                  disabled={isLoading}
                  placeholder="Jean-Luc Godard"
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between gap-4">
                <p>Nom d&apos;utilisateur</p>
                <p className="">{field?.value?.length ?? 0} / 15</p>
              </FormLabel>
              <FormControl>
                <Input
                  autoComplete="username"
                  disabled={isLoading}
                  placeholder="@jlgodard"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  type="password"
                  autoComplete="new-password"
                  placeholder="Mot de passe"
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
          name="confirmpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirmer le mot de passe"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            S&apos;inscrire
          </Button>
        </div>
      </form>
    </Form>
  );
}
