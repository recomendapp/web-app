"use client";
import { Icons } from '@/config/icons';
import { Images } from '@/config/images';
import { siteConfig } from '@/config/site';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Provider } from '@supabase/supabase-js';
import { useAuth } from '@/context/auth-context';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useRandomImage } from '@/hooks/use-random-image';
import { LoginOtpForm } from './_components/LoginOtpForm';

export default function Login() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect');
  const bgImage = useRandomImage(Images.auth.login.background);

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage?.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Card className="@container w-full max-w-[400px]">
        <CardHeader className='gap-2'>
          <CardTitle className='inline-flex gap-2 items-center justify-center'>
            <Icons.site.icon className='fill-accent-1 w-8' />
            Se connecter
          </CardTitle>
          <CardDescription>
            Découvrez les meilleures recommandations de films.
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <LoginOtpForm redirectTo={redirectTo} />
        </CardContent>
        <CardFooter>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Vous préférez vous connecter avec un mot de passe ?{' '}
            <Button
              variant={'link-accent-1'}
              className='inline p-0' 
              asChild
            >
              <Link
                href={{
                  pathname: '/auth/login',
                  query: redirectTo ? { redirect: redirectTo } : undefined,
                }}
              >
                Ici
              </Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
