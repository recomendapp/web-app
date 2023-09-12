'use client';
import React, { useState } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/context/user';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { account } from '@/utils/appwrite';

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const { login } = useUser();

  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    setIsLoading(true);

    if (!userLogin.email || !userLogin.password) {
      setIsLoading(false);
      return;
    }

    try {
      await login(userLogin.email, userLogin.password)
        .then((response) => {
          router.push('/');
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error('Email ou mot de passe incorrect 🤯');
        });
    } catch (error) {
      toast.error("Une erreur s'est produite 🤯");
    }
  }

  const loginOAuth2 = async (e: string) => {
    try {
      await account.createOAuth2Session(
        e,
        process.env.NEXT_PUBLIC_URL,
        process.env.NEXT_PUBLIC_URL + '/login'
      );
    } catch (error) {
      throw error;
    }
  };

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
        onClick={() => loginOAuth2('github')}
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
