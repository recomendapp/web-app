'use client';
import React, { useState } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext/auth-context';
import { AuthError, Provider } from '@supabase/supabase-js';

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const { login, loginOAuth2 } = useAuth();

  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    if (!userLogin.email || !userLogin.password) {
      return;
    }

    try {
      setIsLoading(true);
      await login(userLogin.email, userLogin.password)
    } catch (error: any) {
      if (error.status == 400)
        toast.error('Email ou mot de passe incorrect');
      else
        toast.error("Une erreur s'est produite");
    } finally {
      setIsLoading(false)
    }
  }

  async function handleLoginOAuth2(provider: Provider) {
    try {
      setIsLoading(true);
      await loginOAuth2(provider);

    } catch (error) {
      toast.error("Une erreur s'est produite");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => {
                setUserLogin({
                  ...userLogin,
                  email: e.target.value,
                });
              }}
              required
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="●●●●●●●●●●●●●●"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              onChange={(e) => {
                setUserLogin({
                  ...userLogin,
                  password: e.target.value,
                });
              }}
              required
            />
          </div>
          <Button type='submit' disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Se connecter avec un e-mail
          </Button>
          <Link
            href="/forgotPassword"
            className="text-right text-sm text-muted-foreground hover:text-primary"
          >
            Mot de passe oublié ?
          </Link>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continuer avec
          </span>
        </div>
      </div>
      <Button
        onClick={() => handleLoginOAuth2('github')}
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{' '}
        Github
      </Button>
    </div>
  );
}
