'use client';
import Link from 'next/link';

import { Icons } from '@/config/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { AuthError } from '@supabase/supabase-js';
import { useAuth } from '@/context/auth-context';
import { useState } from 'react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Adresse email invalide' }),
  password: z.string(),
});

export function LoginPasswordForm({
  className,
  redirectTo,
  ...props
} : React.HTMLAttributes<HTMLDivElement> & { redirectTo: string | null }) {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const emailForm = (event.target as HTMLFormElement).email.value;
      const passwordForm = (event.target as HTMLFormElement).password.value;
      const { email, password } = loginSchema.parse({ email: emailForm, password: passwordForm });
      await login(email, password, redirectTo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.map((currError) => {
          toast.error(currError.message);
        });
      } else if (error instanceof AuthError) {
        switch (error.status) {
          case 400:
            toast.error('Email ou mot de passe incorrect');
            break;
          default:
            toast.error(error.message);
        }
      } else {
        toast.error("Une erreur s'est produite");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="jeanluc.godard@gmail.com"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            placeholder="●●●●●●●●●●●●●●"
            type="password"
            autoComplete="current-password"
            disabled={isLoading}
          />
        </div>
        <Button disabled={isLoading}>
          {isLoading ? (<Icons.loader />) : null}
          Se connecter avec un e-mail
        </Button>
        <Link
          href={{
            pathname: '/auth/forgot-password',
            query: redirectTo ? { redirect: redirectTo } : undefined,
          }}
          className="text-right text-sm text-muted-foreground hover:text-foreground"
        >
          Mot de passe oublié ?
        </Link>
      </div>
    </form>
  );
}
